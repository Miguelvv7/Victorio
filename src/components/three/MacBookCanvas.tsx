"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, useTexture, ContactShadows } from "@react-three/drei";
import { EffectComposer, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

function MacBook({ screenTexture }: { screenTexture: THREE.Texture }) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const silver = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#1c1c1e",
        metalness: 0.93,
        roughness: 0.07,
        reflectivity: 1,
        clearcoat: 0.4,
        clearcoatRoughness: 0.15,
      }),
    []
  );

  const dark = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#0d0d0e",
        metalness: 0.2,
        roughness: 0.7,
      }),
    []
  );

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y +=
      (mouse.x * 0.18 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x +=
      (-mouse.y * 0.09 - groupRef.current.rotation.x) * 0.04;
  });

  return (
    /* Inclinamos todo el laptop hacia atrás para exponer más la pantalla */
    <group rotation={[0.18, -0.12, 0]}>
    <group ref={groupRef}>
      {/* ── Base ── */}
      <mesh material={silver} receiveShadow castShadow>
        <boxGeometry args={[3.2, 0.07, 2.1]} />
      </mesh>

      {/* Keyboard recess */}
      <mesh position={[0, 0.039, 0.08]}>
        <boxGeometry args={[2.7, 0.009, 1.55]} />
        <meshPhysicalMaterial color="#141416" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.039, 0.68]}>
        <boxGeometry args={[0.9, 0.005, 0.52]} />
        <meshPhysicalMaterial color="#161618" metalness={0.85} roughness={0.12} />
      </mesh>

      {/* ── Screen assembly ── */}
      <group position={[0, 0.035, -1.03]} rotation={[-(Math.PI * 0.42), 0, 0]}>
        {/* Lid back */}
        <mesh material={silver} castShadow>
          <boxGeometry args={[3.2, 2.02, 0.058]} />
        </mesh>

        {/* Bezel */}
        <mesh position={[0, 0.02, 0.032]} material={dark}>
          <boxGeometry args={[2.96, 1.76, 0.012]} />
        </mesh>

        {/* Active screen */}
        <mesh position={[0, 0.02, 0.042]}>
          <boxGeometry args={[2.7, 1.58, 0.004]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>

        {/* Notch */}
        <mesh position={[0, 0.975, 0.035]} material={dark}>
          <boxGeometry args={[0.26, 0.072, 0.015]} />
        </mesh>

        {/* Oscurecedor — reduce el blanco de la web en pantalla */}
        <mesh position={[0, 0.02, 0.044]}>
          <boxGeometry args={[2.7, 1.58, 0.001]} />
          <meshPhysicalMaterial
            color="#000510"
            transparent
            opacity={0.38}
            roughness={0}
            metalness={0}
          />
        </mesh>
      </group>

      {/* ── Hinge ── */}
      <mesh position={[0, 0.035, -1.03]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.055, 0.055, 3.2, 20]} />
        <meshPhysicalMaterial color="#2a2a2e" metalness={0.92} roughness={0.12} />
      </mesh>
    </group>
    </group>
  );
}

function Scene() {
  const texture = useTexture("/images/screen-lookvintage.jpg");

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 8, 6]} intensity={1.4} castShadow />
      <directionalLight position={[-5, 4, 2]} intensity={0.6} color="#f0f4ff" />
      <directionalLight position={[-6, 2, -4]} intensity={0.5} color="#60a5fa" />
      <pointLight position={[0, 5, 3]} intensity={0.5} color="#f0f4ff" />

      <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.35}>
        <MacBook screenTexture={texture} />
      </Float>

      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.45}
        scale={7}
        blur={2.5}
        far={2.2}
        color="#000000"
      />
    </>
  );
}

export default function MacBookCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 5.8], fov: 42 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, logarithmicDepthBuffer: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene />
        <EffectComposer>
          <ChromaticAberration
            offset={new THREE.Vector2(0.0012, 0.0012)}
            blendFunction={BlendFunction.NORMAL}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette offset={0.35} darkness={0.55} blendFunction={BlendFunction.NORMAL} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
