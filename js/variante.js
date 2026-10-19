/* Variante B — comportamiento compartido por todas las páginas
   - Encabezado que se esconde al bajar y aparece al subir
   - Menú celular
   - Tarjeta de proyecto única (misma en home y en Proyectos)
   - Reel de portada y reproductor de video */

(function () {
  "use strict";

  var RAIZ = ""; // las rutas de js/proyectos.js ya son relativas a la raíz del sitio
  var esTactil = window.matchMedia("(hover: none)").matches;
  var reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var proyectos = (window.PROYECTOS || []).slice();

  var FILTROS = { formatos: "Formato original", producciones: "Producción", showrunning: "Showrunning" };

  /* ---------- Año del pie ---------- */
  var anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------- Encabezado ---------- */
  var encabezado = document.getElementById("encabezado");
  var ultimoY = window.scrollY;
  function actualizarEncabezado() {
    var y = window.scrollY;
    encabezado.classList.toggle("con-fondo", y > 40);
    var menuAbierto = document.getElementById("menu").classList.contains("abierto");
    encabezado.classList.toggle("oculto", !menuAbierto && y > 200 && y > ultimoY);
    ultimoY = y;
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
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", cerrarMenu); });

  /* ---------- Tarjeta de proyecto ---------- */
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

    var media = crear("div", "proyecto__media");
    if (p.imagen) {
      var img = crear("img");
      img.src = RAIZ + p.imagen;
      img.alt = "";
      img.loading = "lazy";
      media.appendChild(img);
    }
    var video;
    if (p.clip) {
      video = crear("video");
      video.src = RAIZ + p.clip;
      video.muted = true; video.loop = true; video.playsInline = true;
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

    boton.appendChild(media);
    boton.appendChild(credito);
    boton.addEventListener("click", function () { abrirReproductor(p); });
    li.appendChild(boton);
    if (video) activarClip(li, video);
    return li;
  }

  // Miniaturas en movimiento (cuando haya clips en assets/video)
  var observador = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      var v = e.target.querySelector("video");
      if (e.isIntersecting) reproducir(e.target, v); else pausar(e.target, v);
    });
  }, { threshold: 0.6 }) : null;
  function reproducir(li, v) {
    if (reducirMovimiento) return;
    var pr = v.play();
    if (pr && pr.then) pr.then(function () { li.classList.add("reproduciendo"); }).catch(function () {});
  }
  function pausar(li, v) { v.pause(); li.classList.remove("reproduciendo"); }
  function activarClip(li, v) {
    if (esTactil) { if (observador) observador.observe(li); }
    else {
      li.addEventListener("mouseenter", function () { reproducir(li, v); });
      li.addEventListener("mouseleave", function () { pausar(li, v); });
    }
  }

  var soloConsultoria = function (p) { return p.tipos.length === 1 && p.tipos[0] === "Consultoría"; };

  /* ---------- Home: 6 destacados ---------- */
  var destacados = document.getElementById("destacados");
  if (destacados) {
    var lista = proyectos.filter(function (p) { return p.destacado; })
      .concat(proyectos.filter(function (p) { return !p.destacado && !soloConsultoria(p) && p.imagen; }))
      .slice(0, 6);
    lista.forEach(function (p) { destacados.appendChild(tarjeta(p)); });
  }

  /* ---------- Proyectos: grilla completa + filtros + consultorías ---------- */
  var grilla = document.getElementById("grilla");
  if (grilla) {
    var tarjetas = proyectos.filter(function (p) { return !soloConsultoria(p); })
      .sort(function (a, b) { return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0); })
      .map(function (p) { var t = tarjeta(p); grilla.appendChild(t); return t; });

    var botones = document.querySelectorAll(".filtro");
    var filtrar = function (valor) {
      tarjetas.forEach(function (t) {
        t.hidden = !(valor === "todos" || t.dataset.tipos.split("|").indexOf(valor) !== -1);
      });
      botones.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.filtro === valor)); });
    };
    botones.forEach(function (b) { b.addEventListener("click", function () { filtrar(b.dataset.filtro); }); });

    // proyectos.html#showrunning abre la página ya filtrada
    var desdeLink = FILTROS[location.hash.replace("#", "")];
    filtrar(desdeLink || "todos");

    var listaConsultorias = document.getElementById("consultorias");
    if (listaConsultorias) {
      proyectos.filter(soloConsultoria).forEach(function (p) {
        var li = crear("li");
        li.appendChild(crear("strong", null, p.titulo + (p.canal && p.canal !== p.titulo ? " · " + p.canal : "")));
        li.appendChild(crear("span", null, p.descripcion));
        li.appendChild(crear("span", "anio", p.anio));
        listaConsultorias.appendChild(li);
      });
    }
  }

  /* ---------- Reel de portada (YouTube como fondo, sin sonido) ---------- */
  var reel = document.getElementById("reel-portada");
  if (reel && !reducirMovimiento) {
    var id = reel.dataset.videoId;
    var iframe = crear("iframe", "reel-portada__video");
    iframe.title = "Reel Sinapsis Producción";
    iframe.setAttribute("aria-hidden", "true");
    iframe.tabIndex = -1;
    iframe.allow = "autoplay; encrypted-media";
    iframe.src = "https://www.youtube-nocookie.com/embed/" + id +
      "?autoplay=1&mute=1&loop=1&playlist=" + id + "&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1";
    var ajustarReel = function () {
      var w = reel.clientWidth, h = reel.clientHeight;
      // Cubrir todo el bloque manteniendo 16:9. Se agranda un 25% extra para que
      // el título y los controles de YouTube queden fuera de cuadro.
      var extra = 1.25;
      if (w / h > 16 / 9) { iframe.style.width = Math.ceil(w * extra) + "px"; iframe.style.height = Math.ceil(w * extra * 9 / 16) + "px"; }
      else { iframe.style.height = Math.ceil(h * extra) + "px"; iframe.style.width = Math.ceil(h * extra * 16 / 9) + "px"; }
    };
    ajustarReel();
    window.addEventListener("resize", ajustarReel);
    // Se muestra un poco después de cargar, para no ver la pantalla de carga de YouTube
    iframe.addEventListener("load", function () { setTimeout(function () { iframe.classList.add("listo"); }, 1800); });
    reel.insertBefore(iframe, reel.querySelector(".reel-portada__contenido"));
  }

  /* ---------- Selector de tipografía (solo para comparar) ---------- */
  var botonesLetra = document.querySelectorAll("[data-letra]");
  function marcarLetra() {
    var actual = document.documentElement.dataset.fuente || "actual";
    botonesLetra.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.letra === actual)); });
  }
  botonesLetra.forEach(function (b) {
    b.addEventListener("click", function () {
      var v = b.dataset.letra;
      document.documentElement.dataset.fuente = v;
      try { localStorage.setItem("sinapsis-letra-v4", v); } catch (e) {}
      marcarLetra();
    });
  });
  marcarLetra();

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
    cajaVideo.hidden = !p.video;
    if (p.video) {
      var f = document.createElement("iframe");
      f.src = urlEmbed(p.video);
      f.title = p.titulo;
      f.allow = "autoplay; fullscreen; picture-in-picture";
      f.allowFullscreen = true;
      cajaVideo.appendChild(f);
    }
    ficha.innerHTML = "";
    var h = crear("h2", null, p.titulo);
    h.id = "reproductor-titulo";
    ficha.appendChild(h);
    var linea = [p.canal, p.paises, p.formato, p.anio].filter(Boolean).join(" · ");
    if (linea) ficha.appendChild(crear("p", "etiqueta", linea));
    if (p.descripcion) ficha.appendChild(crear("p", null, p.descripcion));
    if (p.premios) ficha.appendChild(crear("p", "premios", p.premios));
    if (typeof reproductor.showModal === "function") reproductor.showModal(); else reproductor.setAttribute("open", "");
  }
  function cerrarReproductor() {
    if (reproductor.open && typeof reproductor.close === "function") reproductor.close(); else reproductor.removeAttribute("open");
  }
  reproductor.addEventListener("close", function () { cajaVideo.innerHTML = ""; });
  document.getElementById("reproductor-cerrar").addEventListener("click", cerrarReproductor);
  reproductor.addEventListener("click", function (e) { if (e.target === reproductor) cerrarReproductor(); });

  document.querySelectorAll("[data-abrir-video]").forEach(function (b) {
    b.addEventListener("click", function () {
      abrirReproductor({ titulo: b.dataset.videoTitulo || "", video: { plataforma: "youtube", id: b.dataset.abrirVideo } });
    });
  });
})();
