import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  useEffect(() => {
    setRunning(false);
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
        ref={(ref) => { setGameEngine(ref) }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false)
              gameEngine.stop()
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1)
              
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
              setRunning(true);
              gameEngine.swap(entities());
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 30 }}>START GAME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
              backgroundColor: "black",
              color: "white",
              paddingVertical: 20,
              paddingHorizontal: 40,
              borderRadius: 8,
              borderWidth: 5,
              marginTop: 20,
            }}>
            <View
            
            >
              <Text
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
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
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
