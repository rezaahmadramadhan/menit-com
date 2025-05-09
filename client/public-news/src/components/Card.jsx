import { useNavigate } from "react-router"

export default function Card(props) {
    const {article, fetchArticles} = props
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/pub/articles/${article.id}`);
    };

    return (
        <div className="card bg-base-100 w-full h-[32rem] shadow-xl group hover:shadow-2xl transition-shadow duration-300 cursor-pointer" onClick={handleClick}>
            <figure className="relative h-48">
                <div className="absolute top-3 left-3 z-10">
                    <div className="badge badge-primary">NEW</div>
                </div>
                
                <div className="w-full h-full overflow-hidden">
                    <img
                        src={article.imgUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </figure>

            <div className="card-body h-[calc(32rem-12rem)] flex flex-col">
                <div className="card-actions justify-start">
                    <div className="badge badge-outline badge-primary">{article.Category.name}</div>
                </div>

                <div className="group/title mt-2">
                    <h2 onClick={handleClick} className="card-title line-clamp-2 hover:text-primary transition-colors duration-200 min-h-[3rem]">
                        {article.title}
                        <svg xmlns="http://www.w3.org/2000/svg" 
                             className="h-5 w-5 opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-300" 
                             fill="none" 
                             viewBox="0 0 24 24" 
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </h2>
                </div>

                <p className="line-clamp-3 flex-1 mt-2">
                    {article.content}
                </p>

                <div className="card-actions justify-between items-center pt-4 border-t mt-auto">
                    <div className="flex items-center gap-2 group/author hover:text-primary transition-colors duration-200">
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-8 group-hover/author:bg-primary transition-colors duration-200">
                                <img src={article.User.authorImg} alt="" />
                            </div>
                        </div>
                        <span className="text-sm flex items-center gap-1">
                            {article.User.username}
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                 className="h-4 w-4 opacity-0 -translate-x-2 group-hover/author:opacity-100 group-hover/author:translate-x-0 transition-all duration-300" 
                                 fill="none" 
                                 viewBox="0 0 24 24" 
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}