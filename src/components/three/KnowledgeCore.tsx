"use client";

import { Float, Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";

function CoreObject() {
	const group = useRef<Group>(null);
	const points = useMemo(() => {
		const values: number[] = [];
		for (let index = 0; index < 140; index += 1) {
			const phi = Math.acos(1 - (2 * (index + 0.5)) / 140);
			const theta = Math.PI * (1 + Math.sqrt(5)) * index;
			const radius = 2.35 + Math.sin(index * 4.17) * 0.16;
			values.push(
				radius * Math.sin(phi) * Math.cos(theta),
				radius * Math.cos(phi),
				radius * Math.sin(phi) * Math.sin(theta),
			);
		}
		return new Float32Array(values);
	}, []);

	useFrame((state, delta) => {
		if (!group.current) return;
		group.current.rotation.y += delta * 0.07;
		group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.1;
	});

	return (
		<group ref={group} rotation={[0.1, -0.45, -0.1]}>
			<Float speed={1.25} rotationIntensity={0.2} floatIntensity={0.35}>
				<mesh>
					<icosahedronGeometry args={[1.95, 2]} />
					<meshPhysicalMaterial
						color="#141416"
						emissive="#ff4f16"
						emissiveIntensity={0.13}
						roughness={0.14}
						metalness={0.72}
						clearcoat={1}
						clearcoatRoughness={0.18}
					/>
				</mesh>
				<mesh scale={1.02}>
					<icosahedronGeometry args={[2, 2]} />
					<meshBasicMaterial color="#ff6b35" wireframe transparent opacity={0.24} />
				</mesh>
				<Points positions={points} stride={3} frustumCulled={false}>
					<PointMaterial transparent color="#fff8ee" size={0.026} sizeAttenuation depthWrite={false} />
				</Points>
				{[
					[2.34, 0.24, 0.15],
					[-1.82, 1.42, 0.55],
					[-0.4, -2.24, 0.82],
					[0.88, 1.8, 1.43],
				].map((position, index) => (
					<mesh key={index} position={position as [number, number, number]}>
						<sphereGeometry args={[index === 0 ? 0.105 : 0.065, 18, 18]} />
						<meshBasicMaterial color={index === 0 ? "#ff6b35" : "#f3f1ea"} />
					</mesh>
				))}
			</Float>
		</group>
	);
}

export default function KnowledgeCore() {
	return (
		<Canvas
			camera={{ position: [0, 0, 7.1], fov: 42 }}
			dpr={[1, 1.5]}
			gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
		>
			<ambientLight intensity={0.8} />
			<directionalLight position={[4, 5, 6]} intensity={2.8} color="#fff4e8" />
			<pointLight position={[-5, -2, 2]} intensity={18} color="#ff4f16" />
			<CoreObject />
		</Canvas>
	);
}
