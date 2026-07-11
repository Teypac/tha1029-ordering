const cart = [];

function addToCart() {

  const toppings = [];

  document
    .querySelectorAll('input[type=checkbox]')
    .forEach(box => {
      if (box.checked) toppings.push(box.value);
    });

  cart.push({
    name: "Smash Burger",
    price: 10,
    toppings
  });

  renderCart();
}

function renderCart() {

  const cartDiv = document.getElementById("cart");

  cartDiv.innerHTML = "";

  let total = 0;

  cart.forEach(item => {

    total += item.price;

    cartDiv.innerHTML += `
      <div>
        <strong>${item.name}</strong><br>
        ${item.toppings.join(", ")}
        <hr>
      </div>
    `;
  });

  document.getElementById("total").innerText =
    total.toFixed(2);
}

async function submitOrder() {

  const customerName =
    document.getElementById("customerName").value;

  const response = await fetch(
    "http://localhost:3000/order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerName,
        cart
      })
    }
  );

  if(response.ok) {
    alert("Order Submitted!");
  }
}