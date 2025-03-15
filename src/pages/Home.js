// pages/Home.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import HoneycombSphere from "../components/HoneycombSphere";

const Home = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ textAlign: "center", color: "white", position: "absolute", top: "20px", width: "100%" }}>
        iMemory - Rede Social de Memórias Coletivas
      </h1>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <HoneycombSphere />
      </Canvas>
    </div>
  );
};

export default Home;