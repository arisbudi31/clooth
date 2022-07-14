import React from "react";
import { Link } from "react-router-dom";

function ExploreArea() {
  return (
    <section className="section" id="explore">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="left-content">
              <h2>Explore Our Products</h2>
              <span>Berbagai macam jenis passion termurah dan terlengkap hanya ada disini.</span>
              <div className="quote">
                <i className="fa fa-quote-left"></i><p>Let's explore our products.</p>
              </div>
              <p>Terdapat banyak macam product yang kami sediakan, mulai dari baju, jaket hingga perlengkapan passion semua ada disini.</p>
              <p>Kami sediakan passion terlengkap sesuai dengan kebutuhan anda.</p>
              <div className="main-border-button">
                <Link to={"/products"}>Discover More</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="right-content">
              <div className="row">
                <div className="col-lg-6">
                  <div className="leather">
                    <h4>Leather Bags</h4>
                    <span>Latest Collection</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="first-image">
                    <img src="assets_user/images/explore-image-01.jpg" alt="" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="second-image">
                    <img src="assets_user/images/explore-image-02.jpg" alt="" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="types">
                    <h4>Different Types</h4>
                    <span>Over 304 Products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExploreArea