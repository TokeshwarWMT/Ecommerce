import dotenv from 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/route'
const app = express();
app.use(express.json());
app.use('/', routes);

try {
    mongoose.connect('mongodb+srv://Satyaveer1994:Satyaveer123@cluster0.pn1nk.mongodb.net/wmt');
    console.log('MongoDB connection successful..')
} catch (error) {
    console.log(error)
};

const port = 3000
app.listen(port, () => {
    console.log(`Express App is running on ${port}`)
});