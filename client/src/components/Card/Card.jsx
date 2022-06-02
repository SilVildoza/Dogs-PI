import React from "react";
import "./Card.css";

export default function Card({ name, image, temperament, weight }) {
  if (!temperament) {
    temperament = "None";
  }

  return (
    <>
      <div className="flip-card-container">
        <div className="flip-card">
          <div className="card-front">
            <figure>
              <div className="img-bg"></div>
              <img src={image} alt="img not found" />
              <figcaption>{name}</figcaption>
            </figure>
            <ul>
              <li>{temperament}</li>
              <li>{weight} kg</li>
            </ul>
          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
              <img src={image} alt="img not found" />
            </figure>
            <button>See More</button>

            <div className="design-container">
              <span className="design design--1"></span>
              <span className="design design--2"></span>
              <span className="design design--3"></span>
              <span className="design design--4"></span>
              <span className="design design--5"></span>
              <span className="design design--6"></span>
              <span className="design design--7"></span>
              <span className="design design--8"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
