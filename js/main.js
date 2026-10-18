/* Sinapsis Producción — comportamiento de la página
   - Menú (desplegable y versión celular)
   - Grilla de proyectos con filtros y miniaturas en movimiento
   - Reproductor de video (YouTube / Vimeo) */

(function () {
  "use strict";

  var POR_PAGINA = 9;
  var esTactil = window.matchMedia("(hover: none)").matches;
  var reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Año del pie ---------- */
  var anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------- Encabezado: fondo negro al bajar ---------- */
  var encabezado = document.getElementById("encabezado");
  function actualizarEncabezado() {
    encabezado.classList.toggle("con-fondo", window.scrollY > 40);
  }
  window.addEventListener("scroll", actualizarEncabezado, { passive: true });
  actualizarEncabezado();

  /* ---------- Menú celular ---------- */
  var menu = document.getElementById("menu");
  var menuBtn = document.getElementById("menu-btn");
  function cerrarMenu() {
    menu.classList.remove("abierto");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  menuBtn.addEventListener("click", function () {
    var abierto = menu.classList.toggle("abierto");
    menuBtn.setAttribute("aria-expanded", String(abierto));
    document.body.style.overflow = abierto ? "hidden" : "";
  });

  /* ---------- Desplegable "Qué hacemos" ---------- */
  document.querySelectorAll(".menu__item--desplegable").forEach(function (item) {
    var toggle = item.querySelector(".menu__toggle");
    function abrir(si) {
      item.classList.toggle("abierto", si);
      toggle.setAttribute("aria-expanded", String(si));
    }
    toggle.addEventListener("click", function () { abrir(!item.classList.contains("abierto")); });
    if (!esTactil) {
      item.addEventListener("mouseenter", function () { if (window.innerWidth > 860) abrir(true); });
      item.addEventListener("mouseleave", function () { if (window.innerWidth > 860) abrir(false); });
    }
    document.addEventListener("click", function (e) { if (!item.contains(e.target) && window.innerWidth > 860) abrir(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") abrir(false); });
  });

  // Cualquier link del menú cierra el menú celular
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", cerrarMenu); });

  /* ---------- Grilla de proyectos ---------- */
  var grilla = document.getElementById("grilla");
  var verMas = document.getElementById("ver-mas");
  var proyectos = (window.PROYECTOS || []).slice();
  // Destacados primero, el resto en el orden de la planilla
  proyectos.sort(function (a, b) { return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0); });

  function crear(tag, clase, texto) {
    var el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto) el.textContent = texto;
    return el;
  }

  function tarjeta(p) {
    var li = crear("li", "proyecto");
    li.dataset.tipos = p.tipos.join("|");

    var boton = crear("button", "proyecto__boton");
    boton.type = "button";
    boton.setAttribute("aria-label", p.titulo + (p.video ? " — ver video" : " — ver ficha"));

    var esLogo = p.tipos.length === 1 && p.tipos[0] === "Consultoría";
    var media = crear("div", "proyecto__media" + (esLogo ? " proyecto__media--logo" : ""));
    if (p.imagen) {
      var img = crear("img");
      img.src = p.imagen;
      img.alt = "";
      img.loading = "lazy";
      media.appendChild(img);
    }
    if (p.clip) {
      var video = crear("video");
      video.src = p.clip;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "none";
      video.setAttribute("aria-hidden", "true");
      media.appendChild(video);
    }
    if (p.video) {
      var play = crear("span", "proyecto__play");
      play.appendChild(crear("span", "icono-play"));
      play.setAttribute("aria-hidden", "true");
      media.appendChild(play);
    }

    var credito = crear("p", "proyecto__credito");
    credito.appendChild(document.createTextNode(p.titulo));
    if (p.canal) {
      credito.appendChild(document.createElement("br"));
      credito.appendChild(crear("span", "canal", p.canal));
    }

    var datos = [p.genero, p.anio].filter(Boolean).join(" · ");

    boton.appendChild(media);
    boton.appendChild(credito);
    if (datos) boton.appendChild(crear("p", "proyecto__datos", datos));
    boton.addEventListener("click", function () { abrirReproductor(p); });

    li.appendChild(boton);
    if (p.clip) activarClip(li, video);
    return li;
  }

  /* Miniaturas en movimiento: con mouse se reproducen al pasar por encima;
     en celular, cuando la tarjeta está a la vista. */
  var observador = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      var v = e.target.querySelector("video");
      if (e.isIntersecting) { reproducir(e.target, v); } else { pausar(e.target, v); }
    });
  }, { threshold: 0.6 }) : null;

  function reproducir(li, v) {
    if (reducirMovimiento) return;
    var promesa = v.play();
    if (promesa && promesa.then) promesa.then(function () { li.classList.add("reproduciendo"); }).catch(function () {});
    else li.classList.add("reproduciendo");
  }
  function pausar(li, v) { v.pause(); li.classList.remove("reproduciendo"); }

  function activarClip(li, v) {
    if (esTactil) {
      if (observador) observador.observe(li);
    } else {
      li.addEventListener("mouseenter", function () { reproducir(li, v); });
      li.addEventListener("mouseleave", function () { pausar(li, v); });
    }
  }

  var tarjetas = proyectos.map(function (p) {
    var t = tarjeta(p);
    grilla.appendChild(t);
    return t;
  });

  var filtroActual = "todos";
  var mostrarTodos = false;

  function aplicarFiltro() {
    var visibles = 0;
    tarjetas.forEach(function (t) {
      var coincide = filtroActual === "todos" || t.dataset.tipos.split("|").indexOf(filtroActual) !== -1;
      var mostrar = coincide && (mostrarTodos || visibles < POR_PAGINA);
      if (coincide) visibles++;
      t.hidden = !mostrar;
    });
    verMas.hidden = mostrarTodos || visibles <= POR_PAGINA;
    document.querySelectorAll(".filtro").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.filtro === filtroActual));
    });
  }

  function filtrar(valor) {
    filtroActual = valor;
    mostrarTodos = false;
    aplicarFiltro();
  }

  document.querySelectorAll(".filtro").forEach(function (b) {
    b.addEventListener("click", function () { filtrar(b.dataset.filtro); });
  });
  // Links de "Qué hacemos" (menú y tarjetas) aplican el filtro correspondiente
  document.querySelectorAll("a[data-filtro]").forEach(function (a) {
    a.addEventListener("click", function () { filtrar(a.dataset.filtro); });
  });
  verMas.addEventListener("click", function () { mostrarTodos = true; aplicarFiltro(); });
  aplicarFiltro();

  /* ---------- Reproductor ---------- */
  var reproductor = document.getElementById("reproductor");
  var cajaVideo = document.getElementById("reproductor-video");
  var ficha = document.getElementById("reproductor-ficha");

  function urlEmbed(v) {
    if (v.plataforma === "youtube") return "https://www.youtube-nocookie.com/embed/" + v.id + "?autoplay=1&rel=0&modestbranding=1";
    if (v.plataforma === "vimeo") return "https://player.vimeo.com/video/" + v.id + "?autoplay=1&dnt=1";
    return "";
  }

  function abrirReproductor(p) {
    cajaVideo.innerHTML = "";
    if (p.video) {
      var iframe = document.createElement("iframe");
      iframe.src = urlEmbed(p.video);
      iframe.title = p.titulo;
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.allowFullscreen = true;
      cajaVideo.appendChild(iframe);
      cajaVideo.hidden = false;
    } else {
      cajaVideo.hidden = true;
    }

    ficha.innerHTML = "";
    var h = crear("h2", null, p.titulo);
    h.id = "reproductor-titulo";
    ficha.appendChild(h);
    var linea = [p.canal, p.paises, p.formato, p.anio].filter(Boolean).join(" · ");
    if (linea) ficha.appendChild(crear("p", "etiqueta", linea));
    if (p.descripcion) ficha.appendChild(crear("p", null, p.descripcion));
    if (p.premios) ficha.appendChild(crear("p", "premios", p.premios));

    if (typeof reproductor.showModal === "function") reproductor.showModal();
    else reproductor.setAttribute("open", "");
  }

  function cerrarReproductor() {
    if (reproductor.open && typeof reproductor.close === "function") reproductor.close();
    else reproductor.removeAttribute("open");
  }
  reproductor.addEventListener("close", function () { cajaVideo.innerHTML = ""; });
  document.getElementById("reproductor-cerrar").addEventListener("click", cerrarReproductor);
  reproductor.addEventListener("click", function (e) { if (e.target === reproductor) cerrarReproductor(); });

  // Botones sueltos con video (portada y reel)
  document.querySelectorAll("[data-video-id]").forEach(function (b) {
    b.addEventListener("click", function () {
      abrirReproductor({
        titulo: b.dataset.videoTitulo || "",
        video: { plataforma: b.dataset.videoPlataforma, id: b.dataset.videoId }
      });
    });
  });
})();
