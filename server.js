const express = require("express");
const app = express();

app.use(express.json());

app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Tha 10.29 running on port 3000");
});

const nodemailer = require("nodemailer");

app.post("/order", async (req, res) => {
    const { customerName, customerPhone, customerEmail, cart } = req.body;

    // Build message text
    let message = `
New Order from ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail || "N/A"}

Items:
${cart.map(i => `${i.name} - $${i.price} (${i.selections.join(", ")})`).join("\n")}

Total: $${cart.reduce((t, i) => t + i.price, 0).toFixed(2)}
    `;

    try {
        // Email transporter
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "iteyonb@gmail.com",
                pass: "vgrk vbfd qflz ygiz"
            }
        });

        // Send email
        await transporter.sendMail({
            from: "iteyonb@gmail.com",
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

app.post("/api/sowlbowl-preorder", (req, res) => {
    console.log("New preorder:", req.body);

    const { name, phone, orderDetails, pickupTime, pickupLocation } = req.body;

    if (!name || !phone || !orderDetails || !pickupTime || !pickupLocation) {
        return res.status(400).json({ message: "All fields are required." });
    }

    res.json({ message: "Pre-order submitted successfully." });
});
app.post("/mealprep-intake", async (req, res) => {
    const data = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "iteyonb@gmail.com",
            pass: "vgrk vbfd qflz ygiz"
        }
    });

    const mailOptions = {
        from: "iteyonb@gmail.com",
        to: "iteyonb@gmail.com",
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
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});
