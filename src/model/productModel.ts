import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema({
    productName: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: String
});

const Product = mongoose.model('Product', productSchema);
export default Product;