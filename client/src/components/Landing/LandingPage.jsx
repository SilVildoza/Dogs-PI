import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="bigbox">
      <div className="bgImg">
        <h1 className="titulo">
          Find your next
          <br />
          Best Friend
          <br />
          today!
        </h1>
        <Link to="/home">
          <button className="entrar">ENTER</button>
        </Link>
      </div>
    </div>
  );
}
