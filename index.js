import express from "express";
import "dotenv/config";

const app = express();
const PORT  = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

