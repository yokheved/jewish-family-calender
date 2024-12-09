import mongoose from "mongoose";
import { User, prishaEnum } from "./create";

mongoose.connect('mongodb://127.0.0.1:27017/TAHARA-CALENDER', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');
    const users = await User.find();
    console.log(users);
    db.close();
    });