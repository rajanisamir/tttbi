import "aframe";
import "aframe-particle-system-component";
import { Entity, Scene } from "aframe-react";
import React from "react";

var delay = ( function() {
  var timer = 0;
  return function(callback, ms) {
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
  };
})();

// var rewardsPos = [{x: -4, z: -4}, {x: -3, z: -6}, {x: -3, z: 6}, {x: 4, z: 4}, {x: 6, z: -3}, {x: 6, z: 3}, {x: 3, z: 6}]

class VRScene extends React.Component {
  toggleMeditation = (object, instructionText, startText, world, place, model) => () => {
    // meditate:
    var scene = document.querySelector("#scene");
    var sphere = scene.querySelector(object);
    sphere.setAttribute("visible", 'true');
    sphere.setAttribute(
      "animation",
      "property: scale; to: .5 .5 .5; dur: 4000; dir: alternate; loop: true;"
    );
    var meditationInstr = scene.querySelector(instructionText);
    meditationInstr.setAttribute("visible", 'true');
    var startMed = scene.querySelector(startText);
    startMed.setAttribute("visible", 'false');

    var entity = document.createElement('a-entity');  
    scene.appendChild(entity);      

    delay( () => {
      sphere.setAttribute("visible", 'false');
      meditationInstr.setAttribute("visible", 'false');
      startMed.setAttribute("visible", 'true');

      var reward = scene.querySelector(model).getObject3D('mesh').clone();
      entity.setObject3D('mesh', reward);   
      if(world === "#world1")
        entity.setAttribute('scale', '.5, .5, .5');
      if(world === "#world2")
        entity.setAttribute('scale', '.01, .01, .01');
      if(world === "#world3")
        entity.setAttribute('scale', '2, 2.5, 2');
      var worldP = scene.querySelector(world).getAttribute('position');
      var pos =  scene.querySelector(place).getAttribute('position');
      var offsetx = Math.random()*10 - 5;
      var offsetz = Math.random()*10 - 5;
      entity.setAttribute('position', {x:worldP.x + pos.x + offsetx, y:pos.y, z:pos.z + worldP.z + offsetz});
      entity.setAttribute('visible', 'true');
    },
    30000);
  };

  delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
  })();

  handleWorlds = () => {
    var scene = document.querySelector("#scene");
    var world2 = scene.querySelector("#world2");
    if (global.assignmentScore > 20) {
      world2.setAttribute("visible", "true");
    }
    else {
      world2.setAttribute("visible", "false");
    }
    var world3 = scene.querySelector("#world3");
    if (global.assignmentScore > 50) {
      world3.setAttribute("visible", "true");
    }
    else {
      world3.setAttribute("visible", "false");
    }
  };

  render() {
    let tree_colors = [
      "#b3d9b3",
      "#99cc99",
      "#80c080",
      "#80cbc4",
      "#4db6ac",
      "#99cc99",
      "#b3d9b3",
      "#346c",
      "#356c",
      "#345c",
    ];
    let cube_tree_colors = [
      "#dedeec",
      "#cecee2",
      "#adadcf",
      "#9c9dc5",
      "#8c8cbc",
      "#8d4585",
      "#edf4f3",
      "#dbe9e7",
      "#c9deda",
      "#a6c8c3",
      "#94bcb6",
    ];
    let sphere_tree_colors = [
      "#fffde7",
      "#fff9c4",
      "#fff176",
      "#fff59d",
      "#fae2e3",
      "#f7d3d6",
      "#f5c5c8",
      "#f2b6ba",
      "#ffe5cc",
      "#ffd3ab",
    ];
    return (
      <Scene id="scene" events={{ click: this.handleWorlds }} shadow="type: pcfsoft" fog="type: exponential; density: 0.015; color: #7BC8A4">
        <a-assets>
          <a-asset-item id="tree-o" src="models/tree2.obj"></a-asset-item>
          <a-asset-item id="tree-m" src="models/tree2.mtl"></a-asset-item>
          <a-asset-item id="lotus1" src="models/lotus1.obj"></a-asset-item>
          <a-asset-item id="flower" src="models/flower.obj"></a-asset-item>
          <a-asset-item id="crystal-o" src="models/crystal.obj"></a-asset-item>
          <a-asset-item id="crystal-m" src="models/crystal.mtl"></a-asset-item>
          <a-asset-item id="bush-o" src="models/bush.obj"></a-asset-item>
          <a-asset-item id="bush-m" src="models/bush.mtl"></a-asset-item>
          <a-asset-item id="palm_tree-o" src="models/Palm_Tree.obj"></a-asset-item>
          <a-asset-item id="palm_tree-m" src="models/Palm_Tree.mtl"></a-asset-item>
          <a-asset-item id="cactus-o" src="models/Cactus_lowpoly.obj"></a-asset-item>
          <a-asset-item id="cactus-m" src="models/Cactus_lowpoly.mtl"></a-asset-item>
        </a-assets>
        {/* environment */}
        <Entity
          primitive="a-light"
          light="type: directional;
                castShadow: true;
                intensity: .6;
                shadowCameraTop: 100;
                shadowCameraRight: 100;
                shadowCameraLeft: -100;
                shadowMapHeight: 2000;
                shadowMapWidth: 2000;"
          color="#ffffe4"
          position="0 3 3"
          rotation="0 0 0"
        />
        <Entity
          primitive="a-light"
          type="ambient"
          color="white"
          intensity="0.6"
        />
        <Entity primitive="a-sky" color="#7BC8A4" />
        <Entity
            primitive="a-plane"
            position="0 -0.1 0"
            rotation="-90 0 0"
            width="2000"
            height="2000"
            color="#7BC8A4"
            shadow="receive: false"
          />
        <Entity id="world1" visible="true">
          <Entity
            primitive="a-plane"
            position="0 0 -4"
            rotation="-90 0 0"
            width="100"
            height="100"
            color="#A8E4A0"
            shadow="receive: true"
          />
          {/* populate with trees */}
          <Entity id="cone-tree1" position="2 0 -6" shadow="cast: true">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="6.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="cone-tree2" position="-5 0 -10" shadow="cast: true">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="6.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="cone-tree3" position="-5 0 -5" shadow="cast: true">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="6.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="3"
              height="5"
              color={tree_colors[2]}
              position="0 4 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" position="-2 0 -30" shadow="cast: true">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="6.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="2"
              height="4"
              color={tree_colors[3]}
              position="0 4 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" shadow="cast: true" position="3 0 -40">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="6.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="-1 0 -38">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="6.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="4 0 -8">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="6.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="15 0 -10">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="6.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="4.5"
              height="4"
              color={tree_colors[1]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" shadow="cast: true" position="-5 0 -15">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="6.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="12 0 -30">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="6.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="2.5"
              height="5"
              color={tree_colors[3]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" shadow="cast: true" position="30 0 -40">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="6.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="5 0 -35">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="6.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-cone"
              radius="2"
              height="4"
              color={tree_colors[5]}
              position="0 4 0"
            >
              {" "}
            </Entity>
          </Entity>

          {/* meditation pond */}
          <Entity
            primitive="a-cylinder"
            id="pond"
            visible="true"
            position="6 0 -25"
            height="0.01"
            radius="5"
            color="#90D1C7"
            events={{
              click: this.toggleMeditation(
                "#sphere",
                "#meditate-instr",
                "#start-med",
                "#world1",
                "#pond",
                "#crystal",
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
            width="100"
            height="100"
            color="lavender"
            shadow="receive: true"
            material="shader:phong"
          />
          {/* populate with trees */}
          <Entity id="tree" shadow="cast: true" position="2 0 -6">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="-5 0 -10">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="-5 0 -5">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="-2 0 -30">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="3 0 -40">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="-1 0 -38">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="4 0 -8">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="15 0 -10">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="-5 0 -15">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="12 0 -30">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="30 0 -40">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
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
          <Entity id="tree" shadow="cast: true" position="5 0 -35">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
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

          {/* <Entity
            obj-model="obj: #flower;"
            id="flower1"
            position="-1 -1 -5"
            scale="0.5 0.5 0.5"
            shadow="cast: true"
            visible="true"
          /> */}
          {/* meditation garden */}
          <Entity
            primitive="a-box"
            id="garden"
            visible="true"
            position="20 0 -30"
            height="0.01"
            depth="5"
            width="10"
            color="magenta"
            events={{
              click: this.toggleMeditation(
                "#sphere2",
                "#meditate-instr2",
                "#start-med2",
                "#world2",
                "#garden",
                "#flower1"
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
        <Entity id="world3" visible="false" position="100 2 -30">
          <Entity
            primitive="a-plane"
            position="0 -2 -34"
            rotation="-90 0 0"
            width="100"
            height="100"
            color="#f1e5ac"
            shadow="receive: true"
            material="shader:phong"
          />
          <Entity
            primitive="a-sphere"
            position="0 -400 -54"
            rotation="0 0 0"
            radius="401"
            color="#f1e5ac"
            shadow="receive: true"
            material="shader:phong"
          />
          {/* populate with trees */}
          <Entity id="tree" shadow="cast: true" position="2 0 -6">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-sphere"
              radius="2"
              color={cube_tree_colors[0]}
              position="0 5 0"
            >
            <Entity
              primitive="a-sphere"
              radius="2"
              color={cube_tree_colors[0]}
              position="0 3 0"
            ></Entity>
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" shadow="cast: true" position="-15 0 -10">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-sphere"
              radius="1.5"
              color={sphere_tree_colors[1]}
              position="0 4 0"
            >
            <Entity
              primitive="a-sphere"
              radius="1.5"
              color={sphere_tree_colors[1]}
              position="0 3 0"
            ></Entity>
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" shadow="cast: true" position="-25 0 -5">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-sphere"
              radius="1.5"
              color={sphere_tree_colors[2]}
              position="0 5 0"
            ></Entity>
            <Entity
              primitive="a-sphere"
              radius="1.5"
              color={sphere_tree_colors[2]}
              position="0 6 0"
            ></Entity>
              {" "}
          </Entity>
          <Entity id="tree" shadow="cast: true" position="-32 0 -30">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-sphere"
              radius="1.5"
              color={sphere_tree_colors[3]}
              position="0 8 0"
            ></Entity>
            <Entity
              primitive="a-sphere"
              radius="2"
              color={sphere_tree_colors[3]}
              position="0 6 0"
            ></Entity>
            <Entity
              primitive="a-sphere"
              radius="2.5"
              color={sphere_tree_colors[3]}
              position="0 4 0"
            ></Entity>
              {" "}
          </Entity>
          <Entity id="tree" shadow="cast: true" position="3 0 -40">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-sphere"
              radius="1.5"
              color={sphere_tree_colors[4]}
              position="0 3 0"
            ></Entity>
            <Entity
              primitive="a-sphere"
              radius="1"
              color={sphere_tree_colors[4]}
              position="0 4.5 0"
            ></Entity>
              {" "}
          </Entity>
          <Entity id="tree" shadow="cast: true" position="-10 0 -38">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-sphere"
              radius="1.5"
              color={sphere_tree_colors[5]}
              position="0 3.5 0"
            ></Entity>
            <Entity
              primitive="a-sphere"
              radius="2"
              color={sphere_tree_colors[5]}
              position="0 2 0"
            ></Entity>
              {" "}
          </Entity>
          <Entity id="tree" shadow="cast: true" position="-4 0 -8">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-sphere"
              radius="1.5"
              color={sphere_tree_colors[4]}
              position="0 5 0"
            ></Entity>
            <Entity
              primitive="a-sphere"
              radius="2"
              color={sphere_tree_colors[4]}
              position="0 3.5 0"
            ></Entity>
              {" "}
          </Entity>
          <Entity id="tree" shadow="cast: true" position="-15 0 -20">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-sphere"
              radius="1.5"
              color={sphere_tree_colors[1]}
              position="0 5 0"
            ></Entity>
            <Entity
              primitive="a-sphere"
              radius="1"
              color={sphere_tree_colors[1]}
              position="0 6.5 0"
            ></Entity>
              {" "}
          </Entity>
          <Entity id="tree" shadow="cast: true" position="-35 0 -15">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-sphere"
              radius="1.5"
              color={sphere_tree_colors[2]}
              position="0 4 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" shadow="cast: true" position="-12 0 -30">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-sphere"
              radius="1.5"
              color={sphere_tree_colors[3]}
              position="0 3 0"
            ></Entity>
            <Entity
              primitive="a-sphere"
              radius="1"
              color={sphere_tree_colors[3]}
              position="0 4.5 0"
            ></Entity>
              {" "}
          </Entity>
          <Entity id="tree" shadow="cast: true" position="13 0 -40">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-sphere"
              radius="1.5"
              color={sphere_tree_colors[4]}
              position="0 3 0"
            >
              {" "}
            </Entity>
          </Entity>
          <Entity id="tree" shadow="cast: true" position="-5 0 -35">
            <Entity
              primitive="a-cylinder"
              id="cylinder"
              radius="0.2"
              height="7.6"
              color="#715656"
              position="0 0 0"
            >
              {" "}
            </Entity>
            <Entity
              primitive="a-sphere"
              radius="1.5"
              color={sphere_tree_colors[5]}
              position="0 5 0"
            >
              {" "}
            </Entity>
          </Entity>

          {/* meditation oasis */}
          <Entity
            primitive="a-box"
            id="oasis"
            visible="true"
            position="0 -1 -30"
            height="0.01"
            depth="5"
            width="10"
            color="yellow"
            events={{
              click: this.toggleMeditation(
                "#sphere3",
                "#meditate-instr3",
                "#start-med3",
                "#world3",
                "#oasis",
                "#palm-tree"
              ),
            }}
          >
            <Entity
              primitive="a-text"
              id="start-med3"
              rotation="0 0 0"
              position="-3 .5 2"
              scale="1.5 1.5 1"
              value="Click to start meditation session"
            />
            <Entity
              primitive="a-sphere"
              id="sphere3"
              visible="false"
              position="0 3 0"
              radius="2"
              color="yellow"
            />
            <Entity
              primitive="a-text"
              id="meditate-instr3"
              visible="false"
              scale="2 2 1"
              value="Breathe In and Out with the Sphere"
              font="monoid"
              position="-4 7 0"
              color="yellow"
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
          shadow="cast: true"
        />
        <Entity
          obj-model="obj: #tree-o; mtl: #tree-m"
          position="15 0 -35"
          scale="0.5 0.5 0.5"
          shadow="cast: true"
        />
        <Entity
          obj-model="obj: #lotus1;"
          id="lotus1"
          position="1 0 -5"
          scale="0.5 0.5 0.5"
          shadow="cast: true"
          visible="false"
        />
        <Entity
            obj-model="obj: #flower;"
            id="flower1"
            position="-1 -1 -5"
            scale="0.5 0.5 0.5"
            shadow="cast: true"
            visible="false"
          />
        <Entity
          obj-model="obj: #crystal-o; mtl: #crystal-m"
          id="crystal"
          position="5 0 -2"
          scale="0.5 0.5 0.5"
          shadow="cast: true"
          visible="false"
        />
        <Entity
          obj-model="obj: #palm_tree-o; mtl: #palm_tree-m"
          id="palm-tree"
          position="5 0 -13"
          scale="1 1 1"
          shadow="cast: true"
          visible="false"
        />
        <Entity
          obj-model="obj: #cactus-o; mtl: #cactus-m"
          id="cactus"
          position="0 0 -12"
          scale="5 5 5"
          shadow="cast: true"
          visible="true"
        />
        {/* <Entity
          obj-model="obj: #bush-o; mtl: #bush-m"
          position="5 0 -3"
          scale="0.03 0.03 0.03"
          shadow="cast: true"
        /> */}
      </Scene>
    );
  }
}

export default VRScene;
