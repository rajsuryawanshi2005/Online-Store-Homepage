let products = [];
let filteredProducts = [];
let cart = [];

const container = document.getElementById("products");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cart-count");

/* Fetch API Data */
async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  products = data;
  filteredProducts = data;

  displayProducts(products);
}

/* Display Products */
function displayProducts(data) {
  container.innerHTML = "";

  data.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" />
      <h3>${product.title}</h3>
      <p>₹${product.price}</p>
      <p>⭐ ${product.rating.rate}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    container.appendChild(card);
  });
}

/* Add to Cart */
function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);

  cartCount.innerText = cart.length;
}

/* Filter by Category */
function filterCategory(category) {
  if (category === "All") {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(p =>
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  displayProducts(filteredProducts);
}

/* Sort Products */
function sortProducts() {
  const value = document.getElementById("priceSort").value;

  if (value === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (value === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  displayProducts(filteredProducts);
}

/* Rating Filter */
function filterRating() {
  const ratingValue = document.getElementById("ratingFilter").value;

  if (ratingValue === "") {
    displayProducts(filteredProducts);
    return;
  }

  const filtered = filteredProducts.filter(p =>
    p.rating.rate >= ratingValue
  );

  displayProducts(filtered);
}

/* Search */
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  const searched = filteredProducts.filter(p =>
    p.title.toLowerCase().includes(searchValue)
  );

  displayProducts(searched);
});

/* Load API */
fetchProducts();
