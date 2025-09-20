import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
// import * as THREE from "three";

interface Props {
  fitX: number;
  fitY: number;
  fitZ: number;
  box: { length: number; width: number; height: number };
  container: { length: number; width: number; height: number };
}

// Reusable box
function BoxInstance({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#4F46E5" />
    </mesh>
  );
}

// Load Truck Model
function TruckModel() {
  const { scene } = useGLTF("/models/truck.glb"); // Place truck.glb inside public/models
  return <primitive object={scene} scale={2} position={[0, -5, 0]} />;
}

export default function Container3D({ fitX, fitY, fitZ, box, container }: Props) {
  const boxSize: [number, number, number] = [box.length / 10, box.height / 10, box.width / 10];
  const containerSize: [number, number, number] = [container.length / 10, container.height / 10, container.width / 10];

  return (
    <div className="card h-[600px]">
      <h3 className="font-semibold mb-2 text-gray-700">3D Truck Loading Simulation</h3>
      <Canvas camera={{ position: [25, 20, 25], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} />

        {/* Truck */}
        <TruckModel />

        {/* Transparent Container */}
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={containerSize} />
          <meshBasicMaterial color="white" wireframe transparent opacity={0.25} />
        </mesh>

        {/* Boxes */}
        {Array.from({ length: fitX * fitY * fitZ }).map((_, i) => {
          const x = (i % fitX) * boxSize[0] - containerSize[0] / 2 + boxSize[0] / 2;
          const y = (Math.floor(i / (fitX * fitY)) % fitZ) * boxSize[1] - containerSize[1] / 2 + boxSize[1] / 2 + 2; // shifted up
          const z = (Math.floor(i / fitX) % fitY) * boxSize[2] - containerSize[2] / 2 + boxSize[2] / 2;

          return <BoxInstance key={i} position={[x, y, z]} size={boxSize} />;
        })}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
