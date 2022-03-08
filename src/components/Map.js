import React from "react";

function Map() {

    var world2 = global.assignmentScore > 20 ? "map-square2" : "map-square2-lock";
    var world3 = global.assignmentScore > 50 ? "map-square3" : "map-square3-lock";
    return (
        <div>
          <h1>Map</h1>
          <div className="map-view">
            <div className="map-square1"></div>
            <div className={world2}>AssignmentScore {'>'} 20 <br></br>needed to unlock</div>
            <div className={world3}>AssignmentScore {'>'} 50 <br></br>needed to unlock</div>
          </div>
          
        </div>
      );
}

export default Map;
