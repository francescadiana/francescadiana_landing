// Seleziona tutti i link nel menu di navigazione
const navLinks = document.querySelectorAll('nav ul li a');

// Seleziona tutte le sezioni che verranno osservate
const sections = document.querySelectorAll('section');

// Variabile per disattivare temporaneamente l'osservatore durante lo scroll manuale
let manualScrolling = false;

// Funzione per rimuovere la classe 'active' da tutti i link
function removeActiveClasses() {
    navLinks.forEach(link => link.classList.remove('active'));
}

// Funzione per aggiungere la classe 'active' al link corrispondente alla sezione visibile
function addActiveClass(sectionId) {
    removeActiveClasses();
    document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
}

// Intersection Observer per rilevare le sezioni visibili
const observer = new IntersectionObserver((entries) => {
    // Se siamo in fase di scorrimento manuale, non fare nulla
    if (manualScrolling) return;

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            addActiveClass(sectionId);
        }
    });
}, {
    threshold: 0.1 // Cambia l'attivazione quando il 50% della sezione è visibile
});

// Osserva ciascuna sezione
sections.forEach(section => {
    console.log("sezione", section)
    observer.observe(section);
});

// Aggiungi un event listener su ogni link per lo scroll fluido
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Impedisce il comportamento predefinito del link

        // Disattiva temporaneamente l'osservatore
        manualScrolling = true;

        // Ottieni l'id della sezione corrispondente (dall'attributo href)
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        // Esegui lo scroll verso la sezione target
        targetSection.scrollIntoView({
            behavior: 'smooth' // Scorrimento fluido
        });

        // Aggiorna manualmente il link attivo
        addActiveClass(targetId);

        // Riattiva l'osservatore dopo un timeout per permettere lo scroll fluido
        setTimeout(() => {
            manualScrolling = false;
        }, 1000); // Tempo sufficiente per completare lo scroll
    });
});

// Imposta "About" come attivo all'avvio
document.querySelector('.about-link').classList.add('active');



// Seleziona tutti gli elementi con la classe "dribbble"
const dribbbleItems = document.querySelectorAll('.dribbble');

// Aggiungi l'evento di click al bottone dentro ogni immagine
dribbbleItems.forEach(item => {
    const button = item.querySelector('.view-btn');
    const link = item.getAttribute('data-link');

    button.addEventListener('click', () => {
        window.open(link, '_blank');
    });
});

// Seleziona l'SVG
const svgElement = document.querySelector('.clickable-icon');

// Aggiunge il comportamento al click
svgElement.addEventListener('click', function() {
    // Cambia 'https://example.com' con il tuo link
    window.open('https://example.com', '_blank');
});

// Colleziona tutte le immagini SVG
const svgElements = document.querySelectorAll('.clickable-icon');

// Array di link per ciascuna immagine SVG
const links = [
    'https://www.behance.net/ayrtondian90ac',
    'https://dribbble.com/francesca-diana',
    'https://www.linkedin.com/in/francesca-diana/'
];

// Aggiungi l'evento click a ciascuna SVG
svgElements.forEach((svg, index) => {
    svg.addEventListener('click', () => {
        // Apre il link corrispondente in una nuova tab
        window.open(links[index], '_blank');
    });
});

// Seleziona l'icona, il testo da copiare e l'elemento del messaggio di conferma
const copyIcon = document.getElementById("copy-icon");
const textToCopy = document.getElementById("text-to-copy").textContent;
const confirmation = document.getElementById("copy-confirmation");

// Aggiungi un listener per il clic sull'icona
copyIcon.addEventListener("click", function() {
  // Verifica se l'API Clipboard è supportata
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).then(function() {
      // Mostra un messaggio di conferma
      confirmation.classList.add("show");
      setTimeout(() => { confirmation.classList.remove("show"); }, 2000);
    }).catch(function(error) {
      console.error("Errore durante la copia del testo: ", error);
    });
  } else {
    // Fallback: Se l'API Clipboard non è supportata
    console.warn("L'API Clipboard non è supportata in questo browser.");
  }
});
