const { onRequest } = require("firebase-functions/v2/https")
const express = require("express")
const cors = require("cors")
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SK)

// App config
const app = express()

// middleware
app.use(cors({ origin: true }))
app.use(express.json())

// API routes
app.get("/", (req, res) => res.status(200).send("Server is running!"))

app.post("/payments/create", async (req, res) => {
  const total = req.query.total

  console.log("Payment request received!!! ", total)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseFloat(total), // subunits of the currency
    currency: "inr",
  })

  // OK - created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
})

// Listen command
exports.api = onRequest(app)
