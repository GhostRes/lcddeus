/* ============================================================
   Lar Cidade de Deus — Script principal
   Responsável por: navegação SPA, menu hambúrguer e lightbox
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     NAVEGAÇÃO (SPA)
     Cada "página" é um <div class="page" id="page-ID">.
     Os links de navegação usam data-page="ID" em vez de onclick
     inline, o que facilita manutenção e testes.
     ============================================================ */
  function showPage(id) {
    document.querySelectorAll('.page').forEach(function (page) {
      page.classList.remove('active');
    });
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.classList.remove('active');
    });

    var targetPage = document.getElementById('page-' + id);
    if (!targetPage) return;
    targetPage.classList.add('active');

    var navLink = document.getElementById('nav-' + id);
    if (navLink) navLink.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ============================================================
     MENU HAMBÚRGUER (mobile)
     ============================================================ */
  function toggleMenu() {
    var menu = document.getElementById('navMenu');
    var btn = document.getElementById('hamburger');
    var isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  }

  function closeMenu() {
    document.getElementById('navMenu').classList.remove('open');
    var btn = document.getElementById('hamburger');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  /* ============================================================
     LIGHTBOX (galeria de fotos)
     Lista alinhada com as imagens realmente exibidas na galeria
     da página inicial (antes o array apontava para arquivos
     que não existiam no projeto).
     ============================================================ */
  var galleryImages = [
    { src: 'estrutura/entrada.jpg', caption: 'Fachada' },
    { src: 'estrutura/quartos.jpg', caption: 'Quartos' },
    { src: 'estrutura/refei.jpg', caption: 'Refeitório' },
    { src: 'estrutura/lazer.jpg', caption: 'Área de Lazer' },
    { src: 'estrutura/capela.jpg', caption: 'Capela' }
  ];
  var currentLightbox = 0;

  function openLightbox(idx) {
    currentLightbox = idx;
    var item = galleryImages[idx];
    document.getElementById('lightbox-img').src = item.src;
    document.getElementById('lightbox-caption').textContent = item.caption;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }

  function lightboxNav(direction) {
    currentLightbox = (currentLightbox + direction + galleryImages.length) % galleryImages.length;
    openLightbox(currentLightbox);
  }

  /* ============================================================
     INICIALIZAÇÃO / LISTENERS
     Toda a interação é ligada aqui via addEventListener e
     atributos data-*, sem handlers inline no HTML.
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    // Navegação: qualquer elemento com data-page navega e fecha o menu mobile
    document.querySelectorAll('[data-page]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        showPage(el.getAttribute('data-page'));
        closeMenu();
      });
    });

    // Estado inicial: página "home" ativa
    showPage('home');

    // Menu hambúrguer
    var hamburgerBtn = document.getElementById('hamburger');
    if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);

    document.addEventListener('click', function (e) {
      var nav = document.querySelector('nav');
      if (nav && !nav.contains(e.target)) closeMenu();
    });

    // Galeria -> lightbox
    document.querySelectorAll('[data-lightbox-index]').forEach(function (el) {
      el.addEventListener('click', function () {
        openLightbox(Number(el.getAttribute('data-lightbox-index')));
      });
    });

    var lightboxEl = document.getElementById('lightbox');
    var closeBtn = document.querySelector('.lightbox-close');
    var prevBtn = document.querySelector('.lightbox-prev');
    var nextBtn = document.querySelector('.lightbox-next');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', function () { lightboxNav(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { lightboxNav(1); });

    if (lightboxEl) {
      lightboxEl.addEventListener('click', function (e) {
        if (e.target === lightboxEl) closeLightbox();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (!lightboxEl || !lightboxEl.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') lightboxNav(1);
      if (e.key === 'ArrowLeft') lightboxNav(-1);
    });
  });
})();
