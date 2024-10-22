import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import tesseract from 'tesseract.js';
import connectDB from './src/db.js';
import authRoutes from './src/routes/auth.routes.js';

const app = express();
const upload = multer({ dest: 'uploads/' });

// MongoDB Atlas bağlantısını başlat
connectDB();
// Middleware
app.use(cors());
app.use(express.json());

// Kullanıcı giriş ve kayıt rotaları
app.use('/api/auth', authRoutes);

// CORS yapılandırması
app.use(cors());
app.options('*', cors());

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/analyze-screenshot', upload.single('file'), async (req, res) => {
  const { mode } = req.body; // Mod bilgisini alıyoruz
  console.log('Received Mode:', mode); // Mod bilgisini konsola yazdırıyoruz

  try {
    const inputFile = req.file.path;

    // OCR işlemi
    const { data: { text } } = await tesseract.recognize(inputFile, 'eng');
    console.log('Extracted Text:', text);

    // Prompt moduna göre içerik oluşturuyoruz
    const prompt =
      mode === 'fun'
        ? `Bu WhatsApp konuşmasını, sanki ilişki tavsiyesi veren bir komedyenmişsiniz gibi, alaycı ve alaycı bir dil kullanarak mizahi bir şekilde analiz edin:\n\n${text}`
        : `Bu WhatsApp konuşmasını analiz edin ve düşünceli ve yapıcı ilişki tavsiyeleri verin:\n\n${text}`;

    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': '3bed43c0c9msh97bb63d9e642ad4p13abd6jsn1cc92e23cade',
        'x-rapidapi-host': 'chat-gpt26.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    };

    const response = await fetch('https://chat-gpt26.p.rapidapi.com/', options);
    const result = await response.json();

    console.log('AI Analysis Result:', result);
    res.json({ analysis: JSON.stringify(result) });

    fs.unlinkSync(inputFile); // Geçici dosyayı siliyoruz
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process the file' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
