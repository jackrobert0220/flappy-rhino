import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";

export default function App() {
  const [running, setrunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  useEffect(() => {
    setrunning(false);
  }, []);

  return (
    <View style={{ backgroundColor: "#212121", flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 50,
          fontWeight: "bold",
          margin: 40,
          color: "white",
          zIndex: 2,
        }}
      >
        {currentPoints}
      </Text>
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
              gameEngine.stop();
              break;
            case "new_point":
              setCurrentPoints(currentPoints + 1);
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

      {!running ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              paddingVertical: 20,
              paddingHorizontal: 40,
              borderRadius: 8,
              borderWidth: 5,
            }}
            onPress={() => {
              setCurrentPoints(0);
              setrunning(true);
              gameEngine.swap(entities());
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 30 }}>START GAME</Text>
          </TouchableOpacity>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 8,
              marginTop: 70,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
              }}
            >
              @PlasticRhinoBand Artwork by: @MCMorrisDesign
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}
