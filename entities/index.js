import Matter from "matter-js";
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";

import { Dimensions } from "react-native";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default (restart) => {
  let engine = Matter.Engine.create({ enableSleeping: false });

  let world = engine.world;

  engine.gravity.y = 0.4;

  return {
    physics: { engine, world },
    // ----- change to IMAGE later ------
    Bird: Bird(world, "green", { x: 50, y: 300 }, { height: 90, width: 90 }),
    ObstacleTop1: Obstacle(world, "ObstacleTop1", "green", { x: 50, y: 300 }, { height: 90, width: 90 }),
    Floor: Floor(world, "#FF5733", { x: windowWidth / 2, y: windowHeight }, { height: 50, width: windowWidth}),
  };
};