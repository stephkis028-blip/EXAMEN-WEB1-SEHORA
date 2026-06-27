// ========== BURGER MENU (mobile) ==========
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ========== CARROUSEL ACCUEIL ==========
let currentIndex = 0;
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let autoSlideInterval;

// Fonction pour afficher l'élément actif
function showSlide(index) {
    if (!carousel || items.length === 0) return;
    
    // Gérer les limites
    if (index < 0) {
        currentIndex = items.length - 1;
    } else if (index >= items.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    
    // Déplacer le carrousel
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

// Aller au slide suivant
function nextSlide() {
    showSlide(currentIndex + 1);
}

// Aller au slide précédent
function prevSlide() {
    showSlide(currentIndex - 1);
}

// Démarrer le défilement automatique
function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 4000);
}

// Arrêter le défilement automatique
function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Événements des boutons du carrousel
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide(); // Réinitialiser le timer
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide(); // Réinitialiser le timer
    });
}

// Pause au survol
if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
}

// Initialiser le carrousel
if (items.length > 0) {
    showSlide(0);
    startAutoSlide();
}

// ========== CARROUSEL CATÉGORIES (MENU) ==========
const categoryItems = document.querySelectorAll('.category-item');
const menuItems = document.querySelectorAll('.menu-item');

if (categoryItems.length > 0) {
    categoryItems.forEach(category => {
        category.addEventListener('click', function() {
            // Enlever la classe active de toutes les catégories
            categoryItems.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const categoryName = this.getAttribute('data-category');
            
            // Filtrer les éléments du menu
            menuItems.forEach(item => {
                if (categoryName === 'all' || item.getAttribute('data-category') === categoryName) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ========== FORMULAIRE DE COMMANDE ==========
const orderForm = document.getElementById('orderForm');

if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const items = document.getElementById('items').value;
        const time = document.getElementById('time').value;
        
        if (name && phone && address && items) {
            alert(`✅ Commande confirmée !\n\n` +
                  `👤 Client : ${name}\n` +
                  `📞 Téléphone : ${phone}\n` +
                  `📍 Adresse : ${address}\n` +
                  `📝 Articles : ${items}\n` +
                  `⏰ Livraison : ${time || 'Dès que possible'}\n\n` +
                  `Merci pour votre commande chez FastBite !`);
            
            this.reset();
        } else {
            alert('⚠️ Veuillez remplir tous les champs obligatoires.');
        }
    });
}

// ========== FORMULAIRE DE CONTACT ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            alert(`✅ Message envoyé !\n\n` +
                  `👤 Nom : ${name}\n` +
                  `📧 Email : ${email}\n` +
                  `💬 Message : ${message}\n\n` +
                  `Nous vous répondrons dans les plus brefs délais.`);
            
            this.reset();
        } else {
            alert('⚠️ Veuillez remplir tous les champs.');
        }
    });
}

// ========== BOUTONS "COMMANDER" (page menu) ==========
const orderButtons = document.querySelectorAll('.btn-order');

orderButtons.forEach(button => {
    button.addEventListener('click', function() {
        const item = this.closest('.menu-item');
        const name = item.querySelector('h3').textContent;
        const price = item.querySelector('.price').textContent;
        
        // Rediriger vers la page commandes avec pré-remplissage
        const orderItems = document.getElementById('items');
        if (orderItems) {
            orderItems.value = `${name} - ${price}`;
            // Scroll vers le formulaire
            document.querySelector('.order-form').scrollIntoView({ behavior: 'smooth' });
        } else {
            // Si on n'est pas sur la page commandes, rediriger
            window.location.href = `commandes.html?item=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
        }
    });
});

// ========== PRÉ-REMPLISSAGE DEPUIS L'URL (page commandes) ==========
const urlParams = new URLSearchParams(window.location.search);
const itemParam = urlParams.get('item');
const priceParam = urlParams.get('price');

if (itemParam && document.getElementById('items')) {
    const itemsField = document.getElementById('items');
    if (itemsField) {
        itemsField.value = `${itemParam} - ${priceParam}`;
    }
}

// ========== FERMER LE MENU BURGER AU CLIC SUR UN LIEN ==========
const navLinksItems = document.querySelectorAll('.nav-links a');

navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

console.log('✅ FastBite - Tous les scripts sont chargés !');