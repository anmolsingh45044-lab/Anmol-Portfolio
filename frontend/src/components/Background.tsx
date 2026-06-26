import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';

extend({ UnrealBloomPass });

const ParticleSwarm = () => {
  const meshRef = useRef();
  const count = 20000;
  const speedMult = 1;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const color = pColor; // Alias for user code compatibility
  
  const positions = useMemo(() => {
     const pos = [];
     for(let i=0; i<count; i++) pos.push(new THREE.Vector3((Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100));
     return pos;
  }, []);

  // Material & Geom
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

  const PARAMS = useMemo(() => ({"scale":50,"shape":3.2,"table":0.65,"jardin":0.6,"spin":0.5}), []);
  const addControl = (id, l, min, max, val) => {
      return PARAMS[id] !== undefined ? PARAMS[id] : val;
  };
  const setInfo = () => {};
  const annotate = () => {};

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;
    const THREE_LIB = THREE;

    if(material.uniforms && material.uniforms.uTime) {
         material.uniforms.uTime.value = time;
    }

    for (let i = 0; i < count; i++) {
        // USER CODE START
        const scale = addControl("scale", "Gem Size", 10, 100, 50);
        const cushionSquareness = addControl("shape", "Cushion Squareness", 2.0, 6.0, 3.2);
        const tableSize = addControl("table", "Table Size", 0.3, 0.9, 0.65);
        const jardin = addControl("jardin", "Inclusions (Jardin)", 0.0, 1.0, 0.6);
        const spinSpeed = addControl("spin", "Spin Speed", 0.0, 2.0, 0.3);
        
        const hashY = (i * 0.314159) % 1.0;
        const hashR = (i * 0.271828) % 1.0;
        const hashJ = (i * 0.161803) % 1.0;
        
        const y_norm = hashY * 2.0 - 1.0;
        const r_scale = Math.sqrt(hashR + 0.0001);
        
        const top_y = 0.4;
        const crown_r = 1.0 - Math.max(0.0, y_norm - top_y) / (1.0 - top_y) * (1.0 - tableSize);
        const pavilion_r = Math.max(0.0, y_norm + 1.0) / (1.0 + top_y);
        const profile_r = Math.min(crown_r, pavilion_r);
        
        const golden_angle = 2.3999632;
        const theta = i * golden_angle;
        
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);
        const squircleBase = Math.pow(Math.abs(cosT), cushionSquareness) + Math.pow(Math.abs(sinT), cushionSquareness);
        const squircle_r = 1.0 / Math.pow(squircleBase, 1.0 / cushionSquareness);
        
        const local_r = profile_r * squircle_r * r_scale * scale;
        
        const local_x = local_r * cosT;
        const local_y = y_norm * scale * 1.1;
        const local_z = local_r * sinT;
        
        const rotTime = time * spinSpeed;
        const cosR = Math.cos(rotTime);
        const sinR = Math.sin(rotTime);
        
        const final_x = local_x * cosR - local_z * sinR;
        const final_y = local_y;
        const final_z = local_x * sinR + local_z * cosR;
        
        const inclusionX = Math.sin(hashJ * 113.0) * jardin * 3.0;
        const inclusionY = Math.cos(hashJ * 127.0) * jardin * 3.0;
        const inclusionZ = Math.sin(hashJ * 139.0) * jardin * 3.0;
        
        target.set(final_x + inclusionX, final_y + inclusionY, final_z + inclusionZ);
        
        const facet_y = Math.floor(y_norm * 10.0);
        const facet_theta = Math.floor(theta * 6.0);
        
        const glintWave = Math.sin(facet_theta * 1.8 + facet_y * 2.5 - rotTime * 5.0);
        const glint = Math.pow(Math.max(0.0, glintWave), 14.0);
        
        const coreGlow = 1.0 - r_scale;
        const flawLight = hashJ * jardin * 0.4;
        
        const hue = 0.42 + glint * 0.03 + flawLight * 0.04;
        const saturation = 0.95 - glint * 0.5 - flawLight * 0.4;
        const lightness = 0.12 + coreGlow * 0.25 + glint * 0.65 + flawLight * 0.8;
        
        color.setHSL(hue, saturation, lightness);
        
        if (i === 0) {
        setInfo("Cushion Cut Emerald", "A procedural deep green gemstone featuring a squircle profile, step-cut faceting, and natural 'jardin' inclusions.");
        annotate("table", new THREE.Vector3(0, scale * 1.1 + 5, 0), "Table Facet");
        }
        // USER CODE END

        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
};

export default function Background() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
        <fog attach="fog" args={['#000000', 0.01]} />
        <ParticleSwarm />
        <OrbitControls autoRotate={true} />
        <Effects disableGamma>
            <unrealBloomPass threshold={0} strength={1.8} radius={0.4} />
        </Effects>
      </Canvas>
    </div>
  );
}