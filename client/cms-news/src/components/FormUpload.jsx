import axios from "axios"
import { useState } from "react"
import Button from "./Button"
import { useNavigate } from "react-router"
import Swal from "sweetalert2"

export default function FormUpload(props) {
    const [file, setFile] = useState("")

    const {fetchImage, id, image} = props
    const navigate = useNavigate()

    const handleUpload = async (event) => {
        try {
            event.preventDefault()

            const formData = new FormData()
            formData.set("imgUrl", file)

            await axios({
                method: 'PATCH',
                url: `https://gc01.dhronz.space/articles/${id}/img-url`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            navigate('/')
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

        fetchImage()
    }
    
    return(
        <form 
            className="grid gap-6 max-w-xl mx-auto"
            onSubmit={handleUpload}
        >
            <div className="mt-4">
                <figure className="h-[200px] rounded-lg overflow-hidden bg-base-200">
                    <img 
                        src={image || 'https://placehold.co/600x400'} 
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                </figure>
            </div>

            <input 
            className="btn btn-soft"
            onChange={(e) => setFile(e.target.files[0])}
            defaultValue={""}
            type="file" />
            <Button type="submit" title="Upload Image" variant="btn btn-neutral"/>
            <Button
                title="Cancel"
                variant="btn btn-soft"
                onClick={() => navigate('/')}
            />
        </form>
        
    )
}