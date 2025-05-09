import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import Form from "../components/Form"
import Swal from "sweetalert2"

export default function Edit(){
    const { id } = useParams()
    const [article, setArticle] = useState([])
    const navigate = useNavigate()

    async function fetchArticle(id) {
        try {
            const response = await axios({
                method: 'GET',
                url: `https://gc01.dhronz.space/articles/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            
            setArticle(response.data)
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
    }, [])
    
    return (
        <div className="bg-base-100 rounded-xl shadow-xl p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Edit Article
                </h2>
                <p className="text-base-content/60 mt-2">Make changes to your article</p>
                <div className="badge badge-primary badge-outline mt-2">Article #{article.id}</div>
            </div>
            <Form 
                defaultValue={article}
                mode="Save Changes"
                onSubmit={async (dataForm) => {
                    try {
                        await axios({
                            method: "PUT",
                            url: `https://gc01.dhronz.space/articles/${id}`,
                            data: dataForm,
                            headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("access_token"),
                            }
                        })

                        console.log("ubah");
                        
                        navigate('/')
                    } catch (error) {
                        Swal.fire({
                            title: 'Error!',
                            text: error.response.data.message,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                    }
                }}
            /> 
        </div>
    )
}