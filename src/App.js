import React, { useState } from "react";
import "./App.css";
import TaskManager from "./components/TaskManager";
import Profile from "./components/Profile";
import Map from "./components/Map";

function App() {
  const [profile, p_visible] = useState(false);
  const [assignments, a_visible] = useState(false);
  const [map, m_visible] = useState(false);

  return (
    <div className="main-view">
      <button className="button" onClick={() => p_visible(!profile)}>
        profile
      </button>
      <button className="button" onClick={() => a_visible(!assignments)}>
        assignments
      </button>
      <button className="button" onClick={() => m_visible(!map)}>
        map
      </button>
      {assignments && (
        <div className="task-manager-tab">
          <TaskManager />
        </div>
      )}
      {profile && (
        <div className="profile-tab">
          <Profile />
        </div>
      )}
      {map && (
        <div className="map-tab">
          <Map />
        </div>
      )}
    </div>
  );
}

export default App;
