import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#062b2b", color: "#fff" }}>
      
      <div className="container py-5">
        <div className="row g-4">

          {/* Logo & Socials */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="d-flex align-items-center mb-3">
              <div
                style={{
                  backgroundColor: "#000",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f5a623",
                  fontWeight: "bold",
                  fontSize: "20px"
                }}
              >
                🛒
              </div>
              <span className="ms-2 fw-bold">SuK</span>
            </div>

            <div className="d-flex gap-3 mt-3">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>

          {/* Our Services */}
          <div className="col-6 col-md-6 col-lg-2">
            <h6 className="fw-bold mb-3">Our Services</h6>
            <p className="mb-1 small">Delivery Information</p>
            <p className="mb-1 small">Goods & Services</p>
            <p className="mb-1 small">Shopping & Refund</p>
            <p className="mb-1 small">All Products e.g Home Appliances & more.</p>
          </div>

          {/* Account */}
          <div className="col-6 col-md-6 col-lg-2">
            <h6 className="fw-bold mb-3">Account</h6>
            <p className="mb-1 small">My Account</p>
            <p className="mb-1 small">Login / Register</p>
            <p className="mb-1 small">Cart</p>
            <p className="mb-1 small">Wishlist</p>
            <p className="mb-1 small">Shop</p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-6 col-lg-2">
            <h6 className="fw-bold mb-3">Quick Link</h6>
            <p className="mb-1 small">Privacy Policy</p>
            <p className="mb-1 small">Terms Of Use</p>
            <p className="mb-1 small">FAQ</p>
            <p className="mb-1 small">Contact</p>
          </div>

          <div className="d-flex gap-2 flex-wrap">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                style={{ width: "120px" }}
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                style={{ width: "120px" }}
              />
            </div>

          {/* Subscribe */}
          <div className="col-12 col-md-6 col-lg-3">
            <h6 className="fw-bold mb-3">Subscribe</h6>
            <p className="small">To Our Newsletter daily</p>

            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
              <button
                className="btn"
                style={{ backgroundColor: "#f5a623", color: "#000" }}
              >
                <FaPaperPlane />
              </button>
            </div>

            
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="text-center py-2"
        style={{ backgroundColor: "#f5a623", color: "#000", fontSize: "14px" }}
      >
        © Copyright Aoi Tech 2026. All right reserved
      </div>
    </footer>
  );
};

export default Footer;