import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import { ChatGroq } from '@langchain/groq';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  const { input } = req.body;

 
  if (!input?.topic || !input?.tone || !input?.audience) {
    return res.status(400).json({ error: 'Missing required fields in input' });
  }

  try {
    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: 'llama3-8b-8192',
      temperature: 0.7,
    });

    
    const prompt = `Write content on the topic "${input.topic}" with the tone "${input.tone}". 
    Write it as plain text without any markdown formatting or special characters like asterisks (**) or underscores (_). 
    Make it engaging and informative for a ${input.audience} audience.`;

    // Call Groq API to generate content
    const response = await model.invoke(prompt);


    res.json({ content: response.content });
  } catch (error) {
    console.error('❌ Error calling Groq API:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
