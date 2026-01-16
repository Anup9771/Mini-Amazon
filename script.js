// Cart data localStorage me save hoga
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = [];

// Products.json se data load karna
async function loadProducts() {
  try {
    const res = await fetch("products.json");
    products = await res.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// Products ko page par dikhana
function renderProducts(items) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  items.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" width="150" height="150">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <p>⭐ ${p.rating}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });

  updateCartCount();
}

// Cart me product add karna
function addToCart(id) {
  const item = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Cart count update karna
function updateCartCount() {
  document.getElementById("cart-count").innerText =
    cart.reduce((a, c) => a + c.qty, 0);
}

// Search bar ke liye (optional)
document.getElementById("search")?.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword) ||
    p.category.toLowerCase().includes(keyword)
  );
  renderProducts(filtered);
});

// Page load hone par products load karo
loadProducts();
