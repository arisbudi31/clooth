import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { } from "@chakra-ui/react"
import { BsFillEyeFill, BsFillPencilFill, BsFillTrash2Fill } from "react-icons/bs"

function Crud(props) {
  return (
    <ul className="dropdown-menu">
      <li>
        <RouterLink to={`/admin/detail-product/${props.state.id}`} className="dropdown-item">
          <div className="row">
            <div className="col-2">
              <BsFillEyeFill size={16} color={"blue"} />
            </div>
            <div className="col-6">
              View
            </div>
          </div>
        </RouterLink>
      </li>
      <li>
        <RouterLink to={`/admin/edit-product/${props.state.id}`} className="dropdown-item">
          <div className="row">
            <div className="col-2">
              <BsFillPencilFill size={16} color={"orange"} />
            </div>
            <div className="col-6">
              Edit
            </div>
          </div>
        </RouterLink>
      </li>
      <li><hr className="dropdown-divider" /></li>
      <li>
        <button className="dropdown-item" href="#" onClick={props.state.fnDelete}>
          <div className="row">
            <div className="col-2">
              <BsFillTrash2Fill size={16} color={"red"} />
            </div>
            <div className="col-6">
              Delete
            </div>
          </div>
        </button>
      </li>
    </ul>
  )
}

export default Crud