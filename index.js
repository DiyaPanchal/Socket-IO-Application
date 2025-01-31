import express from "express";
import "dotenv/config";
import { createServer } from "http";

const app = express();
const PORT  = process.env.PORT || 3002;
const server = createServer(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

