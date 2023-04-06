import * as dotenv from  'dotenv';
import express, { json } from 'express';
import connectDB from './mongo.js';
import cors from 'cors';
import blogRoutes from './routes/blogRoutes.js'
dotenv.config()
const app = express();
const uri=process.env.MONGO_URI


// Set up middleware
connectDB(uri)
app.use(cors());
app.use(json());
app.use('/api',blogRoutes)
// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
