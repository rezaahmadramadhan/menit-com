import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function Categories(params) {
    const [categories, setCategories] = useState([])

    async function fetchCategories() {
        try {
            const response = await axios({
                method: 'GET',
                url: 'https://gc01.dhronz.space/categories',
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

    return(
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content flex flex-col p-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => {
                            return (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}