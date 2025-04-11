import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const IP = import.meta.env.VITE_IP_ADDRESS;
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        async function getBlogs() {
            const response = await fetch(`http://${IP}:3000/blog`);
            const data = await response.json();
            setBlogData(data);
        }
        getBlogs();
    }, []);

    if (!blogData) {
        return (
            <>
                <div>Loading blogs...</div>
            </>
        );
    }

    return (
        <>
            <div className="w-full max-w-6xl mx-auto mt-12 px-4 flex flex-col gap-8">
                {blogData.map((blog) => {
                    const hasImage = blog.imageId && blog.imageExt;
                    const imageUrl = hasImage
                        ? `http://${IP}:3000/image/${blog.imageId}${blog.imageExt}`
                        : `http://${IP}:3000/image/image.png`;

                    return (
                        <div
                            key={blog.blogId}
                            className="flex flex-col md:flex-row gap-6 bg-white text-black rounded-3xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 duration-300 overflow-hidden cursor-pointer border border-gray-100"
                        >
                            <img
                                src={imageUrl}
                                alt={blog.blogTitle}
                                className="w-full md:w-60 h-60 object-cover bg-gray-100"
                            />

                            <div className="flex flex-col justify-between p-6 flex-1">
                                <div>
                                    <h2 className="text-2xl font-bold mb-3 text-gray-900 hover:text-blue-600 transition-colors">
                                        {blog.blogTitle}
                                    </h2>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
                                            {blog.blogCategory}
                                        </span>
                                        <span className="text-gray-400">
                                            {blog.uploadDate}
                                        </span>
                                    </div>

                                    <p className="text-gray-700 text-base leading-relaxed line-clamp-3">
                                        {blog.blogContent.slice(0, 200)}...
                                    </p>
                                </div>

                                <div className="mt-6 text-right">
                                    <Link
                                        to={`/blog/${blog.blogId}`}
                                        className="text-blue-500 hover:underline cursor-pointer text-sm font-medium"
                                    >
                                        Read more →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Home;
