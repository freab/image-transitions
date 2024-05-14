import { OrbitControls } from "@react-three/drei";
import { Transition1 } from "./transtion1";
import { Transition2 } from "./transition2";
import { Transition3 } from "./transition3";
import { Transition4 } from "./transition4";
import { Transition5 } from "./transition5";
import { Transition6 } from "./transition6";
import { Transition7 } from "./transition7";

export const Experience = () => {
  return (
    <>
      <OrbitControls />

      <Transition1 position={[-2.6, -2, 0]} scale={0.8} />
      <Transition2 position={[-0.2, 0, 0]} scale={0.65} />
      <Transition6 position={[3.3, 2.5, 0]} scale={1} />
      <Transition3 position={[-0.2, -2.5, 0]} scale={0.6} />
      <Transition4 position={[-3.2, 2, 0]} scale={1.1} />
      <Transition5 position={[2.9, -1.6, 0]} scale={1.1} />
      <Transition7 position={[-0.3, 3.2, 0]} scale={0.6} />
    </>
  );
};
