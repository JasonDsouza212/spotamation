import React from "react";
import spotdraftlogo from "../images/spotdraftlogo.png";
import zoro from "../images/zoro.jpeg";
import { RiArrowDropDownLine } from "react-icons/ri";

const navbar = () => {
  return (
    <>
      <div>
        <div className="navbar">
          <div className="company_details">
            <img className="company_logo" src={spotdraftlogo} alt="" />
            <span>SpotDraft Automation</span>
          </div>
          <div className="user_details">
            <span>
              <img src={zoro} alt="" className="user_profile_img" />
            </span>
            <span className="dropdown">
              <RiArrowDropDownLine style={{ height: "30px", width: "20px" }} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default navbar;
