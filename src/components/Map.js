import React from "react";

function Map({ score }) {
  return (
    <div>
      <h1>Map</h1>
      <div className="map-view">
        <div className="map-square1">This area is unlocked by default.</div>
        <div className={score >= 25 ? "map-square2" : "map-square2-lock"}>
          {score >= 25
            ? "You have unlocked this area by reaching an assignment score of 25!"
            : "You need an assignment score of 25 to unlock this area."}
        </div>
        <div className={score >= 75 ? "map-square3" : "map-square3-lock"}>
          {score >= 75
            ? "You have unlocked this area by reaching an assignment score of 75!"
            : "You need an assignment score of 75 to unlock this area."}
        </div>
      </div>
    </div>
  );
}

export default Map;
