import React from "react";
import "../components/Styles/Paginado.css"

export default function Paginado ({DogsOnPage, allDogs, paginado}) {
    const pageNumbers = []

    for(let i = 0; i<=Math.ceil(allDogs/DogsOnPage); i++) {
        pageNumbers.push(i+1)
    }


    return(
        <div className="pagination_container">
            <ul className="pagination">
            {pageNumbers?.map(n =>(        
                <li onClick={() => paginado(n)} key={n}>
                    <a>{n}</a>
                </li>
                    
            ))}
            </ul>    
        </div>
    )
}