import React from "react";
import Matter from "matter-js";
import { Image, View } from "react-native";
import knife from "../assets/WhiteKnife.png";
import reactDom from "react-dom";

const Obstacle = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        borderWidth: 1,
        backgroundColor: 'red',
        borderColor: color,
        borderStyle: "solid",
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    >
    <Image source={knife} style={{ width: 65, height: 420 }} /> 
    {/* <Image source={knife} style={{ width: 75, height: 110, transform: [{ rotate: '55deg'}] }} /> 
    <Image source={knife} style={{ width: 75, height: 110, transform: [{ rotate: '55deg'}] }} /> 
    <Image source={knife} style={{ width: 75, height: 110, transform: [{ rotate: '55deg'}] }} /> 
    <Image source={knife} style={{ width: 75, height: 110, transform: [{ rotate: '55deg'}] }} />  */}

    </View>
  );
};

export default (world, label, color, pos, size) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
        label,
        isStatic: true
    }
  );
  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color,
    pos,
    renderer: <Obstacle />,
  };
};
