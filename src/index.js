"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const route_1 = __importDefault(require("./routes/route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', route_1.default);
try {
    mongoose_1.default.connect('mongodb+srv://Satyaveer1994:Satyaveer123@cluster0.pn1nk.mongodb.net/wmt');
    console.log('MongoDB connection successful..');
}
catch (error) {
    console.log(error);
}
;
// const port = 3000
app.listen(process.env.PORT, () => {
    console.log(`Express App is running on ${process.env.PORT}`);
});
