// Note: Library yang di-install untuk 3d: three, @react-three/fiber, @react-three/drei
"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useGLTF, Center, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

// Load Logo 3D
function Model(props: any) {
  const { scene } = useGLTF("/logo.glb");
  return <primitive object={scene} {...props} />;
}

// Pergerakan Mouse
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (group.current) {
      // Menggunakan THREE.MathUtils.lerp untuk pergerakan halus
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        state.pointer.x * 0.4, 
        0.05 // Smoothing factor
      );
    }
  });
  return <group ref={group}>{children}</group>;
}

// Preload logo 3D agar langsung muncul
useGLTF.preload("/logo.glb");

// Komponen Utama
export default function Logo3D() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas 
        // OPTIMASI 1: Batasi Pixel Ratio (DPR)
        // dpr={[1, 2]} artinya min 1x, max 2x. 
        // Mencegah layar retina (Mac/HP) merender di 3x/4x yang bikin berat.
        dpr={[1, 2]} 

        // OPTIMASI 2: WebGL Config
        // preserveDrawingBuffer: false -> Hemat memori (matikan jika tidak butuh screenshot canvas)
        // antialias: true -> Agar pinggiran logo mulus
        gl={{ preserveDrawingBuffer: false, antialias: true }}

        camera={{ position: [0, 0, 12], fov: 45 }} 
        style={{ width: "100%", height: "100%" }}
      >
        {/* Cahaya dasar */}
        <ambientLight intensity={0.5} />

        {/* OPTIMASI 3: Resolusi Environment */}
        {/* Turunkan ke 256. Untuk pantulan blur, 512 seringkali overkill. */}
        <Environment resolution={256}>
          
          {/* Panel Cahaya Atas */}
          <Lightformer 
            intensity={2} 
            rotation-x={Math.PI / 2} 
            position={[0, 5, -9]} 
            scale={[10, 10, 1]} 
          />

          {/* Panel Cahaya Samping Kiri */}
          <Lightformer 
            intensity={4} 
            color="#11AEAF" 
            rotation-y={Math.PI / 2} 
            position={[-5, 1, -1]} 
            scale={[10, 2, 1]} 
          />

          {/* Panel Cahaya Samping Kanan */}
          <Lightformer 
            intensity={2} 
            rotation-y={-Math.PI / 2} 
            position={[10, 1, 0]} 
            scale={[20, 2, 1]} 
          />

           {/* Panel Bawah */}
           <Lightformer 
            intensity={1} 
            rotation-x={-Math.PI / 2} 
            position={[0, -4, 0]} 
            scale={[10, 10, 1]} 
            color="#D2F1EB"
          />

        </Environment>

        {/* Logo */}
        <Suspense fallback={null}>
          <Rig>
            {/* Float: Efek melayang */}
            <Float speed={2} rotationIntensity={0.1}>
              <Center position={[1.5, 0, 0]}>
                {/* Model GLB */}
                <Model scale={1.25} rotation={[10.8, 0, -0.6]} /> 
              </Center>
            </Float>
          </Rig>
        </Suspense>
      </Canvas>
    </div>
  );
}