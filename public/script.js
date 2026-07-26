const cart = [];
let soulBowlCart = [];

let soulBowlLimit = 15;
let soulPlateLimit = 20;

const menuData = {

smashBurger: {
    name: "Tha Classic Smash Burger",
    price: 10,
    description: "Double smashed beef patties, American cheese, pickles and Solappin' Smash Sauce.",

   options: [
    "No Pickles",
    "No Cheese",
    "No Sauce"
],

    extras: [
        {
            name: "Add Bacon",
            price: 2
        },
        {
            name: "Add Caramelized Onions",
            price: 1
        }
    ]
},

 choppedCheese: {
    name: "Chopped Cheese",
    price: 12,
    description: "Seasoned chopped beef, grilled onions, grilled jalapeños, American cheese and Solappin' Sauce on a toasted hoagie.",

    options: [
    "No Cheese",
    "No Onions",
    "No Jalapeños",
    "No Sauce"
  ]

},

cheesesteak: {
    name: "Cheesesteaks",
    description: "Cheesesteak of your choice with grilled onions and peppers, Solappin' Mayo, melted provolone cheese on a toasted hoagie roll.",

    choices: [
        {
            name: "Steak",
            price: 12
        },
        {
            name: "Chicken",
            price: 12
        },
        {
            name: "Salmon",
            price: 15
        }
    ],

    options: [
        "No Cheese",
        "No Onions",
        "No Peppers",
        "No Mayo"
    ]
},

pasta: {
    name: "Cajun Alfredo Pasta",
    description: "Pasta tossed in a Creamy Cajun Alfredo Sauce with red peppers and your choice of protein.",

    choices: [
        {
            name: "No Protein",
            price: 10
        },
        {
            name: "Chicken",
            price: 12
        },
        {
            name: "Shrimp",
            price: 12
        },
        {
            name: "Combo",
            price: 15
        }
    ],

    options: [
        "No Red Peppers"
    ]
},

weeklyFeature: {

    name: "Hot Henny Glaze Fried Wingz & Cajun Alfredo Pasta",

    price: 15,

    description: "Regular or crispy fried wingz tossed in our SoLappin' Hot Henny Glaze with creamy Cajun Alfredo Pasta.",

    image: "hennywingz.jpeg",

    wingStyle: [
        "Regular",
        "Crispy"
    ],

    sauce: [
        "SoLappin' Hot Henny Glaze",
        "No Sauce"
    ]

},

soulBowl: {

    bowl: {
        name: "Soul Bowl",
        price: 20,
        description: "Cornbread bowl filled with Jasmine Rice, Mac & Cheese, Candied Yams, and your choice of protein."
    },

    plate: {
        name: "Soul Plate",
        price: 15,
        description: "Jasmine Rice, Mac & Cheese, Candied Yams, and a side of cornbread with your choice of protein."
    },

    proteins: [
        "Chicken Bites",
        "Wings",
        "Salmon",
	"Fried Shrimp"
    ],

    sauces: [
        "Wet Lemon Pepper",
        "Buffalo",
        "BBQ",
        "Sweet Thai Chili",
        "Garlic Parmesan",
        "Henny Glaze",
	"Naked"
    ]

},

};

function addToCart(itemName, basePrice, containerId) {

  const container = document.getElementById(containerId);

  const selections = [];
  let price = basePrice;

  // CHECKBOXES
  container.querySelectorAll("input[type=checkbox]").forEach(box => {
    if (box.checked) {
      selections.push(box.value);

      if (box.dataset.price) {
        price += Number(box.dataset.price);
      }
    }
  });

  // RADIOS
  container.querySelectorAll("input[type=radio]").forEach(radio => {
    if (radio.checked) {
      selections.push(radio.value);
    }
  });

  // SELECTS
  container.querySelectorAll("select").forEach(select => {
    if (select.value && select.value !== "") {
      selections.push(select.value);
    }
  });

  cart.push({
    name: itemName,
    price: Number(price.toFixed(2)),
    selections
  });

  renderCart();
  document.getElementById("floatingCartCount").innerText = cart.length;

  // RESET FORM AFTER ADDING TO CART
  container.querySelectorAll("input[type=checkbox]").forEach(box => {
    box.checked = false;
  });

  container.querySelectorAll("input[type=radio]").forEach(radio => {
    radio.checked = false;
  });

  container.querySelectorAll("select").forEach(select => {
    select.selectedIndex = 0;
  });

}

function renderCart() {

  const cartDiv = document.getElementById("cartItems");
  const floatingDiv = document.getElementById("floatingCartItems");

  cartDiv.innerHTML = "";
  floatingDiv.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price;

    const itemHTML = `
  <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0;">
    <div>
      <strong>${item.name}</strong><br>
      ${item.selections.join(", ")}
    </div>

    <div style="display:flex; gap:10px;">

      <button onclick="removeFromCart(${index})" style="background:none; border:none; cursor:pointer;">
        🗑️
      </button>
    </div>
  </div>
  <hr>
`;


    cartDiv.innerHTML += itemHTML;
    floatingDiv.innerHTML += `
        <div style="padding:4px 0;">
            <strong>${item.name}</strong><br>
            <small>${item.selections.join(", ")}</small>
        </div>
        <hr>
    `;
});

  document.getElementById("cartTotal").innerText =
    `Total: $${total.toFixed(2)}`;

  document.getElementById("floatingCartTotal").innerText =
    `Total: $${total.toFixed(2)}`;

document.getElementById("floatingCartCount").innerText = cart.length;
}


function removeFromCart(index) {

  const item = cart[index];

  const confirmDelete = confirm(
    `Remove "${item.name}" from your cart?`
  );

  if (!confirmDelete) return;

  cart.splice(index, 1);
  renderCart();
document.getElementById("floatingCartCount").innerText = cart.length;
}

function renderMenu() {

    document.getElementById("burgerMenu").innerHTML = `
    <h3>${menuData.smashBurger.name} - $${menuData.smashBurger.price}</h3>
    <p>${menuData.smashBurger.description}</p>

    <h4>Remove Options</h4>

    ${menuData.smashBurger.options.map(opt => `
        <label>
            <input type="checkbox" value="${opt}">
            ${opt}
        </label><br>
    `).join("")}

    <h4>Extras</h4>

   ${menuData.smashBurger.extras.map(extra => `
        <label>
            <input type="checkbox" id="${extra.name.replace(/\s+/g, '')}" value="${extra.name}" data-price="${extra.price}">
            ${extra.name} (+$${extra.price})
        </label><br>
    `).join("")}

    <br>

<button onclick="addToCart('Smash Burger', 10, 'burgerMenu')">
    Add to Cart
</button>

`;

document.getElementById("choppedCheeseMenu").innerHTML = `
    <h3>${menuData.choppedCheese.name} - $${menuData.choppedCheese.price}</h3>

    <p>${menuData.choppedCheese.description}</p>

    <h4>Remove Options</h4>

    ${menuData.choppedCheese.options.map(option => `
        <label>
            <input type="checkbox" value="${option}">
            ${option}
        </label><br>
    `).join("")}

    <br>

    <button onclick="addToCart('Chopped Cheese', 10, 'choppedCheeseMenu')">
        Add to Cart
    </button>
`;

document.getElementById("cheesesteakMenu").innerHTML = `
    <h3>${menuData.cheesesteak.name}</h3>

    <p>${menuData.cheesesteak.description}</p>

    <h4>Choose Your Protein</h4>

    ${menuData.cheesesteak.choices.map(choice => `
        <label>
            <input type="radio" name="cheesesteakProtein" value="${choice.name}">
            ${choice.name} - $${choice.price}
        </label><br>
    `).join("")}

    <br>

    <h4>Remove Options</h4>

    ${menuData.cheesesteak.options.map(option => `
        <label>
            <input type="checkbox" value="${option}">
            ${option}
        </label><br>
    `).join("")}

    <br>

    <button onclick="addCheesesteakToCart()">
    Add to Cart
</button>
`;

document.getElementById("pastaMenu").innerHTML = `
    <h3>${menuData.pasta.name}</h3>

    <p>${menuData.pasta.description}</p>

    <h4>Choose Your Protein</h4>

    ${menuData.pasta.choices.map(choice => `
        <label>
            <input type="radio" name="pastaProtein" value="${choice.name}">
            ${choice.name} - $${choice.price}
        </label><br>
    `).join("")}

    <br>

    <h4>Remove Options</h4>

    ${menuData.pasta.options.map(option => `
        <label>
            <input type="checkbox" value="${option}">
            ${option}
        </label><br>
    `).join("")}

    <br>

    <button onclick="addPastaToCart()">
        Add to Cart
    </button>
`;

document.getElementById("weeklyFeatureMenu").innerHTML = `

<div class="menu-item" style="text-align:center;">

<div style="
display:inline-block;
background:#d62828;
color:white;
padding:6px 12px;
border-radius:20px;
font-weight:bold;
margin-bottom:15px;">
🔥 Weekly Feature
</div>

<br><br>

<div class="weekly-image-slider">

<img src="hennywingz.jpeg"
class="weekly-slide"
style="width:100%; max-width:500px; border-radius:12px; margin:auto;"

<img src="hennywings.jpeg"
class="weekly-slide"
style="width:100%; max-width:500px; border-radius:12px; margin:auto;" display:none;">

</div>


<h3>
Hot Henny Glaze Fried Wingz & Cajun Pasta - $15
</h3>


<p style="font-size:22px;">
Regular or Crispy wingz tossed in our SoLappin' Hot Henny Glaze with a creamy Cajun Alfredo Pasta.
</p>


<h3 style="font-size:22px;">Wing Style</h3>

<select id="weeklyWingStyle" style="font-size:18px; padding:8px;">

<option value="">Choose Style</option>
<option value="Regular">Regular</option>
<option value="Crispy">Crispy</option>

</select>


<br><br>


<h3 style="font-size:22px;">Sauce Option</h3>

<select id="weeklySauce" style="font-size:18px; padding:8px;">

<option value="">Choose Sauce Option</option>
<option value="Tossed">Tossed</option>
<option value="Sauce on the Side">Sauce on the Side</option>

</select>


<br><br>


<button onclick="addWeeklyFeatureToCart()">
Add to Cart
</button>


</div>

`;

document.getElementById("soulBowlMenu").innerHTML = `
<div id="soulBowlBowl" class="menu-item">

<h3>${menuData.soulBowl.bowl.name} - $${menuData.soulBowl.bowl.price}</h3>

<p>${menuData.soulBowl.bowl.description}</p>

<h4>Choose Protein</h4>

<select id="soulBowlProtein">
  <option value="">Select Protein</option>
  ${menuData.soulBowl.proteins.map(p => `<option value="${p}">${p}</option>`).join("")}
</select>

<br><br>

<h4>Choose Sauce</h4>

<select id="soulBowlSauce">
  <option value="">Select Sauce</option>
  ${menuData.soulBowl.sauces.map(s => `<option value="${s}">${s}</option>`).join("")}
</select>

<br><br>

<label>
<input type="checkbox" id="extraSauce" value="Extra Sauce" data-price="0.50">
Extra Sauce (+$0.50)
</label>

<br>

<label>
<input type="checkbox" id="extraCornbread" value="Extra Cornbread" data-price="1.00">
Extra Cornbread (+$1.00)
</label>

<br><br>

<button onclick="addSoulBowlToCart()">
    Add Bowl to Cart
</button>

</div>

<hr>

<div id="soulBowlPlate">

<h3>${menuData.soulBowl.plate.name} - $${menuData.soulBowl.plate.price}</h3>

<p>${menuData.soulBowl.plate.description}</p>

<h4>Choose Protein</h4>

<select id="soulPlateProtein">
  <option value="">Select Protein</option>
  ${menuData.soulBowl.proteins.map(p => `<option value="${p}">${p}</option>`).join("")}
</select>

<br><br>

<h4>Choose Sauce</h4>

<select id="soulPlateSauce">
  <option value="">Select Sauce</option>
  ${menuData.soulBowl.sauces.map(s => `<option value="${s}">${s}</option>`).join("")}
</select>

<br><br>

<label>
<input type="checkbox" id="extraPlateSauce" value="Extra Sauce" data-price="0.50">
Extra Sauce (+$0.50)
</label>

<br>

<label>
<input type="checkbox" id="extraPlateCornbread" value="Extra Cornbread" data-price="1.00">
Extra Cornbread (+$1.00)
</label>

<br><br>

<button onclick="addSoulPlateToCart()">
    Add Plate to Cart
</button>

</div>
`;

}

function addPastaToCart() {

  const container = document.getElementById("pastaMenu");

  // Find selected protein
  const selected = container.querySelector("input[name='pastaProtein']:checked");

  // FORCE USER TO PICK A PROTEIN
  if (!selected) {
    alert("Please choose a protein for your Cajun Alfredo Pasta.");
    return;
  }

  let itemName = "Cajun Alfredo Pasta";
  let price = 13; // fallback (won't be used now)

  // Add protein name to item
  itemName += ` (${selected.value})`;

  // Find matching price from menuData
  const choice = menuData.pasta.choices.find(c => c.name === selected.value);
  if (choice) {
    price = choice.price;
  }

  // Collect remove options
  const selections = [];

  container.querySelectorAll("input[type=checkbox]").forEach(box => {
    if (box.checked) {
      selections.push(box.value);
    }
  });

  cart.push({
  name: itemName,
  price: Number(price.toFixed(2)),
  selections
});

renderCart();

// RESET PASTA OPTIONS
container.querySelectorAll("input[type=radio]").forEach(radio => {
  radio.checked = false;
});

container.querySelectorAll("input[type=checkbox]").forEach(box => {
  box.checked = false;
});

}
function addCheesesteakToCart() {

  const container = document.getElementById("cheesesteakMenu");

  // Find selected protein
  const selected = container.querySelector("input[name='cheesesteakProtein']:checked");

  // FORCE USER TO PICK A PROTEIN
  if (!selected) {
    alert("Please choose a protein for your Cheesesteak.");
    return;
  }

  let itemName = "Cheesesteak";
  let price = 12; // fallback (won't be used now)

  // Add protein name to item
  itemName += ` (${selected.value})`;

  // Find matching price from menuData
  const choice = menuData.cheesesteak.choices.find(c => c.name === selected.value);
  if (choice) {
    price = choice.price;
  }

  // Collect remove options
  const selections = [];

  container.querySelectorAll("input[type=checkbox]").forEach(box => {
    if (box.checked) {
      selections.push(box.value);
    }
  });

  cart.push({
  name: itemName,
  price: Number(price.toFixed(2)),
  selections
});

renderCart();

// RESET CHEESESTEAK OPTIONS
container.querySelectorAll("input[type=radio]").forEach(radio => {
  radio.checked = false;
});

container.querySelectorAll("input[type=checkbox]").forEach(box => {
  box.checked = false;
});

}
function addSoulBowlToCart() {

  if (soulBowlLimit <= 0) {
    alert("Soul Bowls are sold out for this week.");
    return;
  }

  const container = document.getElementById("soulBowlBowl");

  const protein = document.getElementById("soulBowlProtein").value;
  const sauce = document.getElementById("soulBowlSauce").value;

  if (!protein || !sauce) {
    alert("Please choose your Soul Bowl options.");
    return;
  }

  let price = 20;
  const selections = [protein, sauce];

  container.querySelectorAll("input[type=checkbox]").forEach(box => {
    if (box.checked) {
      selections.push(box.value);
      if (box.dataset.price) price += Number(box.dataset.price);
    }
  });

  soulBowlLimit -= 1;

  if (soulBowlLimit <= 0) {
    document.getElementById("soulBowlBowl").style.opacity = "0.4";
  }

  soulBowlCart.push({
    name: "Soul Bowl",
    price: Number(price.toFixed(2)),
    selections
});

// Reset Soul Bowl selections
document.getElementById("soulBowlProtein").value = "";
document.getElementById("soulBowlSauce").value = "";

document.querySelectorAll("#soulBowlBowl input[type=checkbox]").forEach(box => {
    box.checked = false;
});

renderSoulBowlCart();

}

function addSoulPlateToCart() {

  if (soulPlateLimit <= 0) {
    alert("Soul Plates are sold out for this week.");
    return;
  }

  const container = document.getElementById("soulBowlPlate");

  const protein = document.getElementById("soulPlateProtein").value;
  const sauce = document.getElementById("soulPlateSauce").value;

  if (!protein || !sauce) {
    alert("Please choose your Soul Plate options.");
    return;
  }

  let price = 15;
  const selections = [protein, sauce];

  container.querySelectorAll("input[type=checkbox]").forEach(box => {
    if (box.checked) {
      selections.push(box.value);
      if (box.dataset.price) price += Number(box.dataset.price);
    }
  });

  soulPlateLimit -= 1;

  if (soulPlateLimit <= 0) {
    document.getElementById("soulBowlPlate").style.opacity = "0.4";
  }

  soulBowlCart.push({
    name: "Soul Plate",
    price: Number(price.toFixed(2)),
    selections
});

// Reset Soul Plate selections
document.getElementById("soulPlateProtein").value = "";
document.getElementById("soulPlateSauce").value = "";

document.querySelectorAll("#soulBowlPlate input[type=checkbox]").forEach(box => {
    box.checked = false;
});

renderSoulBowlCart();

}


renderMenu();

let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.getElementsByClassName("slide");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

function showTab(sectionId) {

    // HARD BLOCK: Hide Soul Bowl menu BEFORE tab switches
    if (sectionId === "soulBowlSection") {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();

    // Launch Date
    const launchDate = new Date("2026-07-13T00:00:00");

    // Weekly Schedule
    const weeklyOpen =
        (day >= 1 && day <= 4) ||
        (day === 5 && hour < 16);

    // Final Decision
    const isOpen =
        now >= launchDate &&
        weeklyOpen;

        if (!isOpen) {
            
            document.getElementById("soulMenuSection").style.display = "none";
            document.getElementById("preorderSection").style.display = "none";
            document.getElementById("closedSection").style.display = "block";

        }
    }

    const sections = [
    "homeSection",
    "weeklySection",
    "handheldsSection",
    "pastaSection",
    "soulBowlSection",
    "cartSection",
    "checkoutSection"
];

    sections.forEach(id => {
        document.getElementById(id).style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";

    if (sectionId === "soulBowlSection") {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();

        const preorderSection = document.getElementById("preorderSection");
        const closedSection = document.getElementById("closedSection");
        const soulMenuSection = document.getElementById("soulMenuSection");

        preorderSection.style.display = "none";
        closedSection.style.display = "none";
        soulMenuSection.style.display = "none";

       // Launch Date
const launchDate = new Date("2026-07-13T00:00:00");

// Weekly Schedule
const weeklyOpen =
    (day >= 1 && day <= 4) ||
    (day === 5 && hour < 16);

// Final Decision
const isOpen =
    now >= launchDate &&
    weeklyOpen;

if (isOpen) {
    soulMenuSection.style.display = "block";
} else {
    closedSection.style.display = "block";
}
    }
}

async function submitOrder() {

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const email = document.getElementById("customerEmail").value.trim();

    if (!name || !phone) {
        alert("Please enter your name and phone number.");
        return;
    }

    if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
        alert("Please enter a valid phone number (xxx-xxx-xxxx).");
        return;
    }
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const orderData = {
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        cart: cart
    };

    try {
        const response = await fetch("https://tha1029-ordering.onrender.com/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            alert("Order Submitted Successfully!");

            cart.length = 0;
            renderCart();

            showTab("homeSection");
        } else {
            alert("Error submitting order.");
        }

    } catch (err) {
        alert("Could not connect to server.");
        console.log(err);
    }
}
document.getElementById("customerPhone").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // remove non-digits

    if (value.length > 3 && value.length <= 6) {
        value = value.replace(/(\d{3})(\d+)/, "$1-$2");
    } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d+)/, "$1-$2-$3");
    }

    e.target.value = value;
});

document.getElementById("preorderPhone").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 3 && value.length <= 6) {
        value = value.replace(/(\d{3})(\d+)/, "$1-$2");
    } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d+)/, "$1-$2-$3");
    }

    e.target.value = value;
});

// -------------------------------
// SOUL BOWL CART RENDERER (PART 3)
// -------------------------------
function renderSoulBowlCart() {
    const sticky = document.getElementById("floatingSoulBowlCart");
    const preorder = document.getElementById("preorderSoulBowlCart");

    let html = "";
    let total = 0;

    soulBowlCart.forEach((item, index) => {
        total += item.price;

        html += `
            <div style="padding:6px 0; display:flex; justify-content:space-between;">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${item.selections.join(", ")}</small>
                </div>
                <button onclick="removeSoulBowlItem(${index})"
                        style="background:none; border:none; cursor:pointer;">
                    🗑️
                </button>
            </div>
            <hr>
        `;
    });

    if (sticky) {
        sticky.innerHTML = html + `<strong>Total: $${total.toFixed(2)}</strong>`;
    }

    if (preorder) {
        preorder.innerHTML = html + `<strong>Total: $${total.toFixed(2)}</strong>`;
    }

    // Update sticky cart counter
    const totalCount = cart.length + soulBowlCart.length;
    const counter = document.getElementById("floatingCartCount");
    if (counter) counter.innerText = totalCount;
}

// -------------------------------
// REMOVE BUTTON FOR SOUL BOWL CART
// -------------------------------
function removeSoulBowlItem(index) {
    soulBowlCart.splice(index, 1);
    renderSoulBowlCart();
}



// Pre‑Order Submit
const preOrderForm = document.getElementById("preOrderForm");

if (preOrderForm) {
  preOrderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(preOrderForm);
    const data = Object.fromEntries(formData);

    const res = await fetch("https://tha1029-ordering.onrender.com/api/sowlbowl-preorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
  });
}
const startPreorderBtn = document.getElementById("startPreorderBtn");
const preorderSummary = document.getElementById("preorderSummary");

if (startPreorderBtn) {
    startPreorderBtn.addEventListener("click", () => {

        // Read Bowl selections
        const bowlProtein = document.getElementById("soulBowlProtein").value;
        const bowlSauce = document.getElementById("soulBowlSauce").value;

        // Read Plate selections
        const plateProtein = document.getElementById("soulPlateProtein").value;
        const plateSauce = document.getElementById("soulPlateSauce").value;

        // Require at least one item in the Soul Bowl cart
if (soulBowlCart.length === 0) {
    alert("Please add a Soul Bowl or Soul Plate before pre‑ordering.");
    return;
}

        // Show the pre‑order form
        document.getElementById("soulMenuSection").style.display = "none";
        document.getElementById("preorderSection").style.display = "block";

        // Render the Soul Bowl cart into both sticky + pre‑order cart
        renderSoulBowlCart();
    });
}
const preorderBackBtn = document.getElementById("preorderBackBtn");

if (preorderBackBtn) {
    preorderBackBtn.addEventListener("click", () => {

        // Hide pre‑order form
        document.getElementById("preorderSection").style.display = "none";

        // Show Soul Bowl menu again
        document.getElementById("soulMenuSection").style.display = "block";

        // Keep cart visible and synced
        renderSoulBowlCart();
    });
}

const submitPreorderBtn = document.getElementById("submitPreorderBtn");

if (submitPreorderBtn) {
    submitPreorderBtn.addEventListener("click", async () => {

        const name = document.getElementById("preorderName").value.trim();
        const phone = document.getElementById("preorderPhone").value.trim();
        const time = document.getElementById("preorderTime").value;
        const location = document.getElementById("preorderLocation").value.trim();

	// Validate phone number format
	if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
   	 alert("Please enter a valid phone number (xxx-xxx-xxxx).");
    	 return;
}
        if (!name || !phone || !location) {
            alert("Please fill out all fields.");
            return;
        }

        const orderDetails = preorderSummary.innerText;

        const data = {
            name,
            phone,
            orderDetails,
            pickupTime: time,
            pickupLocation: location
        };

        const res = await fetch("https://tha1029-ordering.onrender.com/api/sowlbowl-preorder", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        alert(result.message);

        document.getElementById("soulMenuSection").style.display = "block";
        document.getElementById("preorderSection").style.display = "none";
    });
}
// MOBILE-FRIENDLY CART TOGGLE
const cartHeader = document.getElementById("floatingCartHeader");
const cartContent = document.getElementById("floatingCartContent");

cartHeader.addEventListener("click", function () {
    // Toggle for mobile
    if (cartContent.style.display === "block") {
        cartContent.style.display = "none";
    } else {
        cartContent.style.display = "block";
    }
});

function addWeeklyFeatureToCart(){

const wingStyle = document.getElementById("weeklyWingStyle").value;
const sauce = document.getElementById("weeklySauce").value;


if(!wingStyle || !sauce){
    alert("Please choose your wing style and sauce.");
    return;
}


const selections = [
    wingStyle,
    sauce
];


cart.push({
    name: menuData.weeklyFeature.name,
    price: menuData.weeklyFeature.price,
    selections
});


renderCart();


// RESET OPTIONS

document.getElementById("weeklyWingStyle").value = "";

document.getElementById("weeklySauce").value = "";


alert("Weekly Feature added to cart!");

}


function startWeeklySlideshow(){

let slides = document.querySelectorAll(".weekly-slide");

if(slides.length === 0){
    return;
}

let current = 0;

setInterval(() => {

slides[current].style.display = "none";

current = (current + 1) % slides.length;

slides[current].style.display = "block";

}, 3000);

}

startWeeklySlideshow();