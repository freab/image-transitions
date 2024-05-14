import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Loader } from "@react-three/drei";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Canvas shadows camera={{ position: [0, 0, 12], fov: 45 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </Suspense>
  );
}

export default App;
