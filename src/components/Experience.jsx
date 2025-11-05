/* eslint-disable react/no-unknown-property */
import { vertexShader } from "../shaders/Vertex";
import { fragmentShader } from "../shaders/Fragment";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { PositionalAudio } from "@react-three/drei";

const Experience = ({ audioUrl }) => {
  const meshRef = useRef();
  const audioRef = useRef();
  const analyserRef = useRef();
  const innerMeshRef = useRef();

  const uniforms = useRef({
    uTime: { value: 0 },
    u_frequency: { value: 0 },
    color: { value: new THREE.Color(0x6ba7cc) },
  }).current;

  useEffect(() => {
    if (audioRef.current && !analyserRef.current) {
      analyserRef.current = new THREE.AudioAnalyser(audioRef.current, 32);
    }
  }, []);

  // Reinitialize analyzer when audio URL changes
  useEffect(() => {
    if (audioRef.current && analyserRef.current) {
      // Clean up old analyzer
      analyserRef.current = null;
      // Create new analyzer for the new audio
      analyserRef.current = new THREE.AudioAnalyser(audioRef.current, 32);
    }
  }, [audioUrl]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (meshRef.current) meshRef.current.rotation.y = elapsedTime * 0.1;

    if (innerMeshRef.current)
      innerMeshRef.current.rotation.y = -elapsedTime * 0.1;
    uniforms.uTime.value = elapsedTime;

    uniforms.u_frequency.value = analyserRef.current.getAverageFrequency();

    // if (analyserRef.current) {
    //   const avgFreq = analyserRef.current.getAverageFrequency();
    //   uniforms.u_frequency.value = avgFreq / 255; // normalize to 0–1
    // }
  });

  const handleClick = () => {
    if (audioRef.current) {
      if (audioRef.current.isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <group>
      <mesh ref={meshRef} onClick={handleClick}>
        <icosahedronGeometry args={[4, 30]} />
        <shaderMaterial
          uniforms={uniforms}
          wireframe
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
        <PositionalAudio
          url={audioUrl}
          distance={1}
          loop
          autoplay={false}
          ref={audioRef}
        />
      </mesh>

      <mesh ref={innerMeshRef}>
        <icosahedronGeometry args={[3.5, 13]} />
        <meshBasicMaterial color="#AEDBF0" wireframe />
      </mesh>
    </group>
  );
};

export default Experience;
