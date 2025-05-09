import Form from "../components/Form";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Add() {
    const navigate = useNavigate()

    return(
        <div className="bg-base-100 rounded-xl shadow-xl p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Add Article
                </h2>
                <p className="text-base-content/60 mt-2">Add your article to Menit.com</p>
            </div>
            <Form 
                mode="Post Article"
                
                onSubmit={ async (dataForm) => {
                    try {
                        const response = await axios({
                            method: "POST",
                            url: `https://gc01.dhronz.space/articles`,
                            data: dataForm,
                            headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("access_token"),
                            },
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
            />
        </div>
    )
}