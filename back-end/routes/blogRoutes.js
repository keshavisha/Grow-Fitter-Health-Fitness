import express, { response } from 'express';
import natural from 'natural';
import fs from 'fs';
import Blog from '../schemas/blogschema.js';
import Grievance from '../schemas/grievances.js';
import * as dotenv from  'dotenv';
import axios from "axios"
dotenv.config()
const router = express.Router();
const tokenizer = new natural.WordTokenizer();
const classifier = new natural.BayesClassifier();
// Load the training data from a local CSV file
fs.readFile('./data.csv', 'utf8', (err, data) => {
  if (err) throw err;
  // Preprocess the data
  const processedData = data.split('\n').map((line) => {
    const [text, label] = line.split(',');
    const tokens = tokenizer.tokenize(text.toLowerCase());
    return { tokens, label };
  });
  
  // Train the classifier with the preprocessed data
  processedData.forEach(({ tokens, label }) => {
    classifier.addDocument(tokens, label);
  });
  
  // Finish training the classifier
  classifier.train();
  console.log('Classifier trained successfully');
});

router.post('/blogs', async (req, res) => {
  try {
    const { user, title, text } = req.body;
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const time = new Date();
    let adminverified = 0;
    let modelverified = 0;

    const prediction = classifier.classify(`${title.toLowerCase()}`);
    if (prediction === '1') {
      modelverified = 1;
    }
  

    if (adminverified === 1 || modelverified === 1) {
      const blog = new Blog({ id, user, title, text, time, adminverified, modelverified });
      await blog.save();
      res.status(201).json({ success: true });
    } else {
      res.status(416).json({ success: false, error: `Blog post does not meet verification requirements` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/12-latest-posts', async (_, res) => {
    try {
      const blogs = await Blog.find({}, 'title text user').sort({ time: 'desc' }).limit(12);
      res.status(200).json({ success: true, data: blogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  router.get('/5-latest-user/:username', async (req, res) => {
    try {
      const { username } = req.params;
      const blogs = await Blog.find({ user: username }, 'title text user').sort({ time: 'desc' }).limit(5);
      res.status(200).json({ success: true, data: blogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  router.post('/diet-planner',async (req, res) => {
    const { targetCalories, diet } = req.body;
  
    try {
      const response = await axios.get('https://api.spoonacular.com/mealplanner/generate', {
        params: {
          apiKey:process.env.SPO_API,
          targetCalories:targetCalories,
          diet:diet,
          timeFrame:"day"
        }
      });
  
      res.status(200).json({data:response.data,params:req.body});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  })

  router.post('/grievances',async(req,res)=>{
    try{
      const {name,email,grievance}=req.body;
      const gr=new Grievance({name,email,grievance})
      await gr.save();
      res.status(201).json({sucess:true})
    }catch(error){
    res.status(401).json({success:false});
    }
  })
export default router;
