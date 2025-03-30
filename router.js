// Funzione per caricare il contenuto in base alla rotta
async function loadPage(route) {
  try {
    // Aggiorna lo stato attivo del menu
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-route') === route) {
        link.classList.add('active');
      }
    });

    // Carica il contenuto della pagina
    const response = await fetch(`${route}.html`);
    if (!response.ok) throw new Error('Pagina non trovata');
    
    const data = await response.text();
    document.getElementById('content').innerHTML = data;
    
    // Aggiunge la rotta alla cronologia del browser
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

// Gestione della navigazione iniziale
function handleInitialLoad() {
  const hash = window.location.hash.replace('#', '');
  const validRoutes = ['home', 'chi-siamo', 'cosa-facciamo', 'contatti'];
  
  if (hash && validRoutes.includes(hash)) {
    loadPage(hash);
  } else {
    loadPage('home');
  }
}

// Aggiungi event listener ai link di navigazione
document.addEventListener('DOMContentLoaded', function() {
  // Gestione click sui link
  document.querySelectorAll('a[data-route]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const route = this.getAttribute('data-route');
      loadPage(route);
    });
  });
  
  // Gestione pulsanti indietro/avanti del browser
  window.addEventListener('popstate', function(e) {
    if (e.state && e.state.route) {
      loadPage(e.state.route);
    }
  });
  
  // Caricamento iniziale
  handleInitialLoad();
});
