import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";

export default function App() {
  const [running, setrunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0)
  useEffect(() => {
    setrunning(true);
  }, []);

  return (
    <View style={{ backgroundColor: "#212121", flex: 1 }}>
    <Text style={{ textAlign: 'center', fontSize: 50, fontWeight: 'bold', margin: 40, color: 'white'}}>{currentPoints}</Text>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case "game_over":
              setrunning(false);
              gameEngine.stop()
              setCurrentPoints(0)
              break;
            case 'new_point': 
              setCurrentPoints(currentPoints + 1)
              break;
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >

      <StatusBar style="auto" hidden={true} />

      </GameEngine>

    </View>
  );
}
