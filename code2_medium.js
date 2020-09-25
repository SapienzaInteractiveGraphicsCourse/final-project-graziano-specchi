import * as THREE from './three.module.js';

import { PointerLockControls } from './jsm/controls/PointerLockControls.js';
import {OBJLoader2} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/OBJLoader2.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/GLTFLoader.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/MTLLoader.js';
import {MtlObjBridge} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';
import {Dog} from './Dog.js';
import {FoxWalkTween} from './FoxWalk.js';
import {FoxWalkEscape} from './FoxWalk.js';

var camera, renderer, controls;

let scene = new THREE.Scene();


var objects = [];
let raycaster_mouse;
let current_color=0;
var raycaster;
let fox,fox2;

let tail;
let number_of_spawned_foxes = 0;
let foxes = []; 
let PROVVISORIO_INCREMENT=0;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var color = new THREE.Color();

let dog_increments_speed=3;
let tail_increment = [0.01,0.01,0.01];
let head_increment=0.01;
let first_time_clicked = false;
let left_top_arm_increment=0.01*dog_increments_speed;
let left_bottom_arm_increment=-0.02*dog_increments_speed;
let right_top_arm_increment=-0.01*dog_increments_speed;
let right_bottom_arm_increment=0.02*dog_increments_speed;

let left_top_leg_increment=0.01*dog_increments_speed;
let left_bottom_leg_increment=-0.02*dog_increments_speed;
let right_top_leg_increment=-0.01*dog_increments_speed;
let right_bottom_leg_increment=0.02*dog_increments_speed;
let torso_increment=0.01;
let walking_dog_initialized = false;
let walking_dog_compensate = false; 

let initial_head_increment=0.785;
let initial_left_top_arm_increment=-0.785;
let initial_left_bottom_arm_increment=1.15;
let initial_right_top_arm_increment=0.785;
let initial_right_bottom_arm_increment=1.15;
let initial_left_top_leg_increment=-0.785;
let initial_left_bottom_leg_increment=1.15;
let initial_right_top_leg_increment=0.785;
let initial_right_bottom_leg_increment=1.15;
let initial_torso_increment=0.01;
let tween = [];
let tweena=[];
let tweena2=[];
let fence=[];
let stick;
let aim;
let boh;
let dog;
let dog_scene=[];
let DOGS = 3;
let dogClassSpawn;
let time_since_beginning=0;
let floor_Id;
let difficulty_mode = "MEDIUM";
let light_mode = "DAY";
let sec = 0;
let penalty = 0;
let escaped = 0;
let game_over = false;
let farm_is_alone = false;
let FOX_FEAR_DISTANCE = 20;
let already_animating = false;
let night_mode = false;
let flame=[];
let prevTime = performance.now();
let game_finished = false;
const loadingManager = new THREE.LoadingManager();
let stick_animation_completed = false;
let millisec = 0;
let floorGeometry;
let floorTexture;
let floorMaterial;
let floor;
let windmill;
let well;
let chicken;
let dog_meshes = [];
let materials = [];
let geometries = [];
let textures = [];
// STUFF FOR LOADING PHASE
loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	
};

loadingManager.onLoad = function ( ) {
	document.getElementById("click_text").innerHTML = "CLICK TO PLAY! ";

};

loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
};

loadingManager.onError = function ( url ) {
};


var loader = new THREE.TextureLoader(loadingManager);



// FOR THE CLICKEVENT LISTENER
let once = {
	once : true
};


init();
initializeDogWalk(0);
initializeDogWalk(1);
initializeDogWalk(2);
animate();


let already_added_listener = false;

// FUNCTION USED TO EXPLORE THE INTERNAL STRUCTURE OF THE MODELS DOWNLOADED. FUNCTION TAKEN FROM https://threejsfundamentals.org/threejs/lessons/threejs-load-gltf.html
function dumpObject(obj, lines = [], isLast = true, prefix = '') {
    const localPrefix = isLast ? '└─' : '├─';
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child, ndx) => {
      const isLast = ndx === lastNdx;
      dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
}

let mesh;


function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

    var light = new THREE.HemisphereLight(0xffffff, 0xffffff ,1  );
    
    // IF NIGHT MODE, ADD 4 LIGHTS IN ORDER TO SIMULATE THE FIRE. OTHERWISE LET'S USE JUST THE HEMISPHERE ONE.
    if(night_mode){
		scene.background = new THREE.Color( 0x2a2a35 );
		scene.fog = new THREE.Fog( 0x2a2a35, 0, 150 );
			
		createFire(scene,137,0,143);
		createFlame(scene,137,0,143,400);
		light = new THREE.PointLight( 0xe25822, 1, 300 );
		light.position.set( 140,4,143 );
		light.castShadow = true;
		scene.add( light );
		
		createFire(scene,83,0,143);
		createFlame(scene,83,0,143,600);
		light = new THREE.PointLight( 0xe25822, 1, 300 );
		light.position.set( 80,4,143);
		light.castShadow = true;
		scene.add( light );
		
		
		createFire(scene,137,0,83);
		createFlame(scene,137,0,83,200);
		light = new THREE.PointLight( 0xe25822, 1, 300 );
		light.position.set( 137,4,83 );
		light.castShadow = true;
		scene.add( light );
		
		createFire(scene,83,0,83);
		createFlame(scene,83,0,83,350);
		light = new THREE.PointLight( 0xe25822, 1, 300 );
		light.position.set( 83,4,83 );
		light.castShadow = true;
		scene.add( light );
		light_mode = "NIGHT";
	}
	else{ 
		light.position.set( 0.5, 1, 1 );
		scene.add( light );
    	scene.background = new THREE.Color( 0xB2FFFF );
		scene.fog = new THREE.Fog( 0xFFFFFF, 0, 150 );
		light_mode = "DAY";

	}
	
	// FLOOR

    floorGeometry = new THREE.PlaneBufferGeometry( 1500, 1500, 100, 100 );
    floorGeometry.rotateX( - Math.PI / 2 ).translate(100,0,100);

    floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

    floorTexture = loader.load( 'resources/specchi_texture_grass.png' );
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 15, 15 );
    
    floorMaterial = new THREE.MeshPhongMaterial( { map: floorTexture } )
    floorMaterial.shadowSide  = THREE.DoubleSide;
	floorMaterial.flatShading = true;
	
    floor = new THREE.Mesh( floorGeometry, floorMaterial );
    materials.push(floorMaterial);
    geometries.push(floorGeometry);
    floor_Id = floor.id;
    scene.add( floor );
	
	// CREATE THE WHITE AIM
	createAimGLB();
    scene.frustumCulled = false

	// THE SQUARE FENCE IS BUILT AT RUNTIME
    createFence(scene,fence,0,100  ,0,90,"NORTH");

    createFence(scene,fence,1,112.9,0,90,"NORTH");

    createFence(scene,fence,2,125.8,0,90,"NORTH");

    createFence(scene,fence,3,125.8,0,90,"SOUTH");
    
    createFence(scene,fence,4,125.8,0,102.9,"SOUTH");

    createFence(scene,fence,5,125.6,0,115.8,"SOUTH");

    createFence(scene,fence,6,125.8,0,130.7,"WEST");
    
    createFence(scene,fence,7,112.9,0,130.7,"WEST");

    createFence(scene,fence,8,100.0,0,130.7,"WEST");

    createFence(scene,fence,9,92.8,0,123.2,"EAST");
    
    createFence(scene,fence,10,92.8,0,110.3,"EAST");

    createFence(scene,fence,11,92.8,0,97.4,"EAST");
	
	// CREATE THE TREES FAR
	createTree(scene,-30,20,350);
	createTree(scene,-30,20,-350);
	createTree(scene,-350,20,30);
	createTree(scene,+350,20,-20);
	
	// CREATE WINDMILL AND CORRESPONDING TWEEN
	createWindmillGLB(scene,50,-40,250);
	
	    // SPAWN THE 3 DOGS INTO THE FENCE
    spawnDog(115,2.5,115, -Math.PI/3, 1,0);
    spawnDog(112.5,5.4,110,-Math.PI/4,2,1);
    spawnDog(98, 7,103, -Math.PI,3,2);

	// CREATE THE CHICKEN
	createChicken(scene, 105,0.2,100);
	
	// CREATE THE STICK 
	createStickGLB(scene,camera);

	// CREATE THE WELL
	createWell();

	// STARTUP THE CONTROLS AND POSITION THE CAMERA
    controls = new PointerLockControls( camera, document.body );
    controls.getObject().position.x=+35;
    controls.getObject().position.z=0;
    controls.getObject().position.y=10;
    controls.getObject().rotation.y=Math.PI;
    var blocker = document.getElementById( 'blocker' );
    var instructions = document.getElementById( 'instructions' );
	first_time_clicked = false;

	// THIS LISTENER IS RE-ADDED ONLY AFTER THE STICK HAS FINISHED ITS ANIMATION, OR IF THE USER PRESS ESC AND CLICK THE MOUSE AGAIN.
	window.addEventListener("click", clickListener , once);
	
	
	
    controls.addEventListener( 'lock', function () {

        instructions.style.display = '';
        blocker.style.display = 'none';

    } );

    controls.addEventListener( 'unlock', function () {

        blocker.style.display = 'block';
        instructions.style.display = '';
   		window.addEventListener("click", recoveryClickListener , once);		


    } );
    
    scene.add( controls.getObject() );
    

	// RAYCASTER
    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
    raycaster_mouse = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}


let initial_time=undefined;
let spawned = false;
var intervalID;

var mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}


function animate() {
	
	// CHECK IF THE GAME IS OVER AND IF IT SO , CHANGE THE DOCUMENT CONTENT
	if (sec >60 || game_over || farm_is_alone || game_finished) {
	  document.exitPointerLock();
	  document.removeEventListener('click', clickListener, false);
	  window.removeEventListener('click', clickListener, false);
	  window.removeEventListener('click', recoveryClickListener, false);
	  window.addEventListener("click", function(){},once);
	  document.addEventListener("click", function(){},once);
	  document.getElementById("time").innerHTML = "</h2><a href='index.html'> Restart</a></span>";

	  if (game_over){
		window.open("","_self");
		window.document.write("<!DOCTYPE html><html lang='en'>	<head>		<title>Farm Defender</title>		<meta charset='utf-8'>		<style>			body {				background-image: url('./resources/index_im.png');				background-repeat: no-repeat;				background-size:cover;			}			#blocker {				position: absolute;				width: 100%;				height: 100%;				background-color: rgba(0,0,0,0.5);			}			#instructions {				width: 100%;				height: 100%;				display: -webkit-box;				display: -moz-box;				display: box;				-webkit-box-orient: horizontal;				-moz-box-orient: horizontal;				box-orient: horizontal;				-webkit-box-pack: center;				-moz-box-pack: center;				box-pack: center;				-webkit-box-align: center;				-moz-box-align: center;				box-align: center;				color: #ffffff;				text-align: center;				font-family: Arial;				font-size: 14px;				line-height: 24px;				cursor: pointer;			}		</style>	</head>	<body>        <div id='time' align='center' valign='top' style='color:red;font-size:40px;'>Farm Defender Game</div>        <h1 align='center'>A FOX REACHED THE FARM!</h1><h2 align='center'> Score: "+Math.floor((escaped+penalty+(-sec/100))*100)+"</h2> <div align='center'><a href='index.html'> Restart</a></div> 	</body></html>");
	  }
	  else if (farm_is_alone) {
		window.open("","_self");
		window.document.write("<!DOCTYPE html><html lang='en'>	<head>		<title>Farm Defender</title>		<meta charset='utf-8'>		<style>			body {				background-image: url('./resources/index_im.png');				background-repeat: no-repeat;				background-size:cover;			}			#blocker {				position: absolute;				width: 100%;				height: 100%;				background-color: rgba(0,0,0,0.5);			}			#instructions {				width: 100%;				height: 100%;				display: -webkit-box;				display: -moz-box;				display: box;				-webkit-box-orient: horizontal;				-moz-box-orient: horizontal;				box-orient: horizontal;				-webkit-box-pack: center;				-moz-box-pack: center;				box-pack: center;				-webkit-box-align: center;				-moz-box-align: center;				box-align: center;				color: #ffffff;				text-align: center;				font-family: Arial;				font-size: 14px;				line-height: 24px;				cursor: pointer;			}		</style>	</head>	<body>        <div id='time' align='center' valign='top' style='color:red;font-size:40px;'>Farm Defender Game</div>        <h1 align='center'>YOU LEFT ANIMALS ALONE!</h1><h2 align='center'> Score: "+Math.floor((escaped+ penalty+(-sec/100))*100)+"</h2> <div align='center'><a href='index.html'> Restart</a></div> 	</body></html>");

	  }
	  else if (sec>60){
		window.open("","_self");
		window.document.write("<!DOCTYPE html><html lang='en'>	<head>		<title>Farm Defender</title>		<meta charset='utf-8'>		<style>			body {				background-image: url('./resources/index_im.png');				background-repeat: no-repeat;				background-size:cover;			}			#blocker {				position: absolute;				width: 100%;				height: 100%;				background-color: rgba(0,0,0,0.5);			}			#instructions {				width: 100%;				height: 100%;				display: -webkit-box;				display: -moz-box;				display: box;				-webkit-box-orient: horizontal;				-moz-box-orient: horizontal;				box-orient: horizontal;				-webkit-box-pack: center;				-moz-box-pack: center;				box-pack: center;				-webkit-box-align: center;				-moz-box-align: center;				box-align: center;				color: #ffffff;				text-align: center;				font-family: Arial;				font-size: 14px;				line-height: 24px;				cursor: pointer;			}		</style>	</head>	<body>        <div id='time' align='center' valign='top' style='color:red;font-size:40px;'>Farm Defender Game</div>        <h1 align='center'>YOU SAVED THE CHICKEN!</h1><h2 align='center'> Score: "+Math.floor((escaped+penalty+(-sec/100))*100)+"</h2> <div align='center'><a href='index.html'> Restart</a></div> 	</body></html>");

	  }else{
		window.open("","_self");
		window.document.write("<!DOCTYPE html><html lang='en'>	<head>		<title>Farm Defender</title>		<meta charset='utf-8'>		<style>			body {				background-image: url('./resources/index_im.png');				background-repeat: no-repeat;				background-size:cover;			}			#blocker {				position: absolute;				width: 100%;				height: 100%;				background-color: rgba(0,0,0,0.5);			}			#instructions {				width: 100%;				height: 100%;				display: -webkit-box;				display: -moz-box;				display: box;				-webkit-box-orient: horizontal;				-moz-box-orient: horizontal;				box-orient: horizontal;				-webkit-box-pack: center;				-moz-box-pack: center;				box-pack: center;				-webkit-box-align: center;				-moz-box-align: center;				box-align: center;				color: #ffffff;				text-align: center;				font-family: Arial;				font-size: 14px;				line-height: 24px;				cursor: pointer;			}		</style>	</head>	<body>        <div id='time' align='center' valign='top' style='color:red;font-size:40px;'>Farm Defender Game</div>        <h1 align='center'>WHY DID YOU EXIT? TRY AGAIN!</h1><h2 align='center'> Score: "+Math.floor((escaped+penalty+(-sec/100))*100)+"</h2> <div align='center'><a href='index.html'> Restart</a></div> 	</body></html>");
	  }
	   
	  clearInterval(intervalID);
	  clearInterval(checkFoxesIntervalID);
	  clearInterval(countTimeIntervalID);
	  floorGeometry.dispose();
	  floorMaterial.dispose();
	  floorTexture.dispose();
	  		
	  geometries.forEach(function (item, index, array){
		  item.dispose();
	  });
	  
	  materials.forEach(function (item, index, array){
		  item.dispose();
	  });
	    
	  dog_meshes.forEach(function (item, index, array){
		  scene.remove(item);
		  item.children.forEach(function (item, index, array){
			item.material.forEach(function (item, index, array){
				item.dispose();
			});
		  });
		  item.material.forEach(function (item, index, array){
			  item.dispose();
		  });
	  });
	  scene.remove(floor);
	  scene.remove(windmill);
	  scene.remove(well);
	  scene.remove(chicken);
	  
	  return;
	}else{
		document.getElementById("time").innerHTML = "<span id='border_text' style='font-family: Impact; font-size: 1vw; color:#00FF00'>   Time elapsed: " + sec + " sec" + "&nbsp&nbsp&nbsp Diff: " + difficulty_mode + "&nbsp&nbsp&nbsp Mode: " + light_mode + "&nbsp&nbsp&nbsp Estimated Score: " + Math.floor((escaped+penalty+(-sec/100))*100) + "</span>";
	}

    if ( controls.isLocked === true ) {
		checkCameraPosition();


		var time = performance.now();

		if(initial_time==undefined){
			initial_time=time;
		}
		let time_elapsed = time-initial_time;

        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 2;

        var intersections = raycaster.intersectObjects( objects );
        var onObject = intersections.length > 0;

        var delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
		// LET'S AVOID BUGS 
		if(velocity.x > 25) velocity.x=25;
		if(velocity.x < -25) velocity.x=-25;
		if(velocity.z > 25) velocity.z=25;
		if(velocity.z < -25) velocity.z=-25;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
		
		//LET'S AVOI BUGS AGAIN
		let move_x = - velocity.x*delta;
		let move_y =   velocity.y*delta;
		let move_z = - velocity.z*delta;
		
		
		if(move_x > 2) move_x=2;
		if(move_x < -2) move_x=-2;
		if(move_y > 2) move_y=2;
		if(move_y < -2) move_y=-2;
		if(move_z > 2) move_z=2;
		if(move_z < -2) move_z=-2;
		
		
		
        controls.moveRight( move_x);
        controls.moveForward( move_z );

        controls.getObject().position.y += ( move_y ); 

        if ( controls.getObject().position.y < 10 ) {

            velocity.y = 0;
            controls.getObject().position.y = 10;

            canJump = true;

        }

		// THE ANIMATION OF THE DOGS IS MADE BY HAND (i.e. without using tween.js)
		for (var i=0; i<DOGS; i++){
           dogWalk(i);
        };

        prevTime = time;

    }else{
		prevTime = performance.now();
	}

	// THE ANIMATION OF THE FOXES IS MADE BY USING TWEEN.JS
    TWEEN.update();

    renderer.render( scene, camera );
    requestAnimationFrame( animate );

}



		
		
		
function spawnDog(x,y,z,theta,scaling, dog_number){
    dogClassSpawn = new Dog();
    dog = dogClassSpawn.dog;
    for ( var i = 0; i < dogClassSpawn.numNodes; i++){
	  dog_meshes.push(dog[i]);
      scene.add(dog[i]);
	}

      //ATTACH
    dog[dogClassSpawn.body_Id].attach(dog[dogClassSpawn.big_body_Id]);
    dog[dogClassSpawn.body_Id].attach(dog[dogClassSpawn.tail_Id]);
    dog[dogClassSpawn.big_body_Id].attach(dog[dogClassSpawn.head_Id]);
    dog[dogClassSpawn.head_Id].attach(dog[dogClassSpawn.nose_Id])
    dog[dogClassSpawn.head_Id].attach(dog[dogClassSpawn.ear_left_Id])
    dog[dogClassSpawn.head_Id].attach(dog[dogClassSpawn.ear_right_Id])

    dog[dogClassSpawn.body_Id].attach(dog[dogClassSpawn.left_leg_top_Id]);
    dog[dogClassSpawn.left_leg_top_Id].attach(dog[dogClassSpawn.left_leg_bottom_Id]);
    dog[dogClassSpawn.body_Id].attach(dog[dogClassSpawn.right_leg_top_Id]);
    dog[dogClassSpawn.right_leg_top_Id].attach(dog[dogClassSpawn.right_leg_bottom_Id]);

    dog[dogClassSpawn.big_body_Id].attach(dog[dogClassSpawn.left_arm_top_Id]);
    dog[dogClassSpawn.big_body_Id].attach(dog[dogClassSpawn.right_arm_top_Id]);
    dog[dogClassSpawn.left_arm_top_Id].attach(dog[dogClassSpawn.left_arm_bottom_Id]);
    dog[dogClassSpawn.right_arm_top_Id].attach(dog[dogClassSpawn.right_arm_bottom_Id]);
  
        //POSITION
    dog[dogClassSpawn.left_arm_top_Id].setRotationFromEuler(new THREE.Euler(1.57,0,0, 'XYZ'));
    dog[dogClassSpawn.right_arm_top_Id].setRotationFromEuler(new THREE.Euler(1.57,0,0, 'XYZ'));
    dog[dogClassSpawn.left_leg_top_Id].setRotationFromEuler(new THREE.Euler(1.57,0,0, 'XYZ'));
    dog[dogClassSpawn.right_leg_top_Id].setRotationFromEuler(new THREE.Euler(1.57,0,0, 'XYZ'));


    for(const child of dog[dogClassSpawn.big_body_Id].children){
        child.translateZ(0.5);
    }

    dog[dogClassSpawn.tail_Id].rotation.x = +Math.PI/4;
    dog[dogClassSpawn.body_Id].position.x = x;
    dog[dogClassSpawn.body_Id].position.z = z;
    dog[dogClassSpawn.body_Id].position.y = y;
    dog[dogClassSpawn.body_Id].rotation.x = -Math.PI/2;
    dog[dogClassSpawn.body_Id].rotation.z = theta;
    dog[dogClassSpawn.body_Id].scale.set(scaling,scaling,scaling);

    dog_scene[dog_number]=dog;
    dog_scene[dog_number][dogClassSpawn.head_Id].setRotationFromEuler(new THREE.Euler(1.47,0,0, 'XYZ'));

  }


  function initializeDogWalk(dog_number){
    // ARMS MOVEMENT
    dog_scene[dog_number][dogClassSpawn.left_arm_top_Id].rotateX(initial_left_top_arm_increment);
    dog_scene[dog_number][dogClassSpawn.right_arm_top_Id].rotateX(initial_right_top_arm_increment);
    dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].rotateX(initial_left_bottom_arm_increment);
    dog_scene[dog_number][dogClassSpawn.right_arm_bottom_Id].rotateX(initial_right_bottom_arm_increment);
    dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].translateZ(-0.05);  
    dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].translateY(0.25);
    dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].translateY(-0.05);  
    dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].translateZ(0.25);   
    dog_scene[dog_number][dogClassSpawn.right_leg_bottom_Id].translateY(-0.15);  

    // LEGS MOVEMENT
    dog_scene[dog_number][dogClassSpawn.left_leg_top_Id].rotateX(initial_left_top_leg_increment);
    dog_scene[dog_number][dogClassSpawn.right_leg_top_Id].rotateX(initial_right_top_leg_increment);
    dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].rotateX(initial_left_bottom_leg_increment);
    dog_scene[dog_number][dogClassSpawn.right_leg_bottom_Id].rotateX(initial_right_bottom_leg_increment);
  }




  //    ----------- DOG WALK -------------------------


  function dogWalk(dog_number){
    let current_dog_head_x = dog_scene[dog_number][dogClassSpawn.head_Id].rotation.x;
    let current_dog_tail_y = dog_scene[dog_number][dogClassSpawn.tail_Id].rotation.y;
    let current_arm_x=dog_scene[dog_number][dogClassSpawn.left_arm_top_Id].rotation.x;
    let current_leg_x=dog_scene[dog_number][dogClassSpawn.left_leg_top_Id].rotation.x;

    if(current_dog_head_x>1.6  || current_dog_head_x<1.2 ){
        head_increment = -head_increment;
        if(current_dog_head_x+head_increment>1.6  || current_dog_head_x+head_increment<1.2)
            head_increment = -head_increment;
    }
    
    if(current_dog_tail_y>0.5 || current_dog_tail_y<-0.5 ){
        tail_increment[dog_number] = -tail_increment[dog_number];
    }

    if(current_arm_x>1.85  || current_arm_x<1.35 ){
        left_top_arm_increment = -left_top_arm_increment;
        right_top_arm_increment = -right_top_arm_increment;
        left_bottom_arm_increment = -left_bottom_arm_increment;
        right_bottom_arm_increment = -right_bottom_arm_increment;
        
        //LEG
        left_top_leg_increment = -left_top_leg_increment;
        right_top_leg_increment = -right_top_leg_increment;
        left_bottom_leg_increment = -left_bottom_leg_increment;
        right_bottom_leg_increment = -right_bottom_leg_increment;

        // Se al prossimo passo sto fuori, lasciami continuare con il vecchio segno
        if(current_arm_x+left_top_arm_increment>1.85 || current_arm_x+left_top_arm_increment<1.35){
            left_top_arm_increment = -left_top_arm_increment;
            right_top_arm_increment = -right_top_arm_increment;
            left_bottom_arm_increment = -left_bottom_arm_increment;
            right_bottom_arm_increment = -right_bottom_arm_increment;
            //LEG
            left_top_leg_increment = -left_top_leg_increment;
            right_top_leg_increment = -right_top_leg_increment;
            left_bottom_leg_increment = -left_bottom_leg_increment;
            right_bottom_leg_increment = -right_bottom_leg_increment;
        }else{
            walking_dog_initialized=true;
        }


    }

    // AVOID TRANSLATION OFFSET MISTAKES FOR BOTTOM ARMS & LEGS
    // translation Y
    if(dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].position.y<-0.92){
        dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].position.set (dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].position.x , -0.9, dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].position.z);
    }

    if(dog_scene[dog_number][dogClassSpawn.right_arm_bottom_Id].position.y<-0.92){
		dog_scene[dog_number][dogClassSpawn.right_arm_bottom_Id].position.set(dog_scene[dog_number][dogClassSpawn.right_arm_bottom_Id].position.x, -0.9, dog_scene[dog_number][dogClassSpawn.right_arm_bottom_Id].position.z);
    }
    
    if(dog_scene[dog_number][dogClassSpawn.right_leg_bottom_Id].position.y<-0.92){
		dog_scene[dog_number][dogClassSpawn.right_leg_bottom_Id].position.set(dog_scene[dog_number][dogClassSpawn.right_leg_bottom_Id].position.x, -0.9, dog_scene[dog_number][dogClassSpawn.right_leg_bottom_Id].position.z);
    }

    if(dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].position.y<-0.92){
        dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].position.set (dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].position.x , -0.9, dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].position.z);
    }

    // translation Z
    if(dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].position.z>0.05){
        dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].position.set (dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].position.x , dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].position.y, 0.05);
    }

    if(dog_scene[dog_number][dogClassSpawn.right_arm_bottom_Id].position.z>0.20){
		dog_scene[dog_number][dogClassSpawn.right_arm_bottom_Id].position.set(dog_scene[dog_number][dogClassSpawn.right_arm_bottom_Id].position.x, dog_scene[dog_number][dogClassSpawn.right_arm_bottom_Id].position.y, 0.2);
    }
    
    if(dog_scene[dog_number][dogClassSpawn.right_leg_bottom_Id].position.z>0.20){
		dog_scene[dog_number][dogClassSpawn.right_leg_bottom_Id].position.set(dog_scene[dog_number][dogClassSpawn.right_leg_bottom_Id].position.x, dog_scene[dog_number][dogClassSpawn.right_leg_bottom_Id].position.y, 0.2);
    }

    if(dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].position.z>0.05){
        dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].position.set (dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].position.x , dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].position.y , 0.05);
    }

    if(walking_dog_initialized){
        if(left_top_arm_increment>0 ){
            dog_scene[dog_number][dogClassSpawn.right_arm_bottom_Id].translateZ(0.005);  
            dog_scene[dog_number][dogClassSpawn.right_leg_bottom_Id].translateZ(0.005);  
            dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].translateZ(0.005);  
            dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].translateZ(0.005);  
        }else{
            dog_scene[dog_number][dogClassSpawn.right_arm_bottom_Id].translateZ(-0.005);  
            dog_scene[dog_number][dogClassSpawn.right_leg_bottom_Id].translateZ(-0.005);  
            dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].translateZ(-0.005);  
            dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].translateZ(-0.005);     
        }
    }

    // HEAD MOVEMENT
    dog_scene[dog_number][dogClassSpawn.head_Id].rotateX(head_increment);
    // TAIL MOVEMENT
    dog_scene[dog_number][dogClassSpawn.tail_Id].rotateY(tail_increment[dog_number]);

     //ARMS MOVEMENT
    dog_scene[dog_number][dogClassSpawn.left_arm_top_Id].rotateX(left_top_arm_increment);
    dog_scene[dog_number][dogClassSpawn.right_arm_top_Id].rotateX(right_top_arm_increment);
    dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].rotateX(left_bottom_arm_increment);
    dog_scene[dog_number][dogClassSpawn.right_arm_bottom_Id].rotateX(right_bottom_arm_increment);

    // LEGS MOVEMENT
    dog_scene[dog_number][dogClassSpawn.left_leg_top_Id].rotateX(left_top_leg_increment);
    dog_scene[dog_number][dogClassSpawn.right_leg_top_Id].rotateX(right_top_leg_increment);
    dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].rotateX(left_bottom_leg_increment);
    dog_scene[dog_number][dogClassSpawn.right_leg_bottom_Id].rotateX(right_bottom_leg_increment);
    dog_scene[dog_number][dogClassSpawn.body_Id].translateY(0.005);          

 
}


function createFence(scene,fence,i,x,y,z,side){
    const mtlLoader = new MTLLoader(loadingManager);
    mtlLoader.load('fence/13076_Gothic_Wood_Fence_Panel_v2_l3.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2(loadingManager);
        const materials_fence =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        
        objLoader.addMaterials(materials_fence);
        objLoader.load('fence/13076_Gothic_Wood_Fence_Panel_v2_l3.obj', (root) => {
			// For dispose at the end of the game.

			fence[i]=root;
			// FENCE STUFF
			fence[i].rotation.x=-Math.PI/2;
			fence[i].scale.set(0.07,0.07,0.07);
			fence[i].position.set(x,y,z);
			if(side=="SOUTH"){
				fence[i].rotation.z=-Math.PI*(1.5);
				fence[i].position.set(x+7.5,y,z+7.2);
			}
			if(side=="NORTH"){
				fence[i].rotation.z=-Math.PI;
			}

			if(side=="EAST"){

				fence[i].rotation.z=-Math.PI/2;
			}
			scene.add(root);
        });
    });
}



function createFire(scene,x,y,z){
    const mtlLoader = new MTLLoader(loadingManager);
    mtlLoader.load('resources/Fire/Bonfire model 1.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2(loadingManager);
        const materials_fire =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        objLoader.addMaterials(materials_fire);
        objLoader.load('resources/Fire/Bonfire model 1.obj', (root) => {
			
			// For dispose at the end of the game.
			root.children[0].material.forEach(function (item,index,array){
				materials.push(item);
			});
			geometries.push(root.children[0].geometry);
			
			root.scale.set(2,2,2);
			root.position.set(x,y,z);
			scene.add(root);
        });
    });
}


function createTree(scene,x,y,z){
    const mtlLoader = new MTLLoader(loadingManager);
    mtlLoader.load('tree/lowpolytree.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2(loadingManager);
        const materials_tree =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        objLoader.addMaterials(materials_tree);
        objLoader.load('tree/lowpolytree.obj', (root) => {
			//root.rotation.x=-Math.PI/3;
			
			// For dispose at the end of the game.
			geometries.push(root.children[0].geometry);
			
			
			root.scale.set(15 ,15 ,15);
			root.position.set(x,y,z);
			scene.add(root);
		});
    });
}
function createChicken(scene,x,y,z){
    const mtlLoader = new MTLLoader(loadingManager);
    mtlLoader.load('resources/cooked/11559_Cooked_Turkey_v1_l3.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2(loadingManager);
        const materials_tree =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        objLoader.addMaterials(materials_tree);
        objLoader.load('resources/cooked/11559_Cooked_Turkey_v1_l3.obj', (root) => {
			root.rotation.x= -Math.PI/2;
			// For dispose at the end of the game.
			geometries.push(root.children[0].geometry);
			chicken=root;
			
			root.scale.set(0.15 ,0.15 ,0.15);
			root.position.set(x,y,z);
			scene.add(root);
		});
    });
}


function createWindmillGLB(scene,x,y,z){
	const gltfLoader = new GLTFLoader(loadingManager);
	gltfLoader.load('resources/windmill01/scene.gltf', (gltf) => {
		const root = gltf.scene;
		windmill = root;
		root.scale.set(0.05,0.05,0.05);
		root.position.set(x,y+20,z); // x is longitude (positive left), y is height, z is depth.
		let pale = root.getObjectByName('Windmill_Blades01');
		let tween_pale = new TWEEN.Tween(pale.rotation).to({x: pale.rotation.x, y: pale.rotation.y, z:  pale.rotation.z+10000}, 2000000).repeat(Infinity).start();
		
		scene.add(root);

    });
}

function spawnFox(){


	const gltfLoader = new GLTFLoader();
	gltfLoader.load('fox/scene.gltf', (gltf) => {
		
		let random_side = Math.random()*4;
		var minX = 0;
		var maxX = 0;
		var minZ = 0;
		var maxZ = 0;
		let side="EAST";
		if(random_side <1){ // SOUTH
			side = "SOUTH";
			minX = 97;
			maxX = 130;
			maxZ = -5; // I don't want the fox to be spawned too close to the fence. -----> min. offset = 100
			minZ = -100;
		}
		else if(random_side >1 && random_side<2){ // WEST
			side = "WEST";
			minX = 232; // I don't want the fox to be spawned too close to the fence.
			maxX = 300;
			maxZ = 130;
			minZ = 95;
		}
		else if(random_side >2 && random_side<3){ // NORTH
			side = "NORTH";
			minX = 97; 
			maxX = 130;
			maxZ = 350;
			minZ = 230;// I don't want the fox to be spawned too close to the fence.
		}
		else{ // EAST
			minX = -105; 
			maxX = -5;// I don't want the fox to be spawned too close to the fence.
			maxZ = 130;
			minZ = 95;
		}
		
		var random_x = Math.random() * (+maxX - +minX) + +minX;
		var random_z = Math.random() * (+maxZ - +minZ) + +minZ;
		
		let initial_rotation = 0;
		if (side== "WEST"){
			initial_rotation = -Math.PI/2;
		}else if(side=="EAST"){
			initial_rotation = Math.PI/2;
		}else if(side=="NORTH"){
			initial_rotation = Math.PI;
		}

		////console.log("SPAWNED:",side,random_side);	
		const root = gltf.scene;
		root.scale.set(0.18,0.12,0.12);
		let distance = 200;

		root.position.set(random_x,-2,random_z);
		root.rotation.set(0,initial_rotation,0);
		FoxWalkTween(root, distance, side);

		scene.add(root);
		
		
		scene.traverse( function( object ) {
			object.frustumCulled = false;
			if(object.isMesh && object.name!="Torus001") object.material.transparent = false; 
		});
	});
		
}



function createStickGLB(){
	const gltfLoader = new GLTFLoader(loadingManager);
	gltfLoader.load('resources/ramo.glb', (gltf) => {
		const root = gltf.scene;
		stick = root;
		stick.rotation.x=+Math.PI/4;
		stick.scale.set(1.07,1.07,1.07);
		stick.position.set(33,10,1); // x is longitude (positive left), y is height, z is depth.
		scene.add(stick);
		camera.attach(stick);

	});		
}

function createWell(){
	const gltfLoader = new GLTFLoader(loadingManager);
	gltfLoader.load('resources/pozzo.glb', (gltf) => {
		const root = gltf.scene;
		well = root;
		//root.rotation.x=+Math.PI/4;
		root.scale.set(1.07,1.07,1.07);
		root.position.set(-70,2,310); // x is longitude (positive left), y is height, z is depth.
		scene.add(root);
	});		
}

function createFlame(scene, x, y, z, flameDelay){
	const gltfLoader = new GLTFLoader(loadingManager);
	gltfLoader.load('resources/bomberman_fire/scene.gltf', (gltf) => {
		const root = gltf.scene;
		root.scale.set(0.03, 0.03, 0.03);
		root.position.set(x, y, z);
		let tween_fire = new TWEEN.Tween(root.rotation).to({x: root.rotation.x, y: root.rotation.y+Math.PI/6, z:  root.rotation.z}, 100);
		tween_fire.repeat(Infinity).yoyo(true).repeatDelay(flameDelay/2).start();
		tween_fire = new TWEEN.Tween(root.scale).to({x: root.scale.x, y: root.scale.y+0.007, z:  root.scale.z}, 100);
		tween_fire.repeat(Infinity).yoyo(true).repeatDelay(flameDelay).delay(500).start();
		scene.add(root);
	});
}

function createAimGLB(){
	const gltfLoader = new GLTFLoader(loadingManager);
	gltfLoader.load('resources/Mirino.glb', (gltf) => {
		const root = gltf.scene;
		root.children[2].material.opacity = 0.2;
		root.children[2].material.transparent = true;
		
		var aim_material = new THREE.MeshBasicMaterial();
		root.children[2].material = aim_material;
		
		root.children[2].material.opacity = 0.2;
		root.children[2].material.transparent = true;

		aim = root;
		aim.rotation.x=+Math.PI/2;
		aim.scale.set(0.2,0.2,0.2);//(0.2, 0.2, 0.2);
		aim.position.set(35,10,2); // x is longitude (positive left), y is height, z is depth.
		scene.add(aim);
		camera.attach(aim);

	});		
	
	// CREATE ALSO THE SMALLER ONE AT THE CENTER
	gltfLoader.load('resources/Mirino.glb', (gltf) => {
		const root = gltf.scene;
		root.children[2].material.opacity = 0.2;
		root.children[2].material.transparent = true;
				
		var aim_material = new THREE.MeshBasicMaterial();
		root.children[2].material = aim_material;
		
		root.children[2].material.opacity = 0.2;
		root.children[2].material.transparent = true;
		aim = root;
		aim.rotation.x=+Math.PI/2;
		aim.scale.set(0.05,0.05,0.05);//(0.2, 0.2, 0.2);
		
		aim.position.set(35,10,2); // x is longitude (positive left), y is height, z is depth.
		scene.add(aim);
		camera.attach(aim);

	});		
}

function animateStick( stick ){
	let tween_stick = new TWEEN.Tween(stick.rotation).to({x: stick.rotation.x-Math.PI/3, y: stick.rotation.y, z:  stick.rotation.z-Math.PI/4}, 300);
    tween_stick.repeat(1).yoyo(true).onComplete(function (object) {
		// ONCE THE STICK ANIMATION IS OVER, THEN ADD AGAIN THE CLICK LISTENER
		window.addEventListener("click", clickListener , once);
		stick_animation_completed = true;
	}).start();    
}

function checkFoxesPosition(){
	scene.children.forEach(function (item, index, array) {
		//console.log(item);
		if(item.name == "OSG_Scene" && item.children[0].children[0].children[0].children[0].children[0].children[0].children[3] != undefined){
			// IF THE FOX IS CLOSE TO THE FENCE, THE GAME IS OVER.
			if ( item.position.x>85 && item.position.x<140 && item.position.z>80 && item.position.z<140){
				game_over = true;
			}
			// IF THE FOX IS ESCAPED, REMOVE IT SO TO SAVE MEMORY
			if (item.children[0].children[0].children[0].children[0].children[0].children[0].children[3].skeleton.bones[0].position.x == 2000 ){

				// clean up

				item.children[0].children[0].children[0].children[0].children[0].children[0].children[3].geometry.dispose();
				item.children[0].children[0].children[0].children[0].children[0].children[0].children[3].material.dispose();
				scene.remove( item );


			}		
		}
	});
}

var checkFoxesIntervalID = setInterval(checkFoxesPosition, 500);
	
// UPDATE THE COUNTER ONLY IF THE USER IS PLAYING
var countTimeIntervalID = setInterval(function() {

	if(controls.isLocked === true) sec+=1;
	
}, 1000);


let prev_pos;
function checkCameraPosition(){// REALIZZARLA CON IL TIMEOUT
	
	if ( controls.getObject().position.x>300 || controls.getObject().position.x<-300 || controls.getObject().position.z>300 || controls.getObject().position.z<-300){
		farm_is_alone = true;
	}
	// CHECK FENCE
	//south
	if ( controls.getObject().position.x>93 && controls.getObject().position.x < 133 && controls.getObject().position.z>90 && controls.getObject().position.z < 100){
		controls.getObject().position.set(controls.getObject().position.x,10, 89.8);
	}
	
	//north
	if ( controls.getObject().position.x>93 && controls.getObject().position.x < 133 && controls.getObject().position.z>121 && controls.getObject().position.z < 131){
		controls.getObject().position.set(controls.getObject().position.x,10, 131.2);
	}
	//east
	if ( controls.getObject().position.x>93 && controls.getObject().position.x < 103 && controls.getObject().position.z>90 && controls.getObject().position.z < 131){
		controls.getObject().position.set(92.8 ,10, controls.getObject().position.z);
	}
	
	//west
	if ( controls.getObject().position.x>123 && controls.getObject().position.x < 133 && controls.getObject().position.z>90 && controls.getObject().position.z < 131){
				controls.getObject().position.set(133.2 ,10, controls.getObject().position.z);
	}
	
	
	// CHECK WINDMILL
		//south
	if ( controls.getObject().position.x>19 && controls.getObject().position.x < 80 && controls.getObject().position.z>215 && controls.getObject().position.z < 230){
		controls.getObject().position.set(controls.getObject().position.x,10, 214.5);
	}
	
	//north
	if ( controls.getObject().position.x>19 && controls.getObject().position.x < 80 && controls.getObject().position.z >255 && controls.getObject().position.z < 295){
		controls.getObject().position.set(controls.getObject().position.x,10, 295.5);
	}
	
	if ( controls.getObject().position.x>18 && controls.getObject().position.x < 29 && controls.getObject().position.z>215 && controls.getObject().position.z < 285){
		controls.getObject().position.set(18.5 ,10, controls.getObject().position.z);
	}
	
	if ( controls.getObject().position.x>68 && controls.getObject().position.x < 80 && controls.getObject().position.z>215 && controls.getObject().position.z < 285){
				controls.getObject().position.set(80.5 ,10, controls.getObject().position.z);
	}
			
}


function clickListener(event) {
	stick_animation_completed = false;

	if(stick == undefined){
		window.addEventListener("click", clickListener , once);
		return;
	}
	controls.lock();
	// PICK FOX
	
	
	if(!first_time_clicked){
		document.getElementById("click_text").innerHTML = "CLICK TO PLAY! (or press ESC again to exit) ";
		first_time_clicked = true;
		var onKeyDown = function ( event ) {
			switch ( event.keyCode ) {
				
				case 27:
					game_finished = true;

				case 38: // up
				case 87: // w
					moveForward = true;
					break;

				case 37: // left
				case 65: // a
					moveLeft = true;
					break;

				case 40: // down
				case 83: // s
					moveBackward = true;
					break;

				case 39: // right
				case 68: // d
					moveRight = true;
					break;

				case 32: // space
					if ( canJump === true ) velocity.y += 150;
					canJump = false;
					break;

			}

		};

		var onKeyUp = function ( event ) {

			switch ( event.keyCode ) {

				case 38: // up
				case 87: // w
					moveForward = false;
					break;

				case 37: // left
				case 65: // a
					moveLeft = false;
					break;

				case 40: // down
				case 83: // s
					moveBackward = false;
					break;

				case 39: // right
				case 68: // d
					moveRight = false;
					break;

			}

		};

		document.addEventListener( 'keydown', onKeyDown, false );
		document.addEventListener( 'keyup', onKeyUp, false );
		window.addEventListener("click", clickListener , once);
		if(difficulty_mode=="EASY"){
			intervalID = setInterval(function(){spawnFox()}, 10000);
		}
		else if(difficulty_mode=="MEDIUM"){
			intervalID = setInterval(function(){spawnFox()}, 5000);
		}
		else{
			intervalID = setInterval(function(){spawnFox()}, 3000);
		}


	}else{
			animateStick(stick);
	}
	
	raycaster_mouse.setFromCamera( mouse, camera);
	var intersects = raycaster_mouse.intersectObjects( scene.children, true ); // true raises the recursive mode.
	current_color+=100;
	let fox_already_hit = false;

	for ( var i = 0; i < intersects.length; i++ ) {
		
		if(!(intersects[i].object.id == floor_Id) && !fox_already_hit){ // Intersection with floor must be skipped
			// IF THE OBJECT IS THE DOG, THE USER LOOSES POINTS.
			if(intersects[i].object.children!=undefined && intersects[i].object.children.length >0 && intersects[ i ].distance< FOX_FEAR_DISTANCE){
				intersects[i].object.children.forEach(function (item, index, array) {
					item.material.forEach( function (item,index,array){
							penalty = penalty-0.02;
							
							// DOG WILL BE SCARED ----> MOVE THEIR TAILS FASTER
							if(tail_increment[0]<0.2 && tail_increment[0]>0)	tail_increment[0] = tail_increment[0]+0.0002;
							if(tail_increment[1]<0.2 && tail_increment[1]>0)   tail_increment[1] = tail_increment[1]+0.0002;
							if(tail_increment[2]<0.2 && tail_increment[2]>0)   tail_increment[2] = tail_increment[2]+0.0002;
							if(tail_increment[0]>-0.2 && tail_increment[0]<0)	tail_increment[0] = tail_increment[0]-0.0002;
							if(tail_increment[1]>-0.2 && tail_increment[1]<0)   tail_increment[1] = tail_increment[1]-0.0002;
							if(tail_increment[2]>-0.2 && tail_increment[2]<0)   tail_increment[2] = tail_increment[2]-0.0002;
					});
				});
			}else{
				// IF THE OBJECT IS THE FOX, START ESCAPE ANIMATION
				if(intersects[ i ].object.material.name =="fox_material" && intersects[ i ].distance< FOX_FEAR_DISTANCE){
					console.log(intersects[ i ].object.skeleton.bones[0].already_hitted );
					if(!intersects[ i ].object.skeleton.bones[0].already_hitted){
						intersects[ i ].object.skeleton.bones[0].already_hitted = true;
						fox_already_hit = true; // one fox per time.
						
						escaped += 1; // for the score.
						intersects[ i ].object.material.color.set( 0xff0000 );
						
						let rotation_radiants=Math.PI/2;
						let traslation_units=2000;
						if(controls.getObject().position.z>150){
							rotation_radiants = -rotation_radiants;
							traslation_units= -traslation_units;
						}
						let tween_rotation = new TWEEN.Tween(intersects[ i ].object.skeleton.bones[0].rotation).to({x: intersects[ i ].object.skeleton.bones[0].rotation.x, y: intersects[ i ].object.skeleton.bones[0].rotation.y+rotation_radiants, z:  intersects[ i ].object.skeleton.bones[0].rotation.z}, 1000);
						let tween_position = new TWEEN.Tween(intersects[ i ].object.skeleton.bones[0].position).to({x: intersects[ i ].object.skeleton.bones[0].position.x+traslation_units, y: intersects[ i ].object.skeleton.bones[0].position.y, z:  intersects[ i ].object.skeleton.bones[0].position.z}, 10000);

						for (let tween_number = 0; tween_number<15; tween_number+=1){
							intersects[ i ].object.skeleton.bones[0].tweens[tween_number].stop();
						}	
						
						FoxWalkEscape(intersects[i].object.skeleton.bones);
						tween_rotation.chain(tween_position).start();
				    }

				}
			}
		}
	}
}

function recoveryClickListener(event){
		controls.lock();

}
		
