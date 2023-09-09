<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';

    let x;
    let scene;
    let camera;

    function onKeyDown(e){
        if (e.key == "ArrowDown") {
            camera.position.y -= 0.1;
        }
        if (e.key == "ArrowUp") {
            camera.position.y += 0.1;
        }
        if (e.key == "ArrowLeft") {
            camera.position.x -= 0.1;
        }
        if (e.key == "ArrowRight") {
            camera.position.x += 0.1;
        }
    }

    onMount(()=>{
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        x.appendChild( renderer.domElement );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }
        animate();
    })
</script>
<svelte:window on:keydown|preventDefault={onKeyDown} />
<div bind:this={x}></div>