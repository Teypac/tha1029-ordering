const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/health", (req, res) => res.send("OK"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "landing.html"));
});

app.get("/soulbowl", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/weekly", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/mealprep", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "mealprep.html"));
});

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;


app.post("/order", async (req, res) => {
  const { customerName, customerPhone, customerEmail, cart } = req.body;

  let message = `
New Order from ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail || "N/A"}

Items:
${cart.map(i => `${i.name} - $${i.price} (${i.selections.join(", ")})`).join("\n")}

Total: $${cart.reduce((t, i) => t + i.price, 0).toFixed(2)}
  `;

  try {
   await resend.emails.send({
  from: "Tha 10.29 <orders@tha1029.com>",
  to: "iteyonb@gmail.com",
  subject: "New Tha 10.29 Order",
  text: message
});

    res.status(200).send("Order stored");
  } catch (err) {
    console.log("Email error:", err);
    res.status(500).send("Email failed");
  }
});

app.post("/api/sowlbowl-preorder", async (req, res) => {
  const { name, phone, orderDetails, pickupTime, pickupLocation } = req.body;

  if (!name || !phone || !orderDetails || !pickupTime || !pickupLocation) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Soul Bowl Sunday Pre‑Order",
    text: `
New Soul Bowl Pre‑Order

Name: ${name}
Phone: ${phone}

Order:
${orderDetails}

Pickup Time: ${pickupTime}
Pickup Location: ${pickupLocation}
    `
  };

  try {
    await resend.emails.send({
  from: "Tha 10.29 <orders@tha1029.com>",
  to: "iteyonb@gmail.com",
  subject: "New Soul Bowl Sunday Pre‑Order",
  text: mailOptions.text
});

    res.json({ success: true, message: "Pre‑order submitted successfully." });
  } catch (err) {
    console.log("Email error:", err);
    res.status(500).json({ success: false, message: "Email failed." });
  }
});

app.post("/mealprep-intake", async (req, res) => {
  const data = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Meal Prep Submission",
    text: `
New Meal Prep Intake Submission

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}

Meals Per Week: ${data.mealsPerWeek}
Food Likes: ${data.foodLikes}

Location:
- City: ${data.city}
- Area / Neighborhood: ${data.area}
- State: ${data.state}

Preferred Day: ${data.preferredDay}
Preferred Time: ${data.preferredTime}

Notes / Dietary Needs:
${data.notes}
    `
  };

  try {
    await resend.emails.send({
  from: "Tha 10.29 <orders@tha1029.com>",
  to: "iteyonb@gmail.com",
  subject: "New Meal Prep Submission",
  text: mailOptions.text
});

    console.log("Meal prep email sent successfully.");
    res.json({ success: true });
  } catch (err) {
    console.error("Meal prep email error:", err);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Tha 10.29 running on port ${PORT}`);
});