import { isSanityConfigured, fetchHeroData, fetchProductsData, urlFor } from './sanity.js';

// Read WhatsApp number from environment variable with fallback
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '5511980157534';
const productBrand = 'MG Modas';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    function toggleMenu() {
        mobileMenuOverlay.classList.toggle('active');
        if (mobileMenuOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn && closeMenuBtn && mobileMenuOverlay) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Smooth Scrolling for Anchor Links (fallback/enhancement)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Update WhatsApp links for static elements
    updateStaticWhatsAppLinks();

    // 5. Load dynamic content from Sanity if configured
    initDynamicContent();
});

/**
 * Updates all WhatsApp links in the static HTML with the correct number and messages.
 */
function updateStaticWhatsAppLinks() {
    // 1. General contact links
    const generalLinks = document.querySelectorAll([
        '.btn-whatsapp-nav', 
        '.mobile-links .btn-primary', 
        '.hero-buttons .btn-secondary', 
        '.collection-action .btn-outline', 
        '.cta-content .btn-primary'
    ].join(','));
    
    generalLinks.forEach(link => {
        const text = 'Olá! Gostaria de falar com uma consultora da MG Modas.';
        link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    });

    // 2. Static product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const titleEl = card.querySelector('h3');
        const priceEl = card.querySelector('.price');
        const buyBtn = card.querySelector('.btn-buy');
        
        if (titleEl && priceEl && buyBtn) {
            const productName = titleEl.textContent.trim();
            const productPrice = priceEl.textContent.trim();
            
            const text = `Olá, como podemos ajudar? A MG Moda Feminina está à sua disposição.\n\nTenho interesse no produto:\n• *Nome:* ${productName}\n• *Marca:* ${productBrand}\n• *Preço:* ${productPrice}\n\nAinda está disponível?`;
            
            buyBtn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        }
    });
}

/**
 * Initializes and fetches dynamic content from Sanity CMS.
 * If Sanity is not configured, it fails gracefully keeping the static HTML fallbacks.
 */
async function initDynamicContent() {
    if (!isSanityConfigured()) {
        console.log('Sanity.io is not configured yet. Running with local static content.');
        return;
    }

    console.log('Sanity.io is configured. Fetching live content...');
    
    // Load Hero Banner Data
    try {
        const heroData = await fetchHeroData();
        if (heroData) {
            if (heroData.badge) {
                document.getElementById('hero-badge').textContent = heroData.badge;
            }
            if (heroData.title) {
                document.getElementById('hero-title').innerHTML = heroData.title;
            }
            if (heroData.description) {
                document.getElementById('hero-description').textContent = heroData.description;
            }
            if (heroData.image) {
                const imageUrl = urlFor(heroData.image);
                if (imageUrl) {
                    document.getElementById('hero-image').src = imageUrl;
                }
            }
        }
    } catch (e) {
        console.error('Failed to load hero banner from Sanity:', e);
    }

    // Load Products Data
    try {
        const products = await fetchProductsData();
        const productGrid = document.getElementById('product-grid');
        
        if (products && products.length > 0 && productGrid) {
            productGrid.innerHTML = ''; // Clear fallback products
            
            products.forEach(product => {
                const imageUrl = urlFor(product.image);
                const isNewTag = product.isNew ? '<span class="tag-new">Novo</span>' : '';
                
                // Format price: e.g. 119.90 to "R$ 119,90"
                let formattedPrice = product.price;
                if (typeof product.price === 'number') {
                    formattedPrice = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
                } else if (typeof product.price === 'string' && !product.price.startsWith('R$')) {
                    formattedPrice = `R$ ${product.price}`;
                }

                // WhatsApp message setup
                const waBaseUrl = `https://wa.me/${whatsappNumber}`;
                const text = `Olá, como podemos ajudar? A MG Moda Feminina está à sua disposição.\n\nTenho interesse no produto:\n• *Nome:* ${product.title}\n• *Marca:* ${productBrand}\n• *Preço:* ${formattedPrice}\n\nAinda está disponível?`;
                const encodedMessage = encodeURIComponent(text);
                const waLink = `${waBaseUrl}?text=${encodedMessage}`;

                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-img-box">
                        ${isNewTag}
                        <img src="${imageUrl || 'assets/images/placeholder.png'}" alt="${product.title}" loading="lazy">
                        <div class="product-overlay">
                            <a href="${waLink}" class="btn-buy" target="_blank">
                                <i class="ph ph-whatsapp-logo"></i> Comprar
                            </a>
                        </div>
                    </div>
                    <div class="product-info">
                        <span class="category">${product.category || 'Moda'}</span>
                        <h3>${product.title}</h3>
                        <p class="price">${formattedPrice}</p>
                    </div>
                `;
                productGrid.appendChild(productCard);
            });
        }
    } catch (e) {
        console.error('Failed to load products from Sanity:', e);
    }
}
