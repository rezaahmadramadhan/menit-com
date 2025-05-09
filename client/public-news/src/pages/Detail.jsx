import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

export default function Detail() {
    const { id } = useParams()
    const [article, setArticle] = useState([])
    const navigate = useNavigate()
    console.log(useState([]), "state");

    async function fetchArticle(id) {
        try {
          const response = await axios({
            method: "GET",
            url: `https://gc01.dhronz.space/pub/articles/${id}`
          });

          setArticle(response.data[0])
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    useEffect(() => {
        fetchArticle(id)
    }, [id]);

    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => {
                navigate(`/pub/articles`)
            }} className="btn btn-ghost mb-4">
                ← Back to Home
            </button>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
                
                {/* Author Info */}
                {article.User && (
                    <div className="flex items-center gap-3 mb-6">
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img src={article.User.authorImg} alt={article.User.username} />
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">{article.User.username}</p>
                            <p className="text-sm text-gray-500">Author · {article.Category.name}</p>
                        </div>
                    </div>
                )}

                {/* Featured Image */}
                <div className="w-full h-[400px] rounded-xl overflow-hidden mb-8">
                    <img 
                        src={article.imgUrl} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Article Content */}
                <div className="prose max-w-none">
                    <p className="text-lg">{article.content}</p>
                </div>
            </div>
        </div>
    );
}