import React from 'react';


const Pagination = ({ count, clickPage }) => {

  const nb_pages = Math.ceil(count / 3); //divisé par la limit
  
  const fillArray = () => {
    const arr = [];
    for (let i = 1; i <= nb_pages; i++) arr.push(i);
    return arr;
  }


  return (
    <div className="pagination">
      {fillArray().map((nb) => {
        return (
          <span key={nb}>
            <button className="pagination-button" onClick={() => clickPage(nb)}>{nb}</button>
          </span>
        )
      })}
    </div>
  );
}

export default Pagination;