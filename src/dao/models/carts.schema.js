import mongoose from "mongoose";

const CartsSchema = new mongoose.Schema({
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
})

export default mongoose.model('carts', CartsSchema);
