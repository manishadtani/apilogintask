import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = 8001;

// ✅ CORS setup
app.use(cors({
  origin: ['http://localhost:5173', 'https://apilogintask.vercel.app'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// ✅ These are enough
app.use(morgan('dev'));
app.use(express.json());

// ✅ Sample login route
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'pthgtm611919@gmail.com' && password === '1234@Abcd') {
    return res.json({message: 'Login successful', token: 'abc123', refresh: 'xyz789'});
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

app.listen(PORT, () => {
  console.log('Server running on port ', PORT);
});