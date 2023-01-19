import React from "react";
import playstore from "../../../images/google-play.png";
import applestore from "../../../images/apple-store.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="footer">
      <div className="leftfooter">
        {/* <h4>Download our Mobile App.</h4>
        <p>For both Android and IOS</p> */}
        <img src={playstore} alt="playstore" />
        <img src={applestore} alt="applestore" />
      </div>
      <div className="midfooter">
        <h1>
          Daintree<p>You&apos;ll find it here!</p>
        </h1>

        <p>copyright &copy; Archer Enterprises 2020 - {currentYear}</p>
      </div>
      <div className="rightfooter">
        <h4>Find us on</h4>
        <div>
          <div className="insta">
            <InstagramIcon />
          </div>
          <div className="face">
            <FacebookIcon />
          </div>
          <div className="you">
            <YouTubeIcon />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
