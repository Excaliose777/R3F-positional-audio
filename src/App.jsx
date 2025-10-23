/* eslint-disable react/no-unknown-property */
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Color } from "three";
import { useControls } from "leva";
import { useState } from "react";
import Experience from "./components/Experience";
import AudioUpload from "./components/AudioUpload";

function UpdateSceneBackground() {
  const { scene } = useThree();

  const { color } = useControls({
    color: "#000000",
  });

  scene.background = new Color(color);

  return null;
}

function App() {
  const [audioUrl, setAudioUrl] = useState("/06 - Pudo.mp3"); // Default to original audio
  const [audioFileName, setAudioFileName] = useState("06 - Pudo.mp3");

  const handleAudioLoad = (url, fileName) => {
    if (url) {
      setAudioUrl(url);
      setAudioFileName(fileName);
    } else {
      // Reset to default audio when cleared
      setAudioUrl("/06 - Pudo.mp3");
      setAudioFileName("06 - Pudo.mp3");
    }
  };

  return (
    <div id="canvas-container">
      <AudioUpload
        onAudioLoad={handleAudioLoad}
        currentAudioUrl={audioUrl !== "/06 - Pudo.mp3" ? audioUrl : null}
      />
      <Canvas camera={{ position: [0.5, 5, 10] }}>
        <UpdateSceneBackground />
        {/* <axesHelper args={[10]} />
        <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} /> */}
        {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}> */}
        {/* <GizmoViewport /> */}
        {/* </GizmoHelper> */}
        <OrbitControls />
        <Experience audioUrl={audioUrl} />
      </Canvas>
    </div>
  );
}

export default App;
