import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Box } from '@chakra-ui/react'
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios"
import Header from "../../component/Header";
import Loading from "../../component/subcomponent/Loading";
import { LOADING_END } from "../../redux/actions/types";

const apiUrl = process.env.REACT_APP_API_URL

export default function HomeAdmin() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const role = localStorage.getItem("akses")
    const token = localStorage.getItem("tokenAdmin")
    const keepLogin = localStorage.getItem("keepLogin")
    const {loading} = useSelector(state => state.loading)


  useEffect(() => {
    Axios.get(`${apiUrl}/all-category`)
      .then(response => {
        dispatch({ type: LOADING_END })
        const data = response.data.data
        dispatch({ type: 'GET_CATHEGORY', payload: data })
      })
      .catch(err => {
        dispatch({ type: LOADING_END })
        console.log(err)
      })
  }, [])

  if (keepLogin === 'false') {
    setTimeout(() => navigate('/admin/login'), 10000)
    setTimeout(() => localStorage.removeItem("tokenAdmin"), 10000)
    dispatch({ type: LOADING_END })
  }
  else if (token === null) {
    setTimeout(() => navigate('/admin/login'), 5000)
    return (
      <Box ml="100px" mt="50px" fontSize={"6xl"} fontWeight="extrabold">
        <h1>You have to Log In first.</h1>
      </Box>
    )
  }

  if (role !== 'BearerAdmin' || role === null) {
    return (navigate('/user/login'))
  }

  return (
    <>
      <Header />
      <Loading state={{ loading }} />
      <Box bgColor={"ButtonShadow"}>
        <div className="app-wrapper">
          <div className="app-content pt-3 p-md-3 p-lg-4">
            <div className="container-xl">
              <text className="pagetitle h1">Dashboard</text>
              <div className="row g-4 mb-4">
                <div className="col-6 col-lg-3">
                  <div className="app-card app-card-stat shadow-sm h-100">
                    <div className="app-card-body p-3 p-lg-4">
                      <h4 className="stats-type mb-1">Total Sales</h4>
                      <div className="stats-figure">Rp26.628.000</div>
                      {/* <div className="stats-meta text-success">
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                            </svg> 20%
                                            </div> */}
                    </div>
                    {/* <!--//app-card-body--> */}
                    <a className="app-card-link-mask" href="#"></a>
                  </div>
                  {/* <!--//app-card--> */}
                </div>
                {/* <!--//col--> */}

                <div className="col-6 col-lg-3">
                  <div className="app-card app-card-stat shadow-sm h-100">
                    <div className="app-card-body p-3 p-lg-4">
                      <h4 className="stats-type mb-1">Total Order</h4>
                      <div className="stats-figure">2.107</div>
                      {/* <div className="stats-meta text-success">
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                                </svg> 5% 
                                            </div> */}
                    </div>
                    {/* <!--//app-card-body--> */}
                    <a className="app-card-link-mask" href="#"></a>
                  </div>
                  {/* <!--//app-card--> */}
                </div>
                {/* <!--//col--> */}

                <div className="col-6 col-lg-3">
                  <div className="app-card app-card-stat shadow-sm h-100">
                    <div className="app-card-body p-3 p-lg-4">
                      <h4 className="stats-type mb-1">Total Customer</h4>
                      <div className="stats-figure">536</div>
                    </div>
                    {/* <!--//app-card-body--> */}
                    <a className="app-card-link-mask" href="#"></a>
                  </div>
                  {/* <!--//app-card--> */}
                </div>
                {/* <!--//col--> */}

                <div className="col-6 col-lg-3">
                  <div className="app-card app-card-stat shadow-sm h-100">
                    <div className="app-card-body p-3 p-lg-4">
                      <h4 className="stats-type mb-1">Invoices</h4>
                      <div className="stats-figure">6</div>
                      <div className="stats-meta">New</div>
                    </div>
                    {/* <!--//app-card-body--> */}
                    <a className="app-card-link-mask" href="#"></a>
                  </div>
                  {/* <!--//app-card--> */}
                </div>
                {/* <!--//col--> */}

              </div>
              {/* <!--//row--> */}

              <div className="row g-4 mb-4">

                <div className="col-12 col-lg-6">
                  <div className="app-card app-card-chart h-100 shadow-sm">

                                        <div className="app-card-header p-3">
                                            <div className="row justify-content-between align-items-center">
                                                <div className="col-auto">
                                                    <h4 className="app-card-title">Line Chart Example</h4>
                                                </div>
                                                {/* <!--//col--> */}
                                                <div className="col-auto">
                                                    <div className="card-header-action">
                                                        <a href="charts.html">More charts</a>
                                                    </div>
                                                    {/* <!--//card-header-actions--> */}
                                                </div>
                                                {/* <!--//col--> */}
                                            </div>
                                            {/* <!--//row--> */}
                                        </div>
                                        {/* <!--//app-card-header--> */}
                                        <div className="app-card-body p-3 p-lg-4">
                                            <div className="mb-3 d-flex">   
                                                <select className="form-select form-select-sm ms-auto d-inline-flex w-auto">
                                                    <option value="1" selected>This week</option>
                                                    <option value="2">Today</option>
                                                    <option value="3">This Month</option>
                                                    <option value="3">This Year</option>
                                                </select>
                                            </div>
                                            <div className="chart-container">
                                                <canvas id="chart-line" ></canvas>
                                            </div>
                                        </div>
                                        {/* <!--//app-card-body--> */}
                                    </div>
                                    {/* <!--//app-card--> */}
                                </div>
                                {/* <!--//col--> */}

                <div className="col-12 col-lg-6">
                  <div className="app-card app-card-chart h-100 shadow-sm">

                    <div className="app-card-header p-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <h4 className="app-card-title">Bar Chart Example</h4>
                        </div>
                        {/* <!--//col--> */}
                        <div className="col-auto">
                          <div className="card-header-action">
                            <a href="charts.html">More charts</a>
                          </div>
                          {/* <!--//card-header-actions--> */}
                        </div>
                        {/* <!--//col--> */}
                      </div>
                      {/* <!--//row--> */}
                    </div>
                    {/* <!--//app-card-header--> */}


                                        <div className="app-card-body p-3 p-lg-4">
                                            <div className="mb-3 d-flex">   
                                                <select className="form-select form-select-sm ms-auto d-inline-flex w-auto">
                                                    <option value="1" selected>This week</option>
                                                    <option value="2">Today</option>
                                                    <option value="3">This Month</option>
                                                    <option value="3">This Year</option>
                                                </select>
                                            </div>
                                            <div className="chart-container">
                                                <canvas id="chart-bar" ></canvas>
                                            </div>
                                        </div>
                                        {/* <!--//app-card-body--> */}
                                    </div>
                                    {/* <!--//app-card--> */}
                                </div>
                                {/* <!--//col--> */}
                            </div>
                            {/* <!--//row--> */}


              <div className="row g-4 mb-4">
                <div className="col-12 col-lg-6">
                  <div className="app-card app-card-progress-list h-100 shadow-sm">

                    <div className="app-card-header p-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <h4 className="app-card-title">Progress</h4>
                        </div>
                        {/* <!--//col--> */}
                        <div className="col-auto">
                          <div className="card-header-action">
                            <a href="#">All projects</a>
                          </div>
                          {/* <!--//card-header-actions--> */}
                        </div>
                        {/* <!--//col--> */}
                      </div>
                      {/* <!--//row--> */}
                    </div>
                    {/* <!--//app-card-header--> */}



                  </div>
                  {/* <!--//app-card--> */}
                </div>
                {/* <!--//col--> */}
                <div className="col-12 col-lg-6">
                  <div className="app-card app-card-stats-table h-100 shadow-sm">
                    <div className="app-card-header p-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <h4 className="app-card-title">Stats List</h4>
                        </div>
                        {/* <!--//col--> */}
                        <div className="col-auto">
                          <div className="card-header-action">
                            <a href="#">View report</a>
                          </div>
                          {/* <!--//card-header-actions--> */}
                        </div>
                        {/* <!--//col--> */}
                      </div>
                      {/* <!--//row--> */}
                    </div>
                    {/* <!--//app-card-header--> */}

                    <div className="app-card-body p-3 p-lg-4">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <thead>
                            <tr>
                              <th className="meta">Source</th>
                              <th className="meta stat-cell">Views</th>
                              <th className="meta stat-cell">Today</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><a href="#">google.com</a></td>
                              <td className="stat-cell">110</td>
                              <td className="stat-cell">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                                </svg>
                                30%
                              </td>
                            </tr>
                            <tr>
                              <td><a href="#">getbootstrap.com</a></td>
                              <td className="stat-cell">67</td>
                              <td className="stat-cell">23%</td>
                            </tr>
                            <tr>
                              <td><a href="#">w3schools.com</a></td>
                              <td className="stat-cell">56</td>
                              <td className="stat-cell">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                                </svg>
                                20%
                              </td>
                            </tr>
                            <tr>
                              <td><a href="#">javascript.com </a></td>
                              <td className="stat-cell">24</td>
                              <td className="stat-cell">-</td>
                            </tr>
                            <tr>
                              <td><a href="#">github.com </a></td>
                              <td className="stat-cell">17</td>
                              <td className="stat-cell">15%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* <!--//table-responsive--> */}
                    </div>
                    {/* <!--//app-card-body-->*/}

                  </div>
                  {/* <!--//app-card--> */}
                </div>
                {/* <!--//col--> */}

              </div>
              {/* <!--//row--> */}

            </div>
            {/* <!--//container-fluid--> */}
          </div>
          {/* <!--//app-content--> */}
        </div>
        {/* <!--//app-wrapper--> */}
      </Box>
    </>
  )
}