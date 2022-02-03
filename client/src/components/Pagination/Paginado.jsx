import React from "react";
import PaginadoCSS from "./Paginado.module.css"

export default function Paginado ({DogsOnPage, allDogs, paginado}) {
    const pageNumbers = []

    for(let i = 0; i<=Math.ceil(allDogs/DogsOnPage); i++) {
        pageNumbers.push(i+1)
    }


    return(
        <div className={PaginadoCSS.container}>
            <ul className="pagination">
            {pageNumbers?.map(n =>(        
                <li className={PaginadoCSS.li} onClick={() => paginado(n)} key={n}>
                    <button className={PaginadoCSS.btn} >{n}</button>
                </li>
                    
            ))}
            </ul>    
        </div>
    )
}