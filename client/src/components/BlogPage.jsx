import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const IP = import.meta.env.VITE_IP_ADDRESS;

    useEffect(() => {
        async function getData() {
            const response = await fetch(`http://${IP}:3000/blog/${id}`);
            const data = await response.json();
            setBlog(data);
        }

        getData();
    }, [id]);

    if (!blog) {
        return <div>Loading blog...</div>;
    }

    return (
        <>
            <div className="w-full px-4 py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
                <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/60 shadow-xl rounded-3xl p-10 space-y-8 animate-fade-in">
                    {/* Blog Title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center leading-tight tracking-tight">
                        {blog.blogTitle}
                    </h1>

                    {/* Category + Date */}
                    <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-medium text-gray-600">
                        <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full">
                            {blog.blogCategory}
                        </span>
                        <span className="text-gray-400">{blog.uploadDate}</span>
                    </div>

                    {/* Blog Image */}
                    <div className="w-full rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={
                                blog.imageUrl
                            }
                            alt={blog.blogTitle}
                            className="w-full h-[350px] object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Blog Content */}
                    <div className="prose prose-lg md:prose-xl max-w-none text-gray-800 leading-relaxed">
                        {blog.blogContent.split("\n").map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>

                    {/* Read More CTA (Optional) */}
                    <div className="text-right pt-4">
                        <button className="text-blue-600 hover:underline text-sm font-medium">
                            Share this blog →
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogPage;
