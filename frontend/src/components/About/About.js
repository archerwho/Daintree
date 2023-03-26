import React from "react";
import "./About.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Avatar, Button, Typography } from "@mui/material";
import Facebook from "@mui/icons-material/Facebook";

const About = () => {
  const visitInstagram = () => {
    window.location = "#";
  };
  return (
    <div className="aboutSection">
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/ds3gqhhfw/image/upload/v1679071332/avatars/yakhvku1xaxwjlq14ypm.jpg"
              alt="Developer"
            />
            <Typography>Shubham Gupta</Typography>
            <Button onClick={visitInstagram}>Visit Instagram</Button>
            <span>
              This is a sample wesbite made by @archer.who. as a portfolio
              project.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <div>
              <div className="face">
                <Facebook />
              </div>
              <div className="insta">
                <InstagramIcon />
              </div>
              <div className="you">
                <YouTubeIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
