import mongoose from "mongoose";
import express from "express";

export const server = express();
server.use(express.json());
mongoose.connect('mongodb://localhost:27017/TAHARA-CALENDER',
    { useNewUrlParser: true, useUnifiedTopology: true });
const PORT = 3306;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});