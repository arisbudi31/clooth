import React, { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {
    Table,
    Thead,
    Th,
    Tr,
    Td,
    Tbody,
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Flex,
    IconButton,
    Text,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from "react-redux";

import Header from "../../component/Header";
import Loading from "../../component/subcomponent/Loading";
import { LOADING_START, LOADING_END } from "../../redux/actions/types";
import LineChart from "../../component/subcomponent/Charts";
import {lineChartData, lineChartOptions} from "../../variables/charts"


const API_URL = process.env.REACT_APP_API_URL

export default function Reports() {
    const [topThree, setTopThree] = useState('')
    const [reports, setReports] = useState ({
        totalCustomer: '',
        totalOrder : '',
        totalSoldProduct : '',
        totalRevenue : '',
        totalCost : '',
        totalProfit : ''
    })
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.loading)
    const token = localStorage.getItem("tokenAdmin")
   
    function format(n, sep) {    
        return n.toLocaleString().split(sep)[0]
    }
    

    const showTable = () => {
        // return topThree.map((top, idx)=> {
        //     return (
        //        <Tr key={idx}
        //             fontSize={"sm"}    
        //         >
        //            <Td textAlign={"center"}></Td>
        //            <Td textAlign={"center"}></Td>
        //            <Td textAlign={"center"}></Td>
        //        </Tr>
        //     )   
        // })
    }

    useEffect(() => {
        dispatch({ type: LOADING_START })
        axios.get(API_URL + `/admin/${token}/get-total-reports`)
        .then((resp) => {
            dispatch({ type: LOADING_END })
            setReports({
                totalCustomer: resp.data.data[0].totalCustomer,
                totalOrder : resp.data.data[0].totalOrder,
                totalSoldProduct : resp.data.data[0].totalSoldProduct,
                totalRevenue : format(resp.data.data[0].totalRevenue),
                totalCost : format(resp.data.data[0].totalCost),
                totalProfit : format(resp.data.data[0].totalProfit)
            })
        })
        .catch((err) => {
            dispatch({ type: LOADING_END })
        })

        axios.get(API_URL + `/admin/${token}/get-top-3`)
        .then((resp) => {
            dispatch({ type: LOADING_END })
            setTopThree(resp.data.data)
        })
        .catch((err) => {
            dispatch({ type: LOADING_END })
        })
    }, [])
    
    
    
    return(
        <>
          <Header />
          <Loading state={{ loading }} />
          <Box bgColor={"ButtonShadow"}>
              <div className="app-wrapper">
                  <div className="app-content pt-3 p-md-3 p-lg-4">
                      <div className="container-xl">
                  <text className="pagetitle h1">Reports</text>
                        
                        <div className="row g-4 mb-4 mt-0">

                            <div className="col-6 col-lg-4">
                                <div className="app-card app-card-stat shadow-sm h-100">
                                    <div className="app-card-body p-3 p-lg-4">
                                        <h4 className="stats-type mb-1">Total Customer</h4>
                                        <div className="stats-figure">{reports.totalCustomer}</div>
                                        {/* <div className="stats-meta text-success">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                            </svg> 5% 
                                        </div> */}
                                    </div>
                                    {/* <!--//app-card-body--> */}
                                </div>
                                {/* <!--//app-card--> */}
                            </div>
                            {/* <!--//col--> */}

                            <div className="col-6 col-lg-4">
                                <div className="app-card app-card-stat shadow-sm h-100">
                                    <div className="app-card-body p-3 p-lg-4">
                                        <h4 className="stats-type mb-1">Total Order</h4>
                                        <div className="stats-figure">{reports.totalOrder}</div>
                                    </div>
                                    {/* <!--//app-card-body--> */}
                                </div>
                                {/* <!--//app-card--> */}
                            </div>
                            {/* <!--//col--> */}

                            <div className="col-6 col-lg-4">
                                <div className="app-card app-card-stat shadow-sm h-100">
                                    <div className="app-card-body p-3 p-lg-4">
                                        <h4 className="stats-type mb-1">Total Sold Product</h4>
                                        <div className="stats-figure">{reports.totalSoldProduct}</div>
                                    </div>
                                    {/* <!--//app-card-body--> */}
                                </div>
                                {/* <!--//app-card--> */}
                            </div>
                            {/* <!--//col--> */}

                        </div>
                        {/* <!--//row--> */}
                        <div className="row g-4 mb-4">

                            <div className="col-6 col-lg-4 ">
                                <div className="app-card app-card-stat shadow-sm h-100">
                                    <div className="app-card-body p-3 p-lg-4">
                                        <h4 className="stats-type mb-1">Total Revenue</h4>
                                        <div className="stats-figure">Rp{reports.totalRevenue}</div>
                                        {/* <div className="stats-meta text-success">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                        </svg> 20%
                                        </div> */}
                                    </div>
                                    {/* <!--//app-card-body--> */}
                                </div>
                                {/* <!--//app-card--> */}
                            </div>
                            {/* <!--//col--> */}

                            <div className="col-6 col-lg-4 ">
                                <div className="app-card app-card-stat shadow-sm h-100">
                                    <div className="app-card-body p-3 p-lg-4">
                                        <h4 className="stats-type mb-1">Total Cost</h4>
                                        <div className="stats-figure">Rp{reports.totalCost}</div>
                                        {/* <div className="stats-meta text-success">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                        </svg> 20%
                                        </div> */}
                                    </div>
                                    {/* <!--//app-card-body--> */}
                                </div>
                                {/* <!--//app-card--> */}
                            </div>
                            {/* <!--//col--> */}

                            <div className="col-6 col-lg-4 ">
                                <div className="app-card app-card-stat shadow-sm h-100">
                                    <div className="app-card-body p-3 p-lg-4">
                                        <h4 className="stats-type mb-1">Total Profit</h4>
                                        <div className="stats-figure">Rp{reports.totalProfit}</div>
                                        {/* <div className="stats-meta text-success">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                        </svg> 20%
                                        </div> */}
                                    </div>
                                    {/* <!--//app-card-body--> */}
                                </div>
                                {/* <!--//app-card--> */}
                            </div>
                            {/* <!--//col--> */}

                        </div>
                        {/* <!--//row--> */}

                          <div className="row g-4 mb-4">
                              <div className="col-12 col-lg-12">
                                  <div className="app-card app-card-chart h-100 shadow-sm">
                                      <div className="app-card-header p-3">
                                          <div className="row justify-content-between align-items-center">
                                              <div className="col-auto">
                                                  <h4 className="app-card-title">Total Revenue Reports By</h4>
                                            </div>
                                            <div className="col-auto">
                                              <div className="mb-1 d-flex">   
                                                <select className="form-select form-select-sm ms-auto d-inline-flex w-auto">
                                                  <option value="weeks" >Week</option>
                                                  <option value="month">Month</option>
                                                </select>
                                              </div>
                                              {/* <!--//card-header-actions--> */}
                                            </div>
                                              {/* <!--//col--> */}
                                          </div>
                                          {/* <!--//row--> */}
                                      </div>
                                      {/* <!--//app-card-header--> */}
                                      <div className="app-card-body p-3 p-lg-4">
                                        <div className="chart-container">
                                        <Box minH='350px'>
                                            <LineChart
                                                chartData={lineChartData}
                                                chartOptions={lineChartOptions}
                                            />
                                        </Box>
                                          {/* <canvas id="chart-line"></canvas> */}
                                        </div>
                                      </div>
                                      {/* <!--//app-card-body--> */}
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
          <Box
                px={"260px"}
                py={"20px"}
                boxSizing={"border-box"}
                position={"inherit"}
                bgColor={"ButtonShadow"}
            >Top 3 Product Most Sold
                <Table
                    variant={"simple"}
                    size={"sm"}
                    w={"40vw"}
                >
                    <Thead borderBottom={"2px double black"}>
                        <Tr bg="blue.500">
                            <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Product Id</Th>
                            <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Image</Th>
                            <Th textAlign={"center"} fontSize={"sm"} color={"white"}>Price</Th>
                        </Tr>
                    </Thead>
                    <Tbody fontFamily={"cursive"} fontWeight={"hairline"}>
                        {showTable()}
                    </Tbody>
                </Table>
            </Box>
        </>
        
    )
}

