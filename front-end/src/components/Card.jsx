import React from "react";
import "./Card.css";

function Card({ text, name, title }) {
  return (
    <div className="card-tl">
      <div className="mirror-effect">
        <div className="card-content">
          <h1>{title}</h1>
          <h2>~{name}</h2>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
