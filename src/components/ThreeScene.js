import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { Scene } from 'three';

const ThreeScene = () => {
  const containerRef = useRef();
  let camera, scene, renderer, controls, stats;

  let spheres = [];


  const clock = new THREE.Clock();

  useEffect(() => {
    const container = containerRef.current;

    // Renderer
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Camera
    camera = new THREE.PerspectiveCamera(40, width / height, 1, 1500000);
    camera.position.z = 0;
    camera.position.x = 100;
    camera.position.y = 0;

    // Scene
    scene = new THREE.Scene();
    // scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
     //scene.fog = new THREE.Fog(scene.background, 4000, 15000);
    // Define the colors for the nebula effect
    
    function createRandomGradient() {
      const colors = [];
      colors.push(new THREE.Color().setHSL(Math.random(), Math.random(), Math.random()));
      colors.push(new THREE.Color().setHSL(Math.random(), Math.random(), Math.random()));
      colors.push(new THREE.Color().setHSL(Math.random(), Math.random(), Math.random()));
      
    
      const colorStops = [0, 0.5, 1];
    
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    
      colors.forEach((color, i) => {
        gradient.addColorStop(colorStops[i], `rgb(${Math.floor(color.r * 255)}, ${Math.floor(color.g * 255)}, ${Math.floor(color.b * 255)})`);
      });
    
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    
      return new THREE.CanvasTexture(canvas);
    }

    // Geometry and Material
    const geometry1 = new THREE.BoxGeometry(800000,800000,800000, 2, 2, 2,)
    const material1 = new THREE.MeshBasicMaterial({ color: 0xc40233, specular: 0xffffff, metalness: 0.9 });
    

    const cube1 = new THREE.Mesh(geometry1, material1);
    cube1.position.set(150000, -600000, 0);

    scene.add(cube1);


     
    
    
   
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, specular: 0xffffff, metalness: 0.9 });

    const textureLoader = new THREE.TextureLoader();
    // const texture = textureLoader.load('@/components/textures/Planet_Avalon_1600-4227295053.jpg');

    // Objects in the scene


    const listener = new THREE.AudioListener();
    cube1.add(listener)
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('sounds/ambient.ogg', function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);wa

      sound.play();
    });
    function createRandomGeometry() {
      const geometries = [
        new THREE.BoxGeometry(100, 100, 100),
        new THREE.SphereGeometry(250
          , 12, 12),
        new THREE.TorusKnotGeometry(50, 20, 16, 100),
        new THREE.CylinderGeometry(50, 50, 100, 12),
        new THREE.ConeGeometry(50, 50, 10, 12)
        // Add more geometries here...
      ];

      return geometries[Math.floor(Math.random() * geometries.length)];
    }
    function spheresIntersect(sphere1, sphere2) {
  const distance = sphere1.position.distanceTo(sphere2.position);
  return distance < sphere1.geometry.parameters.radius + sphere2.geometry.parameters.radius;
}

// Function to generate a random non-intersecting position for a sphere
function generateNonIntersectingPosition(existingSpheres) {
  const position = new THREE.Vector3(
    80000 * (6.0 * Math.random() - 1.0),
    80000 * (6.0 * Math.random() - 1.0),
    80000 * (6.0 * Math.random() - 1.0)
  );

  // Check for intersections with existing spheres
  for (const sphere of existingSpheres) {
    if (spheresIntersect(sphere, { position, geometry: { parameters: { radius: 1000 } } })) {
      return generateNonIntersectingPosition(existingSpheres);
    }
  }

  return position;
}

    spheres = [];
    for (let i = 0; i < 600; i++) {
      const geometry = createRandomGeometry();
      const material = new THREE.MeshBasicMaterial({ map: createRandomGradient() });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        800000 * (6.0 * Math.random() - 1.0),
        800000 * (6.0 * Math.random() - 1.0),
        800000 * (6.0 * Math.random() - 1.0)
      );

      const scale = Math.random() * 100 + 10;
      mesh.scale.set(scale, scale, scale);

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.position.copy(generateNonIntersectingPosition(spheres));

       // Assign random song to each sphere

      spheres.push(mesh);
      scene.add(mesh);
    }
   
    

        
        
        // Ambient light to illuminate all objects in the scene
       
    ;
    //  const geometryStar = new THREE.BoxGeometry(20, 20, 20);
    // const materialStar = new THREE.MeshBasicMaterial({ color: 0xffffff, specular: 0xffffff, metalness: 0.9 });

    // for (let i = 0; i < 10000; i++) { // Change 10 to the desired number of cubes
    //   const star = new THREE.Mesh(geometryStar, materialStar);
    //   star.position.set(
    //     8000 * (12.0 * Math.random() - 1.0),
    //     8000 * (12.0 * Math.random() - 1.0),
    //     8000 * (12.0 * Math.random() - 1.0)
    //   );

    //   // star.rotation.set(
    //   //   Math.random() * Math.PI,
    //   //   Math.random() * Math.PI,
    //   //   Math.random() * Math.PI
    //   // );


    //   scene.add(star);
    // }
    
        


    // Controls
    controls = new FlyControls(camera, renderer.domElement);
    controls.movementSpeed = 150000;
    controls.domElement = renderer.domElement;
    controls.rollSpeed = Math.PI / 6;
    controls.autoForward = false;
    controls.dragToLook = true;

    // Stats
    stats = new Stats();
    container.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize);

    animate();


    return () => {
      // Clean up code if necessary
    };
  }, []);

  function onWindowResize() {
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }




  function animate() {
    const center = new THREE.Vector3(0, 0, 0);

    spheres.forEach((sphere, index) => {
      // Rotate the spheres
      sphere.rotation.y += 0.01;
  
      // Adjust the scaling factor for growth and shrinkage
      const scaleSpeed = 0.01; // Change this value to control the speed of scaling
      const minScale = 0.5;
      const maxScale = 2.0;
  
      // Calculate the scaling factor using a sine wave to create a pulsating effect
      const scaleFactor = Math.sin(Date.now() * scaleSpeed) * 0.5 + 10.0; // Adjust the factor to ensure the size remains positive
  
      // Apply the scaling factor to the sphere
      sphere.scale.set(minScale + scaleFactor * (maxScale - minScale), minScale + scaleFactor * (maxScale - minScale), minScale + scaleFactor * (maxScale - minScale));
    });




    renderer.render(scene, camera);


    requestAnimationFrame(animate);
    render();
    stats.update();




  }

  function render() {
    const delta = clock.getDelta();
    controls.update(delta);
    renderer.render(scene, camera);
  }

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default ThreeScene;
