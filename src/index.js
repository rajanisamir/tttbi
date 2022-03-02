import "aframe";
import "aframe-particle-system-component";
import { Entity, Scene } from "aframe-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

class VRScene extends React.Component {
  toggleMeditation = (object, instructionText, startText, stopText) => () => {
    var scene = document.querySelector("#scene");
    var sphere = scene.querySelector(object);
    sphere.setAttribute("visible", !sphere.getAttribute("visible"));
    sphere.setAttribute(
      "animation",
      "property: scale; to: .5 .5 .5; dur: 4000; dir: alternate; loop: true;"
    );
    var meditationInstr = scene.querySelector(instructionText);
    meditationInstr.setAttribute(
      "visible",
      !meditationInstr.getAttribute("visible")
    );
    var startMed = scene.querySelector(startText);
    startMed.setAttribute("visible", !startMed.getAttribute("visible"));
    var stopMed = scene.querySelector(stopText);
    stopMed.setAttribute("visible", !stopMed.getAttribute("visible"));
  };

  handleWorlds = () => {
    var scene = document.querySelector("#scene");
    var world2 = scene.querySelector("#world2");
    if (global.assignmentScore > 10) {
      world2.setAttribute("visible", "true");
    }
  };

  render() {
    let tree_colors = [
      "#3F704D",
      "#3B7A57",
      "#00755E",
      "#9DC183",
      "#679267",
      "#3F704D",
      "#3B7A57",
      "#00755E",
      "#9DC183",
      "#679267",
    ];
    let cube_tree_colors = [
      "#A32CC4",
      "#7A4988",
      "#9e7bb5",
      "#311432",
      "#b5338a",
      "#8d4585",
      "#b47ede",
      "#81007f",
    ];
    return (
      <Scene id="scene" events={{ click: this.handleWorlds }}>
        <a-assets>
          <a-asset-item id="tree-o" src="models/tree2.obj"></a-asset-item>
          <a-asset-item id="tree-m" src="models/tree2.mtl"></a-asset-item>
        </a-assets>
        {/* environment */}
        <Entity
          primitive="a-light"
          id="dirlight"
          intensity="1.5"
          light="castShadow:true; type:directional"
          position="1 2 3"
        />
        <Entity primitive="a-sky" color="#7BC8A4" />
        <Entity id="world1" visible="true">
          <Entity
            primitive="a-plane"
            position="0 0 -4"
            rotation="-90 0 0"
            width="200"
            height="100"
            color="#A8E4A0"
            shadow="receive: true"
            material="shader:phong"
          />
          {/* populate with trees */}
          <Entity id="tree" position="2 0 -6">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="2"
              height="4"
              color={tree_colors[0]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="-5 0 -10">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="1"
              height="4"
              color={tree_colors[1]}
              position="0 4 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="-5 0 -5">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="3"
              height="5"
              color={tree_colors[2]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="-2 0 -30">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="2"
              height="4"
              color={tree_colors[3]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="3 0 -40">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="1"
              height="4"
              color={tree_colors[4]}
              position="0 3 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="-1 0 -38">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="2"
              height="2"
              color={tree_colors[5]}
              position="0 3 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="4 0 -8">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="1"
              height="6"
              color={tree_colors[4]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="15 0 -10">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="4.5"
              height="3"
              color={tree_colors[1]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="-5 0 -15">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="2"
              height="4"
              color={tree_colors[2]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="12 0 -30">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="2.5"
              height="3"
              color={tree_colors[3]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="30 0 -40">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="5"
              height="3"
              color={tree_colors[4]}
              position="0 3 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="5 0 -35">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="2"
              height="4"
              color={tree_colors[5]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>

          {/* meditation pond */}
          <Entity
            primitive="a-cylinder"
            id="pond"
            visible="true"
            position="1 0 -40"
            height="0.01"
            radius="5"
            color="#90D1C7"
            events={{
              click: this.toggleMeditation(
                "#sphere",
                "#meditate-instr",
                "#start-med",
                "#stop-med"
              ),
            }}
          >
            <Entity
              primitive="a-text"
              id="start-med"
              rotation="0 0 0"
              position="-3 .5 2"
              scale="1.5 1.5 1"
              value="Click to start meditation session"
            />
            <Entity
              primitive="a-text"
              id="stop-med"
              visible="false"
              rotation="0 0 0"
              position="-3 .5 2"
              scale="1.5 1.5 1"
              value="Click to end meditation session"
            />
            <Entity
              primitive="a-sphere"
              id="sphere"
              visible="false"
              position="0 3 0"
              radius="2"
              color="teal"
            />
            <Entity
              primitive="a-text"
              id="meditate-instr"
              visible="false"
              scale="2 2 1"
              value="Breathe In and Out with the Sphere"
              font="monoid"
              position="-4 7 0"
              color="teal"
            />
          </Entity>
        </Entity>
        <Entity id="world2" visible="false" position="0 0 -50">
          <Entity
            primitive="a-plane"
            position="0 0 -54"
            rotation="-90 0 0"
            width="200"
            height="100"
            color="lavender"
            shadow="receive: true"
            material="shader:phong"
          />
          {/* populate with trees */}
          <Entity id="tree" position="2 0 -6">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-box"
              depth="2"
              width="2"
              height="4"
              color={cube_tree_colors[0]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="-5 0 -10">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-box"
              depth="2"
              width="2"
              height="4"
              color={cube_tree_colors[1]}
              position="0 4 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="-5 0 -5">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-box"
              depth="2"
              width="2"
              height="5"
              color={cube_tree_colors[2]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="-2 0 -30">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-box"
              depth="2"
              width="2"
              height="4"
              color={cube_tree_colors[3]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="3 0 -40">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-box"
              depth="2"
              width="2"
              height="4"
              color={cube_tree_colors[4]}
              position="0 3 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="-1 0 -38">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-box"
              depth="2"
              width="2"
              height="2"
              color={cube_tree_colors[5]}
              position="0 3 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="4 0 -8">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-box"
              depth="2"
              width="2"
              height="6"
              color={cube_tree_colors[4]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="15 0 -10">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-box"
              depth="2"
              width="2"
              height="3"
              color={cube_tree_colors[1]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="-5 0 -15">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-box"
              depth="2"
              width="2"
              height="4"
              color={cube_tree_colors[2]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="12 0 -30">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-box"
              depth="2"
              width="2"
              height="3"
              color={cube_tree_colors[3]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="30 0 -40">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-box"
              depth="2"
              width="2"
              height="3"
              color={cube_tree_colors[4]}
              position="0 3 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="5 0 -35">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="2.6"
              color="#754"
              position="0 2 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-box"
              depth="2"
              width="2"
              height="4"
              color={cube_tree_colors[5]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>

          {/* meditation garden */}
          <Entity
            primitive="a-box"
            id="garden"
            visible="true"
            position="1 0 -40"
            height="0.01"
            depth="5"
            width="10"
            color="magenta"
            events={{
              click: this.toggleMeditation(
                "#sphere2",
                "#meditate-instr2",
                "#start-med2",
                "#stop-med2"
              ),
            }}
          >
            <Entity
              primitive="a-text"
              id="start-med2"
              rotation="0 0 0"
              position="-3 .5 2"
              scale="1.5 1.5 1"
              value="Click to start meditation session"
            />
            <Entity
              primitive="a-text"
              id="stop-med2"
              visible="false"
              rotation="0 0 0"
              position="-3 .5 2"
              scale="1.5 1.5 1"
              value="Click to end meditation session"
            />
            <Entity
              primitive="a-sphere"
              id="sphere2"
              visible="false"
              position="0 3 0"
              radius="2"
              color="purple"
            />
            <Entity
              primitive="a-text"
              id="meditate-instr2"
              visible="false"
              scale="2 2 1"
              value="Breathe In and Out with the Sphere"
              font="monoid"
              position="-4 7 0"
              color="purple"
            />
          </Entity>
        </Entity>
        {/* camera rig + cursor */}
        <Entity
          primitive="a-camera"
          id="rig"
          position="0 3 0"
          cursor="rayOrigin: mouse"
        >
          {" "}
        </Entity>
        <Entity
          obj-model="obj: #tree-o; mtl: #tree-m"
          position="-25 0 -35"
          scale="0.5 0.5 0.5"
        />
        <Entity
          obj-model="obj: #tree-o; mtl: #tree-m"
          position="15 0 -35"
          scale="0.5 0.5 0.5"
        />
      </Scene>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <VRScene />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
