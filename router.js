async function loadPage(route) {
  try {
    // Aggiorna lo stato attivo del menu
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-route') === route) {
        link.classList.add('active');
      }
    });

    const response = await fetch(`${route}.html`);
    if (!response.ok) throw new Error('Pagina non trovata');
    
    const data = await response.text();
    // Estrae solo il contenuto del body usando un parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const bodyContent = doc.body.innerHTML;
    
    document.getElementById('content').innerHTML = bodyContent;
    
    // Sostituisci i link che puntano a index.html
    document.querySelectorAll('#content a[href="index.html"]').forEach(link => {
      link.href = '#';
      link.setAttribute('data-route', 'home');
      link.addEventListener('click', function(e) {
        e.preventDefault();
        loadPage('home');
      });
    });
    
    history.pushState({ route }, "", `#${route}`);
    
  } catch (err) {
    document.getElementById('content').innerHTML = `
      <h2>Pagina non trovata</h2>
      <p>La pagina richiesta non esiste.</p>
      <a href="#" data-route="home">Torna alla Home</a>
    `;
    console.error('Errore nel caricamento della pagina:', err);
  }
}
