import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Swal from "sweetalert2"
import FormUpload from "../components/FormUpload"

export default function UploadImage() {
    const [image, setImage] = useState("")
    const [article, setArticle] = useState("")
    const { id } = useParams()

    async function fetchImage() {
        try {
        const response = await axios({
            method: 'GET',
            url: `https://gc01.dhronz.space/articles/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            
        setArticle(response.data)
        setImage(response.data.imgUrl)
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
        fetchImage()
    }, [])
    return (
        <div className="card-body">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Upload Image
                </h2>
                <div className="badge badge-primary badge-outline mt-2">Title #{article.title}</div>
                <p className="text-base-content/60 mt-2">Update your image below:</p>
                <FormUpload fetchImage={fetchImage} id={id} image={image}/>
            </div>
        </div>
    )
}