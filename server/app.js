import express from "express";
import blogRouter from "./routes/blogRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use('/image', express.static(path.join(process.cwd(), "storage")));

app.use("/users", userRouter);
app.use("/blog", blogRouter);

app.listen(3000, () => {
    console.log("server started on port 3000");
});
