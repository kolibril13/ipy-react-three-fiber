import { createRender, useModelState } from "@anywidget/react";


import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';


function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
export const render = createRender(() => {
  return (
    <Canvas>
      <Box color="#18a36e" position={[-1, 0, 5]} />
      <Box color="#f56f42" position={[1, 0, 3]} />
      <OrbitControls />
      <directionalLight color="#ffffff" intensity={1} position={[-1, 2, 4]} />
    </Canvas>
  );
});
