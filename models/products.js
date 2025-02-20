const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, default: "null" },
  },
  {
    timestamps: true,
  }
);

// productSchema.pre("save",async(next)=>{
//   this.id=generateSomehting()
//   next()
// });


// Create Product Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;



