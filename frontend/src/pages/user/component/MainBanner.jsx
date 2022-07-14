import React from "react";
import { Link } from "react-router-dom";

function MainBanner() {
  return (
    <div className="main-banner" id="top">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div className="left-content">
              <div className="thumb">
                <div className="inner-content">
                  <h4>We Are Cloothshop</h4>
                  <span>Awesome, clean &amp; trusted e-commerce shop</span>
                  <div className="main-border-button">
                    <a href="#">Purchase Now!</a>
                  </div>
                </div>
                <img src="assets_user/images/left-banner-image.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="right-content">
              <div className="row">
                <div className="col-lg-6">
                  <div className="right-first-image">
                    <div className="thumb">
                      <div className="inner-content">
                        <h4>Women</h4>
                        <span>Best Clothes For Women</span>
                      </div>
                      <div className="hover-content">
                        <div className="inner">
                          <h4>Women</h4>
                          <p>Passion wanita yang anggun dan beraneka ragam.</p>
                          <div className="main-border-button">
                            <Link to={"/products"}>Discover More</Link>
                          </div>
                        </div>
                      </div>
                      <img src="assets_user/images/baner-right-image-01.jpg" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="right-first-image">
                    <div className="thumb">
                      <div className="inner-content">
                        <h4>Men</h4>
                        <span>Best Clothes For Men</span>
                      </div>
                      <div className="hover-content">
                        <div className="inner">
                          <h4>Men</h4>
                          <p>Passiona pria dengan desain kekinian bisa menambah ketampanan.</p>
                          <div className="main-border-button">
                            <Link to={"/products"}>Discover More</Link>
                          </div>
                        </div>
                      </div>
                      <img src="assets_user/images/baner-right-image-02.jpg" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="right-first-image">
                    <div className="thumb">
                      <div className="inner-content">
                        <h4>Kids</h4>
                        <span>Best Clothes For Kids</span>
                      </div>
                      <div className="hover-content">
                        <div className="inner">
                          <h4>Kids</h4>
                          <p>Cari berbagai macam kebutuhan anda disini.</p>
                          <div className="main-border-button">
                            <Link to={"/products"}>Discover More</Link>
                          </div>
                        </div>
                      </div>
                      <img src="assets_user/images/baner-right-image-03.jpg" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="right-first-image">
                    <div className="thumb">
                      <div className="inner-content">
                        <h4>Accessories</h4>
                        <span>Best Trend Accessories</span>
                      </div>
                      <div className="hover-content">
                        <div className="inner">
                          <h4>Accessories</h4>
                          <p>Temukan trend asesoris kekinian dengan harga bersaing.</p>
                          <div className="main-border-button">
                            <Link to={"/products"}>Discover More</Link>
                          </div>
                        </div>
                      </div>
                      <img src="assets_user/images/baner-right-image-04.jpg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainBanner