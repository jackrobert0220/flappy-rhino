import Matter from "matter-js";
import Bird from "../components/Bird";
import rhino from "../assets/flying-rhino.png";

export default (restart) => {
  let engine = Matter.Engine.create({ enableSleeping: false });

  let world = engine.world;

  engine.gravity.y = 0.4;

  return {
    physics: { engine, world },
    // ----- change to IMAGE later ------
    Bird: Bird(world, 'green', { x: 50, y: 200 }, { height: 40, width: 40 }),
  };
};
