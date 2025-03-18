document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartCount = document.querySelector(".cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to update cart count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Fetch Products from JSON File
    fetch("products.json?v=" + new Date().getTime()) // Prevents caching issues
        .then(response => response.json())
        .then(products => {
            productList.innerHTML = ""; // Clear existing products

            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button class="add-to-cart">Add to Cart</button>
                `;
                productList.appendChild(productCard);

                // Add to cart functionality
                productCard.querySelector(".add-to-cart").addEventListener("click", () => {
                    cart.push(product);
                    localStorage.setItem("cart", JSON.stringify(cart)); 
                    updateCartCount();
                    alert(`${product.name} added to cart!`);
                });
            });

            updateCartCount();
        })
        .catch(error => console.error("Error fetching products:", error));

    // DARK MODE FUNCTIONALITY
    const toggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    toggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem("dark-mode", "disabled");
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
});
