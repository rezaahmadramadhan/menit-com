import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import axios from "axios"
import Navbar from "../components/Navbar"
import Card from "../components/Card"
import Button from "../components/Button"

export default function Home() {
    const [articles, setArticles] = useState([])
    const [categories, setCategories] = useState([])
    const [filter, setFilter] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('')
    const [totalData, setTotalData] = useState(0)

    useEffect(() => {
        fetchArticles();
    }, [search, filter, sort]);

    async function fetchArticles(page = 1) {
        try {
            const response = await axios({
                method: 'GET',
                url: 'https://gc01.dhronz.space/pub/articles',
                params: {
                    filter,
                    search,
                    sort,
                    page
                }
            });

            setPage(response.data.page)
            setTotalData(response.data.totalData)
            setArticles(response.data.data)
            setCategories(uniqueCategories)
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }
    }

    const handleSearch = (searchInput) => {
        setSearch(searchInput);
        setPage(1)
    };

    const handleFilterChange = (selectedCategory) => {
        setFilter(selectedCategory);
        setPage(1)
    };

    const handleSortChange = (sortOption) => {
        setSort(sortOption)
        setPage(1)
    };

    const maxPage = Math.ceil(totalData / 10)

    return (
        <>
            <Navbar 
                onSearch={handleSearch} 
                categories={categories}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
            />
            <div className="container mx-auto px-4">
                <div className="divider divider-primary my-8">Latest News</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {articles.map((article, index) => (
                        <div key={index} className="transform hover:-translate-y-2 transition-all duration-300">
                            <Card article={article} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <div className="join">
                        <Button 
                            condition={page === 1} 
                            title="«" 
                            variant="btn btn-soft" 
                            className="join-item btn" 
                            onClick={() => fetchArticles(page - 1)} 
                        />
                        <Button 
                            title={page} 
                            variant="btn btn-default" 
                            className="join-item btn" 
                        />
                        <Button 
                            condition={page === maxPage} 
                            title="»" 
                            variant="btn btn-soft" 
                            className="join-item btn" 
                            onClick={() => fetchArticles(page + 1)} 
                        />
                    </div>
                </div>
            </div>
        </>
    );
}