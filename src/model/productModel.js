"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Schema.Types.ObjectId;
const productSchema = new mongoose_1.default.Schema({
    productName: String,
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: Number,
    quantity: {
        type: Number,
        default: 0
    }
});
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
