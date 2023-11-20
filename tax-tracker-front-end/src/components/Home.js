import React from "react";
import MainPagePhoto from "../Images/Subject.png";
import "./Home.css"

const Home = () => (
  <div className="home-container">
    <h1>紀錄工作的開支，省點稅</h1>
    <p>
      No tax is good tax.
    </p>
    <img src={MainPagePhoto} alt=":)" />
  </div>
);

export default Home;
