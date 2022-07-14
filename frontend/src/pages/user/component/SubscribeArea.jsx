import React from "react";

function SubscribeArea() {
  return (
    <div className="subscribe">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="section-heading">
              <h2>By Subscribing To Our Newsletter You Can Get 10% Off</h2>
              <span>Details to details is what makes Cloothshop different from the other e-commerce.</span>
            </div>
            <form id="subscribe" action="" method="get">
              <div className="row">
                <div className="col-lg-5">
                  <fieldset>
                    <input name="name" type="text" id="name" placeholder="Your Name" required="" />
                  </fieldset>
                </div>
                <div className="col-lg-5">
                  <fieldset>
                    <input name="email" type="text" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your Email Address" required="" />
                  </fieldset>
                </div>
                <div className="col-lg-2">
                  <fieldset>
                    <button type="submit" id="form-submit" className="main-dark-button"><i className="fa fa-paper-plane"></i></button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4">
            <div className="row">
              <div className="col-6">
                <ul>
                  <li>Store Location:<br /><span>Bandung, West Java, Indonesia</span></li>
                  <li>Phone:<br /><span>010-020-0340</span></li>
                  <li>Office Location:<br /><span>Jl Soekarno-Hatta No. 15, Kota Bandung</span></li>
                </ul>
              </div>
              <div className="col-6">
                <ul>
                  <li>Work Hours:<br /><span>07:30 AM - 9:30 PM Daily</span></li>
                  <li>Email:<br /><span>info@clooth.com</span></li>
                  <li>Social Media:<br /><span><a href="#">Facebook</a>, <a href="#">Instagram</a>, <a href="#">Behance</a>, <a href="#">Linkedin</a></span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscribeArea