const translations = {
    en: {
        nav_shop: "Shop",
        nav_collections: "Collections",
        nav_philosophy: "Philosophy",
        nav_about: "About",
        hero_new: "New Collection 2026",
        hero_title: "Beauty In Simplicity",
        hero_desc: "Experience the pure essence of nature with our dermatologically tested, organic skincare routine. Crafted for every skin type.",
        hero_cta: "Shop Now",
        hero_story: "Our Story",
        hero_feat1: "Natural Ingredients",
        hero_feat2: "Cruelty Free",
        hero_feat3: "Deep Hydration",
        shop_title: "Best Sellers",
        shop_subtitle: "Our Shop",
        shop_all: "All",
        shop_face: "Face",
        shop_body: "Body",
        product_add: "Quick Add",
        footer_desc: "We believe in the power of nature and the beauty of simplicity.",
        footer_discover: "Discover",
        footer_support: "Support"
    },
    uz: {
        nav_shop: "Do'kon",
        nav_collections: "To'plamlar",
        nav_philosophy: "Falsafamiz",
        nav_about: "Haqimizda",
        hero_new: "Yangi To'plam 2026",
        hero_title: "Go'zallik Soddalikda",
        hero_desc: "Tabiatning sof mohiyatini bizning dermatologik sinovdan o'tgan, organik terini parvarish qilish tartibimiz bilan his qiling.",
        hero_cta: "Sotib olish",
        hero_story: "Biz haqimizda",
        hero_feat1: "Tabiiy ingredientlar",
        hero_feat2: "Sinovlarsiz (Cruelty Free)",
        hero_feat3: "Chuqur namlantirish",
        shop_title: "Eng xaridorgir",
        shop_subtitle: "Bizning do'kon",
        shop_all: "Hammasi",
        shop_face: "Yuz uchun",
        shop_body: "Beden uchun",
        product_add: "Savatga",
        footer_desc: "Biz tabiat kuchiga va soddalik go'zalligiga ishonamiz.",
        footer_discover: "Kashf qiling",
        footer_support: "Yordam"
    },
    ru: {
        nav_shop: "Магазин",
        nav_collections: "Коллекции",
        nav_philosophy: "Философия",
        nav_about: "О нас",
        hero_new: "Новая Коллекция 2026",
        hero_title: "Красота в Простоте",
        hero_desc: "Почувствуйте истинную сущность природы с нашими дерматологически протестированными органическими средствами.",
        hero_cta: "Купить Сейчас",
        hero_story: "Наша История",
        hero_feat1: "Натуральные компоненты",
        hero_feat2: "Не тестируется на животных",
        hero_feat3: "Глубокое увлажнение",
        shop_title: "Хиты продаж",
        shop_subtitle: "Наш магазин",
        shop_all: "Все",
        shop_face: "Для лица",
        shop_body: "Для тела",
        product_add: "В корзину",
        footer_desc: "Мы верим в силу природы и красоту простоты.",
        footer_discover: "Узнать больше",
        footer_support: "Поддержка",
        cart_title: "Корзина",
        cart_total: "Итого:",
        cart_checkout: "Оформить заказ"
    },
    uz: {
        nav_shop: "Do'kon",
        nav_collections: "To'plamlar",
        nav_philosophy: "Falsafamiz",
        nav_about: "Haqimizda",
        hero_new: "Yangi To'plam 2026",
        hero_title: "Go'zallik Soddalikda",
        hero_desc: "Tabiatning sof mohiyatini bizning dermatologik sinovdan o'tgan, organik terini parvarish qilish tartibimiz bilan his qiling.",
        hero_cta: "Sotib olish",
        hero_story: "Biz haqimizda",
        hero_feat1: "Tabiiy ingredientlar",
        hero_feat2: "Sinovlarsiz (Cruelty Free)",
        hero_feat3: "Chuqur namlantirish",
        shop_title: "Eng xaridorgir",
        shop_subtitle: "Bizning do'kon",
        shop_all: "Hammasi",
        shop_face: "Yuz uchun",
        shop_body: "Beden uchun",
        product_add: "Savatga",
        footer_desc: "Biz tabiat kuchiga va soddalik go'zalligiga ishonamiz.",
        footer_discover: "Kashf qiling",
        footer_support: "Yordam",
        cart_title: "Savat",
        cart_total: "Jami:",
        cart_checkout: "Buyurtma berish"
    },
    en: {
        nav_shop: "Shop",
        nav_collections: "Collections",
        nav_philosophy: "Philosophy",
        nav_about: "About",
        hero_new: "New Collection 2026",
        hero_title: "Beauty In Simplicity",
        hero_desc: "Experience the pure essence of nature with our dermatologically tested, organic skincare routine. Crafted for every skin type.",
        hero_cta: "Shop Now",
        hero_story: "Our Story",
        hero_feat1: "Natural Ingredients",
        hero_feat2: "Cruelty Free",
        hero_feat3: "Deep Hydration",
        shop_title: "Best Sellers",
        shop_subtitle: "Our Shop",
        shop_all: "All",
        shop_face: "Face",
        shop_body: "Body",
        product_add: "Quick Add",
        footer_desc: "We believe in the power of nature and the beauty of simplicity.",
        footer_discover: "Discover",
        footer_support: "Support",
        cart_title: "Shopping Cart",
        cart_total: "Total:",
        cart_checkout: "Checkout"
    }
};

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartUI() {
    const cartContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalAmount = document.querySelector('.total-amount');
    
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += parseFloat(item.price) * item.quantity;
        count += item.quantity;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div class="cart-item-info">
                <h5>${item.name}</h5>
                <span>${item.quantity} x $${item.price}</span>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(itemEl);
    });

    cartCount.textContent = count;
    totalAmount.textContent = `$${total.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartUI();
    // Open cart dropdown to show feedback
    document.querySelector('.cart-dropdown').classList.add('active');
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

function setLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Update active class on buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Cart Toggle
    const cartToggle = document.querySelector('.cart-toggle');
    const cartDropdown = document.querySelector('.cart-dropdown');
    
    if (cartToggle) {
        cartToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            cartDropdown.classList.toggle('active');
        });
    }

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (cartDropdown && !cartDropdown.contains(e.target) && !cartToggle.contains(e.target)) {
            cartDropdown.classList.remove('active');
        }
    });

    // Add to cart buttons
    document.querySelectorAll('.quick-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const id = card.getAttribute('data-id');
            const name = card.getAttribute('data-name');
            const price = card.getAttribute('data-price');
            addToCart(id, name, price);
        });
    });

    updateCartUI();
});
