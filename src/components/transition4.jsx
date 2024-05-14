import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { easing, geometry } from "maath";
import { useRef, useState } from "react";
import { DoubleSide } from "three";

export const ImageFadeMaterialDisplacement = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined
  },
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  /*glsl*/ ` 
    varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }`
);

extend({
  ImageFadeMaterialDisplacement,
  RoundedPlaneGeometry: geometry.RoundedPlaneGeometry
});

export const Transition4 = (props) => {
  const ref = useRef();
  const [texture1, texture2, dispTexture] = useTexture([
    "/textures/11.jpeg",
    "/textures/12.jpeg",
    "/textures/displacement/one.jpg"
  ]);
  const [active, setActive] = useState(false);
  useFrame((_state, delta) => {
    easing.damp(ref.current, "dispFactor", active ? 1 : 0, 0.4, delta);
  });
  return (
    <mesh
      {...props}
      onPointerOver={(e) => setActive(true)}
      onPointerOut={(e) => setActive(false)}
      onClick={(e) => setActive(!active)}
    >
      <roundedPlaneGeometry args={[2.5, 4]} />
      <imageFadeMaterialDisplacement
        ref={ref}
        tex={texture1}
        tex2={texture2}
        disp={dispTexture}
        toneMapped={false}
        side={DoubleSide}
      />
    </mesh>
  );
};
