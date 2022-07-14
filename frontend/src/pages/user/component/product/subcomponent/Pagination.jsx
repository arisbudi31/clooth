import React from "react";
import ReactPaginate from "react-paginate";

function Pagination(props) {
  return (
    <div className="pagination">
      <ReactPaginate
        // containerClassName={"pagination justify-content-center"}
        // pageClassName={"page-item"}
        // pageLinkClassName={"page-link"}
        // previousClassName={"page-item"}
        // previousLinkClassName={"page-link"}
        // nextClassName={"page-item"}
        // nextLinkClassName={"page-link"}
        // breakClassName={"page-item"}
        // breakLinkClassName={"page-link"}
        activeClassName={"active"}
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={".."}
        pageCount={props.state.totalPage}
        marginPagesDisplayed={3}
        pageRangeDisplayed={5}
        onPageChange={props.state.onHandlePageClick}
      />
    </div>
  )
}

export default Pagination