import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { Scene } from 'three';

const ThreeScene = () => {
  const containerRef = useRef();
  let camera, scene, renderer, controls, stats;


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
    camera = new THREE.PerspectiveCamera(40, width / height, 1, 15000);
    camera.position.z = 0;
    camera.position.x = 100;
    camera.position.y = 0;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
    scene.fog = new THREE.Fog(scene.background, 4000, 15000);

    // Geometry and Material
    const geometry1 = new THREE.BoxGeometry(1000, 1000, 1000, 2, 2, 2,)
    const material1 = new THREE.MeshBasicMaterial({ color: 0xc40233, specular: 0xffffff, metalness: 0.9 });

    const cube1 = new THREE.Mesh(geometry1, material1);

    scene.add(cube1);




    const s = 250;
    const geometrymesh = new THREE.SphereGeometry(30, 30, 30);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, specular: 0xffffff, metalness: 0.9 });

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('@/components/textures/Planet_Avalon_1600-4227295053.jpg');

    // Objects in the scene


    const listener = new THREE.AudioListener();
    cube1.add(listener)
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('sounds/ambient.ogg', function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);

      sound.play();
    });



    for (let i = 0; i < 6000; i++) {
      const mesh = new THREE.Mesh(geometrymesh, new THREE.MeshBasicMaterial({ map: texture }));


      // Increase the range for positions to space them farther apart
      mesh.position.set(
        80000 * (2.0 * Math.random() - 1.0),
        80000 * (2.0 * Math.random() - 1.0),
        80000 * (2.0 * Math.random() - 1.0)
      );

      // Increase the scale of each cube to make them larger
      const scale = Math.random() * 50 + 10; // Adjust the range for larger cubes
      mesh.scale.set(scale, scale, scale);

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      scene.add(mesh);


    }

    ;
    const geometryStar = new THREE.BoxGeometry(20, 20, 20);
const materialStar = new THREE.MeshBasicMaterial({ color: 0xffffff, specular: 0xffffff, metalness: 0.9 });

for (let i = 0; i < 1000; i++) { // Change 10 to the desired number of cubes
  const star = new THREE.Mesh(geometryStar, materialStar);
  star.position.set(
    8000 * (2.0 * Math.random() - 1.0),
    8000 * (2.0 * Math.random() - 1.0),
    8000 * (2.0 * Math.random() - 1.0)
  );

  star.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  scene.add(star);
}



    // Controls
    controls = new FlyControls(camera, renderer.domElement);
    controls.movementSpeed = 15000;
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
    // mesh.forEach(cube => {
    //   mesh.rotation.x += 0.01; // Adjust the rotation speed as needed
    //   mesh.rotation.y += 0.01; // Adjust the rotation speed as needed
    // });
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
