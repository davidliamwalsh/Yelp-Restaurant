require("dotenv").config()
const cors = require('cors')
const express = require('express')
const db = require('./db')
const morgan = require("morgan")
const app = express()

app.use(cors())
app.use(express.json())

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("select * from restaurants")
    console.log(results)
    res.json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows
      }
    })
  } catch (err) {
    console.log(err)
  }
})

// Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("select * from restaurants where id = $1", [req.params.id])
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0]
      }
    })
  } catch (err) {
    console.log(err)
  }
})

// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range])
    console.log(results)
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0]
      }
    })
  } catch (err) {
    console.log(err)
  }
})

// Update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id])
    res.status(200).json({ 
      status: "success",
      data: {
        restaurant: results.rows[0]
      }
    })
  } catch (err) {
    console.log(err)
  }
})

// Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id])
    res.status(204).json({
      status: "success"
    })
  } catch (err) {
    console.log(err)
  }
})

const port = process.env.PORT || 3002

app.listen(port, () => {
  console.log(`server is up and running on port:${port}`)
})