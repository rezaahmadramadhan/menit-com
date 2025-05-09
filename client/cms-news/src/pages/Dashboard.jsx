import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Button from '../components/Button';

export default function Dashboard() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([])

    async function fetchArticles() {
        try {
            const response = await axios({
                method: 'GET',
                url: 'https://gc01.dhronz.space/articles',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
    
            setArticles(response.data)
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
        fetchArticles()
    }, [])

    const totalCategory = Math.max(...articles.map(article => article.categoryId))
    const totalUser = Math.max(...articles.map(article => article.authorId))

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Page content */}
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="stats shadow">
                            <div className="stat">
                                <div className="stat-title">Total Articles</div>
                                <div className="stat-value">{articles.length}</div>
                            </div>
                        </div>

                        <div className="stats shadow">
                            <div className="stat">
                                <div className="stat-title">Total Categories</div>
                                <div className="stat-value">{totalCategory}</div>
                            </div>
                        </div>

                        <div className="stats shadow">
                            <div className="stat">
                                <div className="stat-title">Total Authors</div>
                                <div className="stat-value">{totalUser}</div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Articles Table */}
                    <div className="overflow-x-auto mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Articles List</h2>
                        <button 
                            onClick={() => navigate('/articles/add')} 
                            className="btn btn-primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Article
                        </button>
                    </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Author</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map(article => {
                                    return (
                                        <tr key={article.id}>
                                            <td>{article.id}</td>
                                            <td>{article.title}</td>
                                            <td>{article.Category.name}</td>
                                            <td>{article.User.username}</td>
                                            <td>
                                                <Button 
                                                    title="Edit"
                                                    variant="btn btn-info btn-sm mr-2"
                                                    onClick={ () => navigate(`/articles/${article.id}/edit`) }
                                                />
                                                <Button 
                                                    title="Delete"
                                                    variant="btn btn-error btn-sm mr-2"
                                                    onClick={async () =>{
                                                        try {
                                                            await axios({
                                                                method: 'DELETE',
                                                                url: `https://gc01.dhronz.space/articles/${article.id}`,
                                                                headers: {
                                                                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                                                                }
                                                            })

                                                            Swal.fire({
                                                                title: 'Deleted!',
                                                                text: "Deleted Succesfully",
                                                                icon: 'success',
                                                                confirmButtonText: 'OK'
                                                            })
                                                        
                                                            fetchArticles()
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
                                                <Button 
                                                    title="Upload"
                                                    variant="btn btn-neutral btn-sm"
                                                    onClick={ () => navigate(`/articles/${article.id}/upload`) }
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> 
        </div>
    );
}