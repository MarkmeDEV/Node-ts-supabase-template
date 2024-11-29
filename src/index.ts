import express from "express";
// import UserRouter from "./routes/users/Users";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth/Authentication";
import dotenv from "dotenv"
import { setupSwagger } from "./swagger";
import todoRouter from "./routes/todo/Todo";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(morgan('combined'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}))


app.use('/auth', authRouter);

app.use('/api/v1/', todoRouter);

setupSwagger(app);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`)
})