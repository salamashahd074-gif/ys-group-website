
// YS GROUP - Store functionality

const whatsappNumber = "201115803811";

const cart = [];

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

// Open and close cart
function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
}

function hideCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", hideCart);
cartOverlay.addEventListener("click", hideCart);

// Add product to cart
document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = Number(button.dataset.price || 0);

    const existingProduct = cart.find((item) => item.id === id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        quantity: 1
      });
    }

    updateCart();

    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-check"></i> تمت الإضافة';
    button.disabled = true;

    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
    }, 900);
  });
});

// Update cart display
function updateCart() {
  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  cartCount.textContent = totalQuantity;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">السلة فارغة حاليًا.</p>';
    cartTotal.textContent = "يحدد بعد تأكيد السعر";
    return;
  }

  cartItems.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div>
        <strong>${escapeHTML(item.name)}</strong>
        <small>السعر يحدد بعد التواصل</small>
      </div>

      <div class="quantity-controls">
        <button type="button" data-action="decrease" data-id="${item.id}">−</button>
        <span>${item.quantity}</span>
        <button type="button" data-action="increase" data-id="${item.id}">+</button>
      </div>
    </div>
  `).join("");

  cartTotal.textContent = "يحدد بعد تأكيد السعر";
}

// Prevent product names from being interpreted as HTML
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

// Change quantity
cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = button.dataset.id;
  const action = button.dataset.action;
  const product = cart.find((item) => item.id === id);

  if (!product) return;

  if (action === "increase") {
    product.quantity += 1;
  }

  if (action === "decrease") {
    product.quantity -= 1;

    if (product.quantity <= 0) {
      const index = cart.findIndex((item) => item.id === id);
      cart.splice(index, 1);
    }
  }

  updateCart();
});

// Send order to WhatsApp
checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("السلة فارغة. أضيفي منتجًا أولًا.");
    return;
  }

  const orderLines = cart.map((item, index) => {
    return `${index + 1}- ${item.name} | الكمية: ${item.quantity}`;
  });

  const message = [
    "مرحبًا YS GROUP، أريد الاستفسار عن المنتجات التالية:",
    "",
    ...orderLines,
    "",
    "من فضلكم أرسلوا لي الأسعار وتفاصيل الطلب.",
    "شكرًا لكم."
  ].join("\n");

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

// Product filters
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");

let selectedCategory = "all";

function filterProducts() {
  const searchText = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach((card) => {
    const category = card.dataset.category;
    const name = card.dataset.name.toLowerCase();

    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;

    const matchesSearch = name.includes(searchText);

    const shouldShow = matchesCategory && matchesSearch;

    card.style.display = shouldShow ? "" : "none";

    if (shouldShow) visibleCount++;
  });

  emptyMessage.style.display = visibleCount === 0 ? "block" : "none";
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");
    selectedCategory = button.dataset.filter;

    filterProducts();
  });
});

searchInput.addEventListener("input", filterProducts);

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");

  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");

    const icon = menuToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  header.classList.toggle("scrolled", window.scrollY > 40);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Quick view
document.querySelectorAll(".quick-view").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    const productName = card.dataset.name;

    alert(
      `منتج ${productName}\nللاستفسار عن السعر والتفاصيل تواصل معنا عبر واتساب.`
    );
  });
});
