import { useNavigate } from "react-router";
import { useState } from "react";

export default function Navbar({ onSearch, onFilterChange, onSortChange }) {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSort, setSelectedSort] = useState('');

    const categories = [
        "Technology",
        "Environment",
        "Health",
        "Business",
        "Science",
        "Sports",
        "Politics",
        "Entertainment",
        "Education",
        "Culture"
    ];

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
        onSearch(event.target.value);
    };

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        onFilterChange(category);
    };

    const handleSortChange = (event) => {
        const sort = event.target.value;
        setSelectedSort(sort);
        onSortChange(sort);
    };

    return (
        <div className="sticky top-0 z-50">
            <div className="navbar bg-base-100 shadow-md">
                {/* Logo */}
                <div className="navbar-start">
                    <a
                        className="btn btn-ghost normal-case text-2xl font-bold px-2 hover:bg-transparent"
                        onClick={() => navigate('/')}
                    >
                        <span className="bg-red-600 text-white px-2 py-1 rounded">M</span>
                        <span>ENIT.COM</span>
                    </a>
                </div>

                {/* Search and Filter */}
                <div className="navbar-end flex gap-4">
                    {/* Search Input */}
                    <div className="form-control w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="input input-bordered input-primary w-full"
                            value={searchInput}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* Filter by Category */}
                    <div className="form-control">
                        <select
                            className="select select-bordered select-primary"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Filter by Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={index +1}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort by Title */}
                    <div className="form-control">
                        <select
                            className="select select-bordered select-primary"
                            value={selectedSort}
                            onChange={handleSortChange}
                        >
                            <option value="">Sort by</option>
                            <option value="createdAt">oldest</option>
                            <option value="-createdAt">latest</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}