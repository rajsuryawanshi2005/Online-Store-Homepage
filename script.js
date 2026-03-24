let filteredProducts = [...products];

const container = document.getElementById("products");
const searchInput = document.getElementById("search");

/* Display Products */
function displayProducts(data) {
  container.innerHTML = "";

  data.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button>Add to Cart</button>
      </div>
    `;
  });
}

/* Filter by Category */
function filterCategory(category) {
  if (category === "All") {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(p => p.category === category);
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

/* Search */
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  const searched = filteredProducts.filter(p =>
    p.name.toLowerCase().includes(searchValue)
  );

  displayProducts(searched);
});

/* Initial Load */
displayProducts(products);
