import { useNavigate } from "react-router"
import Button from "../components/Button"
import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"


export default function AddUser() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [authorImg, setAuthorImg] = useState('')
    
    return(
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content flex flex-col">
                <div className="p-6">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Add User
                                </h2>
                                <p className="text-base-content/60 mt-2">Create User to be a writer</p>
                            </div>
                            
                            <form 
                                className="grid gap-6 max-w-xl mx-auto"
                                onSubmit={async (event) => {
                                    try {        
                                        event.preventDefault()
                                        await axios({
                                            method: 'POST',
                                            url: 'https://gc01.dhronz.space/add-user',
                                            data: {username, email, password, address, authorImg},
                                            headers: {
                                            Authorization:
                                                "Bearer " + localStorage.getItem("access_token"),
                                            }
                                        })
                                        
                                        Swal.fire({
                                            title: 'Success!',
                                            text: "Create user success!!",
                                            icon: 'success',
                                            confirmButtonText: 'OK'
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
                                }}
                            >
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-medium">User Name</span>
                                    </label>
                                    <input 
                                        className="input input-bordered input-lg focus:input-primary w-full" 
                                        placeholder="Input your username here"
                                        type="text" 
                                        onChange={(event) => {
                                            const newUsername = event.target.value
                                            setUsername(newUsername)
                                        }}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-medium">Email</span>
                                    </label>
                                    <input 
                                        className="input input-bordered input-lg focus:input-primary w-full" 
                                        placeholder="Input your email here"
                                        type="text" 
                                        onChange={(event) => {
                                            const newEmail = event.target.value
                                            setEmail(newEmail)
                                        }}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-medium">Password</span>
                                    </label>
                                    <input 
                                        className="input input-bordered input-lg focus:input-primary w-full" 
                                        placeholder="Input your password here"
                                        type="password" 
                                        onChange={(event) => {
                                            const newPassword = event.target.value
                                            setPassword(newPassword)
                                        }}
                                    />
                                </div>
                    
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-medium">Address</span>
                                    </label>
                                    <textarea 
                                        className="textarea textarea-bordered min-h-[50px] focus:textarea-primary w-full" 
                                        placeholder="Input your address here"
                                        onChange={(event) => {
                                            const newAddress = event.target.value
                                            setAddress(newAddress)
                                        }}
                                    />
                                </div>
                    
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-medium">Profile Image</span>
                                    </label>
                                    <input 
                                        className="input input-bordered focus:input-primary w-full" 
                                        placeholder="Input your profile image url here"
                                        type="text" 
                                        onChange={(event) => {
                                            const newAuthorImg = event.target.value
                                            setAuthorImg(newAuthorImg)
                                        }}
                                    />
                                    <div className="mt-4">
                                        <figure className="h-[200px] rounded-lg overflow-hidden bg-base-200">
                                            <img 
                                                src={authorImg || 'https://placehold.co/600x400'} 
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </figure>
                                    </div>
                                </div>
                    
                                <div className="divider"></div>
                    
                                <div className="flex flex-col gap-3">
                                    <Button
                                        title="Create User"
                                        type="submit"
                                    />
                    
                                    <Button
                                        title="Cancel"
                                        variant="btn btn-soft"
                                        onClick={() => navigate('/')}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}