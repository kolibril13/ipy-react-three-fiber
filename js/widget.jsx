import { createRender, useModelState } from "@anywidget/react";
import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "@react-three/drei";

extend({ OrbitControls });

function BlenderModel(props) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const torusModelUrl = "./cube_model.gltf";
  const gltf = useLoader(GLTFLoader, torusModelUrl);

  const scaleValue = clicked ? 1.5 : 1;

  useFrame((state, delta) => (ref.current.rotation.x += delta));

  return (
    <primitive
      object={gltf.scene}
      ref={ref}
      scale={[scaleValue, scaleValue, scaleValue]}
      {...props}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    />
  );
}

export const render = createRender(() => {
  const [value, setValue] = useModelState("value");

  return (
    <>
      <button
        className="ipy_react_three_fiber-counter-button"
        onClick={() => setValue(value + 1)}
      >
        count is {value}
      </button>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <BlenderModel position={[-3, -2, 0]} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
});
