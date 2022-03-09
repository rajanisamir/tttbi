import React from "react";

function Map() {
  var world2 =
    global.assignmentScore >= 25 ? "map-square2" : "map-square2-lock";
  var world3 =
    global.assignmentScore >= 75 ? "map-square3" : "map-square3-lock";
  return (
    <div>
      <h1>Map</h1>
      <div className="map-view">
        <div className="map-square1">This area is unlocked by default.</div>
        <div className={world2}>
          You need an assignment score of 25 to unlock this area.
        </div>
        <div className={world3}>
          You need an assignment score of 75 to unlock this area.
        </div>
      </div>
    </div>
  );
}

export default Map;
