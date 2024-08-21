require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const ProductRouter = require('./routes/productRoutes');
const fileUpload = require('express-fileupload')
const cors = require('cors');
const bodyParser = require('body-parser')
// database
const connectDB = require('./db/connect');


const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static('./public/uploads'));
app.use(express.urlencoded({extended:true}));
app.use(express.json())
// app.use(fileupload({useTempFiles: true}))
app.use(fileUpload({ useTempFiles: true }))
// app.use(fileUpload())


app.get('/', (req, res) => {
  res.send('<h1>Shaheen Wheels~ See you in a month!</h1>');
});

// middleware

app.use('/api/v1/products', ProductRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
