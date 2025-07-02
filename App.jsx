import React from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Geometry and material
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x4f46e5, metalness: 0.7, roughness: 0.2 });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup on unmount
    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full -z-10 opacity-30" />;
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white font-sans p-6">
      <ThreeScene />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto bg-black bg-opacity-50 rounded-lg p-8 shadow-lg"
      >
        <h1 className="text-4xl font-bold mb-2 text-center">joki tugas by hytam</h1>
        <h2 className="text-xl font-semibold mb-6 text-center tracking-wide">
          JOKI TUGAS | PR | PPT | MAKALAH | CANVA
        </h2>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-lg">
          <li>tugas sekolah/kuliah</li>
          <li>jawaban pr harian</li>
          <li>ngerjain ulangan online</li>
          <li>ppt keren dan rapi</li>
          <li>design canva estetik</li>
          <li>makalah</li>
        </ol>
        <p className="mb-6 text-center italic">
          fast repon, terjamin dan rahasia serta harga bersahabat
        </p>
        <p className="text-center font-semibold text-lg">
          AYO SEGERA HUBUNGI NOMOR TELEPON DIBAWAH
        </p>
        <p className="text-center mt-2">
          <a
            href="http://wa.me//+62881012688488"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-600 font-mono text-xl"
          >
            +62 881-0126-88488
          </a>
        </p>
      </motion.div>
    </div>
  );
}
