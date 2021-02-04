require("dotenv").config()
const express = require("express")
const db = require('./db')
const morgan = require("morgan")
const app = express()

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
app.post("/api/v1/restaurants", (req, res) => {
  console.log(req.body)

  res.status(201).json({
    status: "success",
    data: {
      restaurant: "subway"
    }
  })
})

// Update a restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id)
  console.log(req.body)

  res.status(200).json({
    status: "success",
    data: {
      restaurant: "subway"
    }
  })
})

// Delete a restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
  res.status(204).json({
    status: "success"
  })
})

const port = process.env.PORT || 3002

app.listen(port, () => {
  console.log(`server is up and running on port:${port}`)
})