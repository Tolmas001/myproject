// Mahsulotlar ro'yxati
const products = [
    { id: 1, name: "Lab bo'yog'i (Matte)", price: 85000, image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 2, name: "Yuz uchun tonal krem", price: 120000, image: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 3, name: "Ko'z uchun tenlar to'plami", price: 150000, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 4, name: "Parfyum (Pink Rose)", price: 250000, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 5, name: "Yuzni tozalovchi gel", price: 45000, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 6, name: "Tirnoq uchun laklar", price: 25000, image: "https://images.unsplash.com/photo-1630750304803-5f3dd61482b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
];

let cart = [];

// DOM elementlar
const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeBtn = document.querySelector('.close');
const cartItems = document.getElementById('cartItems');
const cartTotalSum = document.getElementById('cartTotalSum');
const registerForm = document.getElementById('registerForm');

// Mahsulotlarni chiqarish
if (productGrid) {
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price.toLocaleString()} so'm</p>
                <button class="btn-add" onclick="addToCart(${product.id})">Savatchaga qo'shish</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Savatchaga qo'shish
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
};

// Savatchani yangilash
function updateCart() {
    cartCount.innerText = cart.length;
    
    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price.toLocaleString()} so'm</span>
                <i class="fas fa-trash" style="cursor:pointer; color:red" onclick="removeFromCart(${index})"></i>
            `;
            cartItems.appendChild(itemDiv);
        });
        cartTotalSum.innerText = total.toLocaleString();
    }
}

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCart();
};

// Modal boshqaruvi
if (cartBtn) {
    cartBtn.onclick = () => cartModal.style.display = "block";
}
if (closeBtn) {
    closeBtn.onclick = () => cartModal.style.display = "none";
}
window.onclick = (event) => {
    if (event.target == cartModal) cartModal.style.display = "none";
};

// Ro'yxatdan o'tish formasi
if (registerForm) {
    registerForm.onsubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        alert(`Tabriklaymiz ${username}! Siz muvaffaqiyatli ro'yxatdan o'tdingiz.`);
        window.location.href = 'index.html';
    };
}
