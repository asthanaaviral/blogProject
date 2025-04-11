import { useState } from "react";

function UploadBlog() {
    const [formData, setFormData] = useState({
        blogTitle: "",
        blogContent: "",
        blogCategory: "",
    });
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No file selected");
    const [isSuccess, setIsSuccess] = useState(false);
    const IP = import.meta.env.VITE_IP_ADDRESS;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("blogTitle", formData.blogTitle);
        data.append("blogCategory", formData.blogCategory);
        data.append("blogContent", formData.blogContent);
        if (file) {
            data.append("file", file);
        }

        try {
            const response = await fetch(`http://${IP}:3000/blog`, {
                method: "POST",
                body: data,
            });
            const result = await response.json();
            if (response.status == 200) setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
            }, 2000);
        } catch (err) {
            console.log(err.message);
        }

        setFormData({
            blogTitle: "",
            blogContent: "",
            blogCategory: "",
        });
        setFileName("No file selected");
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(e.target.files[0]);
        setFileName(file ? file.name : "No file selected");
    };

    return (
        <div className="h-full w-full flex justify-center">
            <form
                className="flex flex-col px-10 py-10 gap-6 w-1/2"
                onSubmit={handleSubmit}
            >
                <h1 className="mx-auto font-bold text-2xl text-zinc-800 mb-6">
                    Upload a Blog
                </h1>

                <div className="flex flex-col gap-2">
                    <label htmlFor="blogTitle" className="font-semibold">
                        Title
                    </label>
                    <input
                        type="text"
                        value={formData.blogTitle}
                        onChange={handleChange}
                        name="blogTitle"
                        placeholder="Enter title of the blog"
                        required
                        className="border-2 border-zinc-500 px-2 py-2 rounded-md"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="blogContent" className="font-semibold">
                        Content
                    </label>
                    <textarea
                        name="blogContent"
                        value={formData.blogContent}
                        onChange={handleChange}
                        required
                        className="border-2 h-28 border-zinc-500 p-2 rounded-md"
                    />
                </div>

                <div className="flex gap-4">
                    <label htmlFor="blogCategory" className="font-semibold">
                        Category
                    </label>
                    <select
                        value={formData.blogCategory}
                        onChange={handleChange}
                        required
                        name="blogCategory"
                        className="border-2 border-zinc-500 rounded-md w-40"
                    >
                        <option value="" disabled>
                            Select a category
                        </option>
                        <option value="fashion">Fashion</option>
                        <option value="education">Education</option>
                        <option value="finance">Finance</option>
                        <option value="technology">Technology</option>
                        <option value="sports">Sports</option>
                        <option value="lifestyle">LifeStyle</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition w-fit">
                        📁 Choose Media
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                    <span className="text-sm text-gray-600">{fileName}</span>
                </div>

                <button
                    type="submit"
                    className="bg-amber-300 hover:bg-amber-400 cursor-pointer w-1/4 py-2 rounded-xl font-semibold text-zinc-700 mx-auto"
                >
                    Upload
                </button>
                {isSuccess && (
                    <div className="px-4 py-2 bg-green-100 border border-green-400 text-green-700 rounded">
                        ✅ Blog uploaded successfully!
                    </div>
                )}
            </form>
        </div>
    );
}

export default UploadBlog;
