const express = require('express');
const app = express();
const dotenv=require("dotenv")
dotenv.config()
const port = process.env.PORT;
app.use(express.json());
const dbConnect=require("./db/dbConnect")
dbConnect()
const productRouter= require("./routes/products")
const authRouter=require("./routes/user")
const cors = require('cors');
const roleRouter=require("./routes/role")

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow your React frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));


app.use("/products",productRouter)


app.use("/",authRouter)


app.use("/role",roleRouter)

// Start the server
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
