import React from "react"
import ExploreArea from "./component/ExploreArea"
import Footer from "./component/Footer"
import Header from "./component/Header"
import MainBanner from "./component/MainBanner"
import SectionArea from "./component/SectionArea"
import SubscribeArea from "./component/SubscribeArea"

function Home() {
  return (
    <>
      <Header />
      <MainBanner />
      <ExploreArea />
      <SectionArea />
      <SubscribeArea />
      <Footer />
    </>
  )
}

export default Home