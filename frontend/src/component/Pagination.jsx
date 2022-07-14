import React from "react"
import ReactPaginate from "react-paginate";

function Pagination(props) {

  return (

    <nav className="app-pagination mt-5">
      <ReactPaginate
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
        previousLabel={"previous"}
        nextLabel={"Next"}
        breakLabel={".."}
        pageCount={props.state.totalPage}
        marginPagesDisplayed={3}
        pageRangeDisplayed={5}
        onPageChange={props.state.onHandlePageClick}
      />
    </nav>
  )
}

export default Pagination