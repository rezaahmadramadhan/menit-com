import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Button from "./Button"
import Swal from "sweetalert2"
import axios from "axios"

export default function Form(props) {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [content, setContent] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [categories, setCategories] = useState([])
    

    const { onSubmit, mode, defaultValue } = props

    useEffect(() => {
        if (defaultValue) {
            setTitle(defaultValue.title || '')
            setContent(defaultValue.content || '')
            setImgUrl(defaultValue.imgUrl || '')
            setCategoryId(defaultValue.categoryId || '')
        }
    }, [defaultValue])

    async function fetchCategories() {
        try {
            const response = await axios({
                method: 'GET',
                url: `https://gc01.dhronz.space/categories`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            setCategories(response.data)
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
        fetchCategories()
    }, [])
    
    return (
        <form 
            className="grid gap-6 max-w-xl mx-auto"
            onSubmit={async (event) => {
                event.preventDefault()
                const dataForm = {
                    title,
                    categoryId, 
                    content,
                    imgUrl
                }
                onSubmit(dataForm)
            }}
        >
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-lg font-medium">Title</span>
                </label>
                <input 
                    className="input input-bordered input-lg focus:input-primary w-full" 
                    placeholder="Input your title here"
                    type="text" 
                    value={title}
                    onChange={(event) => {
                        const newTitle = event.target.value
                        setTitle(newTitle)
                    }}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text text-lg font-medium">Category Name</span>
                </label>
                <select 
                    className="select select-neutral w-full"
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                >
                    <option disabled value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text text-lg font-medium">Content</span>
                </label>
                <textarea 
                    className="textarea textarea-bordered min-h-[250px] focus:textarea-primary w-full" 
                    placeholder="Input your content here"
                    value={content}
                    onChange={(event) => {
                        const newContent = event.target.value
                        setContent(newContent)
                    }}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text text-lg font-medium">Image URL</span>
                </label>
                <input 
                    className="input input-bordered focus:input-primary w-full" 
                    placeholder="Input your image url here"
                    type="text" 
                    value={imgUrl}
                    onChange={(event) => {
                        const newImgUrl = event.target.value
                        setImgUrl(newImgUrl)
                    }}
                />
                <div className="mt-4">
                    <figure className="h-[200px] rounded-lg overflow-hidden bg-base-200">
                        <img 
                            src={imgUrl || 'https://placehold.co/600x400'} 
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    </figure>
                </div>
            </div>

            <div className="divider"></div>

            <div className="flex flex-col gap-3">
                <Button
                    title={mode}
                    type="submit"
                />

                <Button
                    title="Cancel"
                    variant="btn btn-soft"
                    onClick={() => navigate('/')}
                />
            </div>
        </form>
    )
}