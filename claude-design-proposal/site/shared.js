// Shared nav + footer + tweaks wiring for Binah site
(function () {
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const current = document.body.getAttribute('data-page') || path.replace('.html', '') || 'index';

  const links = [
    { href: 'modulos.html', label: 'Módulos', key: 'modulos' },
    { href: 'precios.html', label: 'Precios', key: 'precios' },
    { href: 'nosotros.html', label: 'Nosotros', key: 'nosotros' },
    { href: 'index.html', label: 'Inicio', key: 'index' },
  ];
  const ordered = [links[3], links[0], links[1], links[2]];

  const navHtml = `
    <nav class="nav">
      <div class="container nav-inner">
        <a href="index.html" class="nav-logo" aria-label="Binah">
          <img class="logo-light" src="assets/wordmark-black.png" alt="Binah" />
          <img class="logo-dark" src="assets/wordmark-white.png" alt="Binah" />
        </a>
        <div class="nav-links">
          ${ordered.map(l => `<a href="${l.href}" class="${current === l.key ? 'active' : ''}">${l.label}</a>`).join('')}
        </div>
        <div class="nav-cta">
          <a href="#" class="btn btn-ghost">Iniciar sesión</a>
          <a href="#demo" class="btn btn-primary">Agendar demo <span class="arrow">→</span></a>
        </div>
      </div>
    </nav>
  `;

  const footerHtml = `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <img class="logo-light" src="assets/wordmark-black.png" alt="Binah" style="height:28px" />
            <img class="logo-dark" src="assets/wordmark-white.png" alt="Binah" style="height:28px; display:none" />
            <p>El sistema operativo de los negocios colombianos. Nueve módulos. Una plataforma.</p>
          </div>
          <div class="footer-col">
            <h4>Producto</h4>
            <ul>
              <li><a href="modulos.html">Módulos</a></li>
              <li><a href="modulo-crm.html">CRM</a></li>
              <li><a href="modulo-retail.html">Retail</a></li>
              <li><a href="precios.html">Precios</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Compañía</h4>
            <ul>
              <li><a href="nosotros.html">Nosotros</a></li>
              <li><a href="#">Clientes</a></li>
              <li><a href="#">Empleos</a></li>
              <li><a href="#">Prensa</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Recursos</h4>
            <ul>
              <li><a href="#">Documentación</a></li>
              <li><a href="#">Centro de ayuda</a></li>
              <li><a href="#">Estado</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li><a href="mailto:hola@binah.co">hola@binah.co</a></li>
              <li><a href="#">WhatsApp</a></li>
              <li><a href="#">Barranquilla, Colombia</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 BINAH S.A.S.</span>
          <span>HECHO EN COLOMBIA ◆ V.2026.04</span>
        </div>
      </div>
    </footer>
  `;

  // Inject
  document.addEventListener('DOMContentLoaded', () => {
    const navSlot = document.getElementById('nav-slot');
    const footSlot = document.getElementById('footer-slot');
    if (navSlot) navSlot.innerHTML = navHtml;
    if (footSlot) footSlot.innerHTML = footerHtml;

    // Theme restoration
    try {
      const saved = localStorage.getItem('binah-theme');
      if (saved) document.documentElement.setAttribute('data-theme', saved);
    } catch (e) {}
  });
})();
