// Global Configuration for easy updates
const CONFIG = {
    deliveryFee: 5.00, // You can change delivery price here
};

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
        footer_support: "Support",
        cart_title: "Shopping Cart",
        cart_total: "Total:",
        cart_checkout: "Checkout",
        auth_register_title: "Create Account",
        auth_register_subtitle: "Enter your details to get started",
        auth_login_title: "Welcome Back",
        auth_login_subtitle: "Login to your account",
        auth_name: "Full Name",
        auth_email: "Email Address",
        auth_password: "Password",
        auth_register_btn: "Register",
        auth_login_btn: "Login",
        auth_have_account: "Already have an account? ",
        auth_no_account: "Don't have an account? ",
        auth_login_link: "Login",
        auth_register_link: "Register",
        checkout_title: "Shipping Details",
        checkout_phone: "Phone Number",
        checkout_location: "Delivery Address",
        checkout_confirm_btn: "Confirm Order",
        order_summary: "Order Summary",
        subtotal: "Subtotal",
        delivery_fee: "Delivery Fee",
        total: "Total",
        delivery_notice: "Delivery price is fixed for all orders.",
        events_subtitle: "Upcoming Events",
        events_title: "Experience Our World",
        event1_title: "Skincare Masterclass",
        event1_desc: "Learn the secrets of a perfect routine from our experts.",
        event2_title: "Paris Collection Launch",
        event2_desc: "Be the first to try our new organic line.",
        test1_content: "\"My skin has never looked so radiant. These products are a game changer.\"",
        test2_content: "\"Finally, organic skincare that actually delivers results. Highly recommend!\"",
        test3_content: "\"The hydration is incredible. My face feels soft and fresh all day long.\"",
        contact_title: "Get In Touch",
        contact_subtitle: "We'd love to hear from you. Send us a message."
    },
    uz: {
        // ... previous uz
        delivery_notice: "Yetkazib berish narxi barcha buyurtmalar uchun o'zgarmas.",
        events_subtitle: "Yaqindagi tadbirlar",
        events_title: "Bizning dunyomizni kashf eting",
        event1_title: "Skincare bo'yicha master-klass",
        event1_desc: "Ekspertlarimizdan mukammal parvarish sirlarini o'rganing.",
        event2_title: "Paris To'plami Taqdimoti",
        event2_desc: "Bizning yangi organik liniyamizni birinchilardan bo'lib sinab ko'ring.",
        test1_content: "\"Terim hech qachon bunchalik yorqin ko'rinmagan. Bu mahsulotlar mo'jiza.\"",
        test2_content: "\"Nihoyat, haqiqiy natija beradigan organik kosmetika. Tavsiya qilaman!\"",
        test3_content: "\"Namlik darajasi ajoyib. Yuzim kun bo'yi yumshoq va yangi bo'lib turadi.\"",
        contact_title: "Biz bilan bog'laning",
        contact_subtitle: "Sizdan xabar kutib qolamiz. Bizga yozing."
    },
    ru: {
        // ... previous ru
        delivery_notice: "Стоимость доставки фиксирована для всех заказов.",
        events_subtitle: "Предстоящие события",
        events_title: "Погрузитесь в наш мир",
        event1_title: "Мастер-класс по уходу",
        event1_desc: "Узнайте секреты идеального ухода от наших экспертов.",
        event2_title: "Запуск Парижской коллекции",
        event2_desc: "Будьте первыми, кто попробует нашу новую органическую линию.",
        test1_content: "\"Моя кожа еще никогда не была такой сияющей. Эти продукты — просто находка.\"",
        test2_content: "\"Наконец-то органический уход, который действительно работает. Рекомендую!\"",
        test3_content: "\"Невероятное увлажнение. Мое лицо остается мягким и свежим весь день.\"",
        contact_title: "Свяжитесь с нами",
        contact_subtitle: "Мы будем рады услышать вас. Напишите нам."
    }
};

let isLoginMode = false;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function calculateOrderTotal() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += parseFloat(item.price) * item.quantity;
    });
    return {
        subtotal: subtotal,
        delivery: CONFIG.deliveryFee,
        total: subtotal + CONFIG.deliveryFee
    };
}

function renderOrderSummary() {
    const list = document.getElementById('summary-items-list');
    const subtotalEl = document.getElementById('subtotal-val');
    const deliveryEl = document.getElementById('delivery-fee-val');
    const totalEl = document.getElementById('total-val');
    
    if (!list) return;

    list.innerHTML = '';
    const calc = calculateOrderTotal();

    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'summary-item';
        div.innerHTML = `<span>${item.name} x ${item.quantity}</span> <span>$${(item.price * item.quantity).toFixed(2)}</span>`;
        list.appendChild(div);
    });

    subtotalEl.textContent = `$${calc.subtotal.toFixed(2)}`;
    deliveryEl.textContent = `$${calc.delivery.toFixed(2)}`;
    totalEl.textContent = `$${calc.total.toFixed(2)}`;
}

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

    if (cartCount) cartCount.textContent = count;
    if (totalAmount) totalAmount.textContent = `$${total.toFixed(2)}`;
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
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    document.documentElement.lang = lang;
    if (window.location.pathname.includes('checkout.html')) {
        renderOrderSummary();
    }
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    const title = document.getElementById('auth-title');
    const subtitle = document.getElementById('auth-subtitle');
    const nameGroup = document.getElementById('name-group');
    const submitBtn = document.getElementById('auth-submit');
    const switchText = document.getElementById('auth-switch-text');

    const lang = localStorage.getItem('selectedLanguage') || 'en';

    if (isLoginMode) {
        title.textContent = translations[lang].auth_login_title;
        subtitle.textContent = translations[lang].auth_login_subtitle;
        nameGroup.style.display = 'none';
        submitBtn.textContent = translations[lang].auth_login_btn;
        switchText.innerHTML = `${translations[lang].auth_no_account} <a href="#" id="auth-switch">${translations[lang].auth_register_link}</a>`;
    } else {
        title.textContent = translations[lang].auth_register_title;
        subtitle.textContent = translations[lang].auth_register_subtitle;
        nameGroup.style.display = 'block';
        submitBtn.textContent = translations[lang].auth_register_btn;
        switchText.innerHTML = `${translations[lang].auth_have_account} <a href="#" id="auth-switch">${translations[lang].auth_login_link}</a>`;
    }
    document.getElementById('auth-switch').addEventListener('click', (e) => { e.preventDefault(); toggleAuthMode(); });
}

function handleAuth(e) {
    e.preventDefault();
    const name = document.getElementById('auth-name').value;
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    if (isLoginMode) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email === email && user.password === password) {
            localStorage.setItem('isLoggedIn', 'true');
            hideAuth();
        } else { alert('Invalid credentials'); }
    } else {
        const user = { name, email, password };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        hideAuth();
    }
}

function hideAuth() {
    const overlay = document.getElementById('auth-overlay');
    if (overlay) overlay.style.display = 'none';
    document.body.classList.remove('auth-locked');
}

function checkAuth() {
    if (localStorage.getItem('isLoggedIn') === 'true') { hideAuth(); }
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLang);

    const authForm = document.getElementById('auth-form');
    if (authForm) authForm.addEventListener('submit', handleAuth);
    
    const authSwitch = document.getElementById('auth-switch');
    if (authSwitch) authSwitch.addEventListener('click', (e) => { e.preventDefault(); toggleAuthMode(); });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => { setLanguage(btn.getAttribute('data-lang')); });
    });

    const cartToggle = document.querySelector('.cart-toggle');
    const cartDropdown = document.querySelector('.cart-dropdown');
    if (cartToggle) {
        cartToggle.addEventListener('click', (e) => { e.stopPropagation(); cartDropdown.classList.toggle('active'); });
    }
    document.addEventListener('click', (e) => {
        if (cartDropdown && !cartDropdown.contains(e.target) && !cartToggle?.contains(e.target)) {
            cartDropdown.classList.remove('active');
        }
    });

    document.querySelectorAll('.quick-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            addToCart(card.getAttribute('data-id'), card.getAttribute('data-name'), card.getAttribute('data-price'));
        });
    });

    const checkoutBtn = document.querySelector('[data-i18n="cart_checkout"]');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) { window.location.href = 'checkout.html'; }
            else { alert('Your cart is empty'); }
        });
    }

    // Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    updateCartUI();
});
