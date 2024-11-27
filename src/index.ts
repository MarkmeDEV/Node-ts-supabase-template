import express from "express";
// import UserRouter from "./routes/users/Users";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth/Authentication";
import dotenv from "dotenv"

const app = express();
dotenv.config();

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}))


app.use('/auth', authRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`)
})