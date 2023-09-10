<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

    let x;
    let scene;
    let camera;
    let model;

    function onKeyDown(e){
        if (e.key == "ArrowDown") {
            model.rotation.x -= 0.1;
        }
        if (e.key == "ArrowUp") {
            model.rotation.x += 0.1;
        }
        if (e.key == "ArrowLeft") {
            model.rotation.y -= 0.1;
        }
        if (e.key == "ArrowRight") {
            model.rotation.y += 0.1;
        }
    }

    onMount(()=>{
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        x.appendChild( renderer.domElement );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        const light = new THREE.AmbientLight( 0xffffff ); // soft white light
        scene.add( light );

        const loader = new GLTFLoader();

        loader.load( 'medieval/Models/tiles/square/gltf/square_forest_roadA_detail.gltf.glb', function ( gltf ) {
            model = gltf.scene;
            scene.add( gltf.scene );
            console.log(scene)
        }, undefined, function ( error ) {
            console.error( error );
        } );


        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }
        animate();
    })
</script>
<svelte:window on:keydown|preventDefault={onKeyDown} />
<div bind:this={x}></div>