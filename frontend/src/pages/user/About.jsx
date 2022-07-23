import React from "react";
import Footer from "./component/Footer";
import Header from "./component/Header";

function About() {
  return (
    <>
      <Header />
      <div className="page-heading about-page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>About Our Company</h2>
                <span>Awesome, clean &amp; trusted e-commerce shop</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="left-image">
                <img src="/assets_user/images/about-left-image.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-content">
                <h4>About Us &amp; Our Skills</h4>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod kon tempor incididunt ut labore.</span>
                <div className="quote">
                  <i className="fa fa-quote-left"></i><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuski smod kon tempor incididunt ut labore.</p>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod kon tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="our-team">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>Our Amazing Team</h2>
                <span>Details to details is what makes Cloothshop different from the other themes.</span>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="team-item">
                <div className="thumb">
                  <img src="/assets_user/images/aris.jpg" />
                </div>
                <div className="down-content">
                  <h4>Aris Budiyanto</h4>
                  <span>Junior Developer 1</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="team-item">
                <div className="thumb">
                  <img src="/assets_user/images/team-member-02.jpg" />
                </div>
                <div className="down-content">
                  <h4>Ragnar Lodbrok</h4>
                  <span>Product Caretaker</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="team-item">
                <div className="thumb">
                  <img src="/assets_user/images/team-member-03.jpg" />
                </div>
                <div className="down-content">
                  <h4>Ragnar Lodbrok</h4>
                  <span>Product Caretaker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default About