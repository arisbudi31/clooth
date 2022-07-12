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
    // <nav className="app-pagination mt-5">
    //   <ul className="pagination justify-content-center">
    //     <li className="page-item disabled">
    //       <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
    //     </li>
    //     <li className="page-item active"><a className="page-link" href="#">1</a></li>
    //     <li className="page-item"><a className="page-link" href="#">2</a></li>
    //     <li className="page-item"><a className="page-link" href="#">3</a></li>
    //     <li className="page-item">
    //       <a className="page-link" href="#">Next</a>
    //     </li>
    //   </ul>
    // </nav>
  )
}

export default Pagination