import React from "react"
import { AiFillHeart } from "react-icons/ai";

function Footer() {
  return (
    <footer className="app-footer" style={{ backgroundColor: "white" }}>
      <div className="container text-center py-3">
        {/* <!--/* This template is free as long as you keep the footer attribution link. If you'd like to use the template without the attribution link, you can buy the commercial license via our website: themes.3rdwavemedia.com Thank you for your support. :) */}
        <small className="copyright">Designed with <span><AiFillHeart color="red" style={{ display: "inline" }} /></span> by <a className="app-link" href="http://themes.3rdwavemedia.com"
          target="_blank">Xiaoying Riley</a> for developers</small>
      </div>
    </footer>
  )
}

export default Footer