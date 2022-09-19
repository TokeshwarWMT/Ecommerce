import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema({
    productName: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: Number,
    quantity: {
        type: Number,
        default: 0
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;