import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema({
    authorId: {
        type: ObjectId,
        ref: 'User'
    },
    productId: {
        type: ObjectId,
        ref: 'Product'
    },
    name: String,
    quantity: String
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
