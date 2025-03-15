import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Componente para criar um favo de mel
const Honeycomb = ({ position, content, onClick, isCentral }) => {
  const meshRef = useRef();

  useFrame(({ camera }) => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
      meshRef.current.rotation.x = Math.PI / 8; // Inclinação fixa

      if (isCentral) {
        // Rotação específica para o favo central
        meshRef.current.rotation.y = 0; // Garante que não gire no eixo Y
        meshRef.current.rotation.z = 0; // Garante que não gire no eixo Z
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position} onClick={onClick}>
      <cylinderGeometry args={[0.3, 0.3, 0.08, 6]} /> {/* Reduzi o tamanho para aproximar */}
      <meshStandardMaterial
        color={content ? "white" : "red"}
        map={content ? new THREE.TextureLoader().load(content) : null}
      />
    </mesh>
  );
};

// Componente principal da esfera com favos de mel
const HoneycombSphere = () => {
  const [posts, setPosts] = useState([]);
  const radius = 3; // Reduzi o raio para compactar a esfera
  const segments = 20; // Aumentei os segmentos para mais favos e menor espaço

  const addPost = (position, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newPost = {
        id: posts.length + 1,
        position,
        content: e.target.result,
      };
      setPosts([...posts, newPost]);
    };
    reader.readAsDataURL(file);
  };

  const vertices = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    for (let j = 0; j <= segments; j++) {
      const phi = (j / segments) * Math.PI;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      vertices.push(new THREE.Vector3(x, y, z));
    }
  }

  // Identifica o favo central
  const centralVertex = vertices[Math.floor(vertices.length / 2)];

  return (
    <Canvas
      style={{ height: "100vh", background: "#f0f0f0" }}
      camera={{ position: [0, 0, 5], fov: 60 }} // Ajustei a posição da câmera para mais perto
    >
      {/* Iluminação para melhor visualização */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />

      {/* Renderiza os favos de mel nos vértices */}
      {vertices.map((vertex, index) => {
        const post = posts.find(
          (post) =>
            post.position.x === vertex.x &&
            post.position.y === vertex.y &&
            post.position.z === vertex.z
        );
        const isCentral = vertex.equals(centralVertex); // Verifica se é o favo central

        return (
          <Honeycomb
            key={index}
            position={vertex}
            content={post ? post.content : null}
            onClick={() => {
              const fileInput = document.createElement("input");
              fileInput.type = "file";
              fileInput.accept = "image/*, video/*";
              fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                  addPost(vertex, file);
                }
              };
              fileInput.click();
            }}
            isCentral={isCentral}
          />
        );
      })}

      {/* Controles de órbita com ajustes para proximidade */}
      <OrbitControls
        enablePan={false}
        enableZoom={true} // Permitir zoom para ajustar a proximidade
        enableRotate={true}
        minDistance={2} // Limite mínimo de distância da câmera
        maxDistance={6} // Limite máximo de distância
      />
    </Canvas>
  );
};

export default HoneycombSphere;