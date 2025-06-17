import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Proxy login route
app.post("/api/auth/login", async (req, res) => {
  try {
    const response = await axios.post("http://82.112.234.104:8001/api/auth/login/", req.body);
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data || "Something went wrong",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
