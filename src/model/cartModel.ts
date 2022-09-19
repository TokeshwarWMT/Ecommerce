import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

interface iCart {
    userId: mongoose.Types.ObjectId
    productId: [mongoose.Types.ObjectId]
    total: number
}

const cartSchema = new mongoose.Schema<iCart>({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    productId: {
        type: [ObjectId],
        ref: 'Product'
    },
    total: Number
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
