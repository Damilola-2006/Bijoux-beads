const cartItemsContainer = document.getElementById("cart-items");

function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

document.addEventListener("DOMContentLoaded", displayCart);
document.addEventListener("DOMContentLoaded", function () {
    // Check if dark mode was on before
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
});
