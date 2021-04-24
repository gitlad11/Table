import React from 'react';

const Paginator = ({ colsPerPage, totalCols, pagenate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCols / colsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
  	<div className="col" span={12}>
  	<nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li style={{ height : "40px", fontSize : "20px" }} key={number} className='page-item'>
            <a onClick={() => pagenate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  	</div>

  );
}
export default Paginator;