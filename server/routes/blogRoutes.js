import express from "express"
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { writeFile } from "fs/promises";
import blogsData from "../blogsData.json" with {type: "json"};
import dotenv from "dotenv"

const router = express.Router();
dotenv.config();

const IP = process.env.IP_ADDRESS;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./storage");
    },
    filename: (req, file, cb) => {
        const imageId = crypto.randomUUID();
        const imageExt = path.extname(file.originalname)
        const filename = `${imageId}${imageExt}`
        req.body.imageExt = imageExt;
        req.body.imageId = imageId;
        cb(null, filename); 
    },
});

const upload = multer({ storage });

router.get("/:id", (req, res) => {
    const id = req.params.id
    const blog = blogsData.find(blog => blog.blogId === id);
    if(!blog) {
        return res.status(404).json({message: "blog not found"})
    }
    
    const blogWithImage = {
        ...blog,
        imageUrl: `http://${IP}:3000/image/${blog.imageId}${blog.imageExt}`
    }

    res.json(blogWithImage)
})

router.get('/', (req, res) => {
    const latestBlogs = blogsData.sort((a,b) => b.uploadDate.localeCompare(a.uploadDate)).slice(0,10)
    res.json(latestBlogs)
})

router.post("/", upload.single("file"), async (req, res) => {
    const id = crypto.randomUUID();
    const now = new Date();
    const uploadDate = now.toISOString().split('T')[0];

    blogsData.push(
        {
            blogId:id,
            blogTitle: req.body.blogTitle,
            blogContent: req.body.blogContent,
            blogCategory: req.body.blogCategory,
            imageId: req.body.imageId,
            imageExt: req.body.imageExt,
            uploadDate: uploadDate
        }
    )

    try{
        await writeFile("./blogsData.json", JSON.stringify(blogsData));
        res.status(200).json({message: "Blog uploaded successfully!"})
    } catch(err) {
        res.status(400).json({message: err.message})
    }

})

export default router;