import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positionArray = new Float32Array(particleCount * 3);
    const velocityArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positionArray[i] = (Math.random() - 0.5) * 200;
      positionArray[i + 1] = (Math.random() - 0.5) * 200;
      positionArray[i + 2] = (Math.random() - 0.5) * 200;

      velocityArray[i] = (Math.random() - 0.5) * 0.5;
      velocityArray[i + 1] = (Math.random() - 0.5) * 0.5;
      velocityArray[i + 2] = (Math.random() - 0.5) * 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.5,
      color: 0x3b82f6,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);

    const geometryLines = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      linePositions[i] = positionArray[i];
    }
    geometryLines.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lines = new THREE.LineSegments(
      geometryLines,
      new THREE.LineBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.1,
      })
    );
    scene.add(lines);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = (e.clientX / width) * 2 - 1;
      targetMouseRef.current.y = -(e.clientY / height) * 2 + 1;
    };

    const handleWindowResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleWindowResize);

    const animate = () => {
      requestAnimationFrame(animate);

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1;

      if (particles) {
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;

        const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
        const positions = posAttr.array as Float32Array;
        const velocities = geometry.getAttribute('velocity')?.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const index = i * 3;

          positions[index] += velocities[index];
          positions[index + 1] += velocities[index + 1];
          positions[index + 2] += velocities[index + 2];

          if (Math.abs(positions[index]) > 100) velocities[index] *= -1;
          if (Math.abs(positions[index + 1]) > 100) velocities[index + 1] *= -1;
          if (Math.abs(positions[index + 2]) > 100) velocities[index + 2] *= -1;
        }

        posAttr.needsUpdate = true;
      }

      camera.position.x = mouseRef.current.x * 10;
      camera.position.y = mouseRef.current.y * 10;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleWindowResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      geometryLines.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
};

export default Background3D;
