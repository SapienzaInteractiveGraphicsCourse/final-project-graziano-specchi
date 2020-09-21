//<link type="text/css" rel="stylesheet" href="main.css">
		
import * as THREE from '../build/three.module.js';

import { PointerLockControls } from './jsm/controls/PointerLockControls.js';
import {OBJLoader2} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/OBJLoader2.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/GLTFLoader.js';

import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/MTLLoader.js';
import {MtlObjBridge} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';
import {Dog} from './Dog.js';
import {FoxWalk} from './FoxWalk.js';
import {FoxWalkTween} from './FoxWalk.js';
import {FoxWalkEscape} from './FoxWalk.js';

var camera, scene, renderer, controls;

var objects = [];
let raycaster_mouse;
let current_color=0;
var raycaster;
let fox,fox2;

let tail;
let number_of_spawned_foxes = 0;
let foxes = []; // SALVARE TUTTE LE VOLPI DENTRO UN VETTORE. VERIFICARE CHE CI SIA UNA VOLPE DAVANTI A ME E REALIZZARE ANIMAZIONE CON BASTONE E FUGA DELLA VOLPE.
let PROVVISORIO_INCREMENT=0;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var color = new THREE.Color();

let dog_increments_speed=3;
let head_increment=0.01;
var loader = new THREE.TextureLoader();
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
let difficulty_mode = "HARD";
let light_mode = "DAY";
let sec = 0;
let score = 0;
let escaped = 0;
let game_over = false;
let farm_is_alone = false;
let FOX_FEAR_DISTANCE = 20;
let already_animating = false;
let night_mode = false;
let flame=[];

let once = {
	once : true
};
//document.getElementById("time").innerHTML = "<span id='border_text' style='font-family: Impact; font-size: 1vw; color:#00FF00'>  Remaining time: " + sec + " sec" + "&nbsp&nbsp&nbsp Score: " + score + "&nbsp&nbsp&nbsp Zombies: " + escaped + "</span>";

init();
initializeDogWalk(0);
initializeDogWalk(1);
initializeDogWalk(2);
animate();
let already_added_listener = false;
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
    scene = new THREE.Scene();
 
    var light = new THREE.HemisphereLight(0xffffff, 0xffffff ,1  );
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
	createAimGLB();
    scene.frustumCulled = false

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
	
	createTree(scene,-30,20,350);
	createTree(scene,-30,20,-350);
	createTree(scene,-350,20,30);
	createTree(scene,+350,20,-20);
	createWindmill(scene,50,0,250);
    let offset_fence=-70;
    /*createFence(scene,fence,0,100+offset_fence  ,0,90+offset_fence,"NORTH");

    createFence(scene,fence,1,112.9+offset_fence,0,90+offset_fence,"NORTH");

    createFence(scene,fence,2,125.8+offset_fence,0,90+offset_fence,"NORTH");

    createFence(scene,fence,3,125.8+offset_fence,0,90+offset_fence,"SOUTH");
    
    createFence(scene,fence,4,125.8+offset_fence,0,102.9+offset_fence,"SOUTH");

    createFence(scene,fence,5,125.6+offset_fence,0,115.8+offset_fence,"SOUTH");

    createFence(scene,fence,6,125.8+offset_fence,0,130.7+offset_fence,"WEST");
    
    createFence(scene,fence,7,112.9+offset_fence,0,130.7+offset_fence,"WEST");

    createFence(scene,fence,8,100.0+offset_fence,0,130.7+offset_fence,"WEST");

    createFence(scene,fence,9,92.8+offset_fence,0,123.2+offset_fence,"EAST");
    
    createFence(scene,fence,10,92.8+offset_fence,0,110.3+offset_fence,"EAST");

    createFence(scene,fence,11,92.8+offset_fence,0,97.4+offset_fence,"EAST");
	*/
	createRamoGLB(scene,camera);
	const gltfLoader = new GLTFLoader();


    controls = new PointerLockControls( camera, document.body );
    controls.getObject().position.x=+35;
    controls.getObject().position.z=0;
    controls.getObject().position.y=10;
    controls.getObject().rotation.y=Math.PI;
    var blocker = document.getElementById( 'blocker' );
    var instructions = document.getElementById( 'instructions' );
	first_time_clicked = true;
    /*instructions.addEventListener( 'click', function () {
		
		if (!already_added_listener){
			already_added_listener = true;
	*/
	window.addEventListener("click", clickListener , once);
		//}
/*    }, once );*/
	
    controls.addEventListener( 'lock', function () {

        instructions.style.display = '';
        blocker.style.display = 'none';

    } );

    controls.addEventListener( 'unlock', function () {

        blocker.style.display = 'block';
        instructions.style.display = '';

    } );
    
    scene.add( controls.getObject() );
    spawnDog(115,2.5,115, -Math.PI/3, 1,0);
    spawnDog(112.5,5.4,110,-Math.PI/4,2,1);
    spawnDog(98, 7,103, -Math.PI,3,2);

    var onKeyDown = function ( event ) {

        switch ( event.keyCode ) {

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

    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
    raycaster_mouse = new THREE.Raycaster();

    // floor

    var floorGeometry = new THREE.PlaneBufferGeometry( 750, 750, 100, 100 );
    floorGeometry.rotateX( - Math.PI / 2 ).translate(100,0,100);

    floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices
    var position;

    var colors = [];


    let texture0 = loader.load( 'resources/specchi_texture_grass.png' );
    texture0.wrapS = THREE.RepeatWrapping;
    texture0.wrapT = THREE.RepeatWrapping;
    texture0.repeat.set( 15, 15 );
    
    var floorMaterial = new THREE.MeshPhongMaterial( { map: texture0 } )
	var material = new THREE.MeshPhongMaterial( {
		color: 0xa0adaf,
		shininess: 10,
		specular: 0x111111,
		side: THREE.BackSide
	} );
    floorMaterial.shadowSide  = THREE.DoubleSide;
	floorMaterial.flatShading = true;
	
    var floor = new THREE.Mesh( floorGeometry, floorMaterial );
    floor_Id = floor.id;
    scene.add( floor );

    // objects

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //

    window.addEventListener( 'resize', onWindowResize, false );
    

    
    //console.log(scene);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
let initial_time=undefined;
let spawned = false;
var intervalID;
spawnFox();
if(difficulty_mode=="EASY"){
	intervalID = setInterval(function(){spawnFox()}, 10000);
}
else if(difficulty_mode=="MEDIUM"){
	intervalID = setInterval(function(){spawnFox()}, 5000);
}
else{
	intervalID = setInterval(function(){spawnFox()}, 2000);
}


var mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function animate() {

    requestAnimationFrame( animate );

    if ( controls.isLocked === true ) {
		checkCameraPosition();
		/*for(let index=0; index < tweens.length; index++){
			let tween = tweens.pop();
			tween.start();
		}*/
		var time = performance.now();

		if(initial_time==undefined){
			initial_time=time;
		}
		let time_elapsed = time-initial_time;

		//checkFoxesPosition();
		
        TWEEN.update();
        //var root_fox= fox2.getObjectByName('_rootJoint');
		//fox.rotation.set(fox.rotation.x, fox.rotation.y+0.01, fox.rotation.z);
        ////console.log(root_fox.position);
        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 2;

        var intersections = raycaster.intersectObjects( objects );
        ////console.log(intersections);
        var onObject = intersections.length > 0;

        var delta = ( time - prevTime ) / 1000;
        //FoxWalk(fox,(time/1000)*100);

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

        if ( onObject === true ) {

            velocity.y = Math.max( 0, velocity.y );
            canJump = true;

        }
	
        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );

        controls.getObject().position.y += ( velocity.y * delta ); // new behavior

        if ( controls.getObject().position.y < 10 ) {

            velocity.y = 0;
            controls.getObject().position.y = 10;

            canJump = true;

        }

		for (var i=0; i<DOGS; i++){
           dogWalk(i);
        };

        prevTime = time;

    }

    
    renderer.render( scene, camera );

}



		
		
		
function spawnDog(x,y,z,theta,scaling, dog_number){
    dogClassSpawn = new Dog();
    dog = dogClassSpawn.dog;
    for ( var i = 0; i < dogClassSpawn.numNodes; i++)
      scene.add(dog[i]);

      //ATTACH
    dog[dogClassSpawn.body_Id].attach(dog[dogClassSpawn.big_body_Id]);
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
    
    //camera.attach(dog[dogClassSpawn.body_Id]);

    //dog[dogClassSpawn.big_body_Id].setRotationFromEuler(new THREE.Euler(0.5,0,0, 'XYZ'));

    //dog[dogClassSpawn.big_body_Id].translateZ(0.5);
    for(const child of dog[dogClassSpawn.big_body_Id].children){
        child.translateZ(0.5);
    }

    dog[dogClassSpawn.body_Id].position.x = x;
    dog[dogClassSpawn.body_Id].position.z = z;
    dog[dogClassSpawn.body_Id].position.y = y;
    dog[dogClassSpawn.body_Id].rotation.x = -Math.PI/2;
    dog[dogClassSpawn.body_Id].rotation.z = theta;
    dog[dogClassSpawn.body_Id].scale.set(scaling,scaling,scaling);
    //dog=dog[dogClassSpawn.body_Id];
    //dogClassSpawn=dogClassSpawn;
    dog_scene[dog_number]=dog;
    dog_scene[dog_number][dogClassSpawn.head_Id].setRotationFromEuler(new THREE.Euler(1.47,0,0, 'XYZ'));

    //dogClassBig.push(dogClassSpawn);
    //dogs.push(dog);
    //dogLife.push(dog_hulk_life);
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
    let current_arm_x=dog_scene[dog_number][dogClassSpawn.left_arm_top_Id].rotation.x;
    let current_leg_x=dog_scene[dog_number][dogClassSpawn.left_leg_top_Id].rotation.x;

    if(current_dog_head_x>1.6  || current_dog_head_x<1.2 ){
        head_increment = -head_increment;
        if(current_dog_head_x+head_increment>1.6  || current_dog_head_x+head_increment<1.2)
            head_increment = -head_increment;
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
            //dog_scene[dogClassSpawn.big_body_Id].rotateY(-0.005); 
            //dog_scene[dogClassSpawn.body_Id].rotateZ(-0.005); 

        }else{
            dog_scene[dog_number][dogClassSpawn.right_arm_bottom_Id].translateZ(-0.005);  
            dog_scene[dog_number][dogClassSpawn.right_leg_bottom_Id].translateZ(-0.005);  
            dog_scene[dog_number][dogClassSpawn.left_arm_bottom_Id].translateZ(-0.005);  
            dog_scene[dog_number][dogClassSpawn.left_leg_bottom_Id].translateZ(-0.005);     
            //dog_scene[dogClassSpawn.big_body_Id].rotateY(0.005);      
            //dog_scene[dogClassSpawn.body_Id].rotateY(0.005);      
        }
    }

    // HEAD MOVEMENT
    dog_scene[dog_number][dogClassSpawn.head_Id].rotateX(head_increment);

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
    const mtlLoader = new MTLLoader();
    mtlLoader.load('fence/13076_Gothic_Wood_Fence_Panel_v2_l3.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2();
        const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        objLoader.addMaterials(materials);
        objLoader.load('fence/13076_Gothic_Wood_Fence_Panel_v2_l3.obj', (root) => {
        fence[i]=root;
        //console.log("EXECUTED");
        // FENCE STUFF
        fence[i].rotation.x=-Math.PI/2;
        fence[i].scale.set(0.07,0.07,0.07);
        fence[i].position.set(x,y,z);
        if(side=="SOUTH"){
            fence[i].rotation.z=-Math.PI*(1.5);
            //fence[i].rotation.z=-Math.PI;
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
    const mtlLoader = new MTLLoader();
    mtlLoader.load('resources/Fire/Bonfire model 1.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2();
        const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        objLoader.addMaterials(materials);
        objLoader.load('resources/Fire/Bonfire model 1.obj', (root) => {
        //console.log("EXECUTED");
        // FENCE STUFF
       // root.rotation.x=-Math.PI/2;
        root.scale.set(2,2,2);
        root.position.set(x,y,z);
        scene.add(root);
        });
    });
}



function createStick(scene,camera){
    const mtlLoader = new MTLLoader();
    mtlLoader.load('bastone/10512_Hockey_Stick_v1_L3.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2();
        const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        objLoader.addMaterials(materials);
        objLoader.load('bastone/10512_Hockey_Stick_v1_L3.obj', (root) => {
			//console.log("EXECUTED BASTONE");
			stick = root;
			stick.rotation.x=-Math.PI/3;
			stick.scale.set(0.07,0.07,0.07);
			stick.position.set(30,3,0);
			scene.add(stick);

			camera.attach(stick);

			});
    });
}

function createTree(scene,x,y,z){
    const mtlLoader = new MTLLoader();
    mtlLoader.load('tree/lowpolytree.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2();
        const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        objLoader.addMaterials(materials);
        objLoader.load('tree/lowpolytree.obj', (root) => {
			//root.rotation.x=-Math.PI/3;
			root.scale.set(15 ,15 ,15);
			root.position.set(x,y,z);
			scene.add(root);
		});
    });
    
    
}

function createWindmill(scene,x,y,z){
    const mtlLoader = new MTLLoader();
    mtlLoader.load('resources/WindMill_Textured.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2();
        const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        objLoader.addMaterials(materials);
        objLoader.load('resources/WindMill_Textured.obj', (root) => {
			root.rotation.y=Math.PI;
			root.scale.set(15 ,15 ,15);
			root.position.set(x,y,z);
			scene.add(root);
		});
    });
}
function createRamo(scene,camera){
	const objLoader = new OBJLoader2();
	objLoader.load('resources/ramo.obj', (root) => {
		//console.log("EXECUTED RAMO");
		stick = root;
		//console.log(stick);
		//stick.rotation.x=-Math.PI/4;
		//stick.rotation.z=-Math.PI/4;
		stick.scale.set(5.07,5.07,5.07);
		stick.position.set(0,10,350);
		scene.add(stick);

		camera.attach(stick);

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
			if(object.isMesh && object.name!="Torus001") object.material.transparent = false; // forse mettere dentro la funzione della volpe 
		});
	});
		
}



function createRamoGLB(){


	const gltfLoader = new GLTFLoader();
	//console.log("createRamoGLB");
	gltfLoader.load('resources/ramo.glb', (gltf) => {
		const root = gltf.scene;
		stick = root;
		//console.log(stick);
		stick.rotation.x=+Math.PI/4;
		//stick.rotation.z=-Math.PI/4;
		//stick.children.object.material.color.set(1.0,0.9,0.6);
		stick.scale.set(1.07,1.07,1.07);
		stick.position.set(33,10,1); // x is longitude (positive left), y is height, z is depth.
		scene.add(stick);
		//console.log(scene.children);
		camera.attach(stick);

	});		
}

function createFlame(scene, x, y, z, flameDelay){
	const gltfLoader = new GLTFLoader();
	gltfLoader.load('resources/bomberman_fire/scene.gltf', (gltf) => {
		const root = gltf.scene;
		root.scale.set(0.03, 0.03, 0.03);

		root.position.set(x, y, z);
		
		let tween_fire = new TWEEN.Tween(root.rotation).to({x: root.rotation.x, y: root.rotation.y+Math.PI/6, z:  root.rotation.z}, 100);
		tween_fire.repeat(1000).yoyo(true).repeatDelay(flameDelay/2).start();

		tween_fire = new TWEEN.Tween(root.scale).to({x: root.scale.x, y: root.scale.y+0.007, z:  root.scale.z}, 100);
		tween_fire.repeat(1000).yoyo(true).repeatDelay(flameDelay).delay(500).start();

		//root.rotation.set(0,0,0);
		scene.add(root);
	});
}

function createAimGLB(){


	const gltfLoader = new GLTFLoader();
	//console.log("createAimGLB");
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
		//aim.rotation.z=-Math.PI/4;
		//aim.children.object.material.color.set(1.0,0.9,0.6);
		aim.scale.set(0.2,0.2,0.2);//(0.2, 0.2, 0.2);
		//console.log("PROPRIETA MIRINO",aim);
		//console.log(scene);
		aim.position.set(35,10,2); // x is longitude (positive left), y is height, z is depth.
		scene.add(aim);
		//console.log(scene);

		camera.attach(aim);

	});		
	
	//console.log("createLittleAimGLB");
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
		//aim.rotation.z=-Math.PI/4;
		//aim.children.object.material.color.set(1.0,0.9,0.6);
		aim.scale.set(0.05,0.05,0.05);//(0.2, 0.2, 0.2);
		//console.log("PROPRIETA MIRINO",aim);
		//console.log(scene);
		aim.position.set(35,10,2); // x is longitude (positive left), y is height, z is depth.
		scene.add(aim);
		//console.log(scene);

		camera.attach(aim);

	});		
}




function animateStick( stick ){
	let tween_stick = new TWEEN.Tween(stick.rotation).to({x: stick.rotation.x-Math.PI/3, y: stick.rotation.y, z:  stick.rotation.z-Math.PI/4}, 300);
    tween_stick.repeat(1).yoyo(true).onComplete(function (object) {
		window.addEventListener("click", clickListener , once);
	}).start();    
}

function checkFoxesPosition(){// REALIZZARLA CON IL TIMEOUT
	scene.children.forEach(function (item, index, array) {
		
		//console.log(item);
		if(item.name == "OSG_Scene" && item.children[0].children[0].children[0].children[0].children[0].children[0].children[3] != undefined){
			if ( item.position.x>85 && item.position.x<140 && item.position.z>80 && item.position.z<140){
				game_over = true;
			}
			
			if (item.children[0].children[0].children[0].children[0].children[0].children[0].children[3].skeleton.bones[0].position.x == 2000 ){
				scene.remove( item );

				// clean up

				item.children[0].children[0].children[0].children[0].children[0].children[0].children[3].geometry.dispose();
				item.children[0].children[0].children[0].children[0].children[0].children[0].children[3].material.dispose();
			}		
		}
	});
}

// Update the count down every 1 second
var y = setInterval(checkFoxesPosition, 500);
	
// Update the count down every 1 second
var x = setInterval(function() {
	// Get the "now" date
	var now1 = new Date().getTime();
	sec+=1;
	
	document.getElementById("time").innerHTML = "<span id='border_text' style='font-family: Impact; font-size: 1vw; color:#00FF00'>   Time elapsed: " + sec + " sec" + "&nbsp&nbsp&nbsp Diff: " + difficulty_mode + "&nbsp&nbsp&nbsp Mode: " + light_mode + "&nbsp&nbsp&nbsp Score: " + escaped + "</span>";
	if (sec >30 || game_over || farm_is_alone) {
	  document.exitPointerLock();
	  document.removeEventListener('click', function() {
		  controls.lock();
	  }, false);
	  clearInterval(x);
	  if (game_over){
		document.getElementById("time").innerHTML = "<br /><span id='border_text'style='font-family: Impact; font-size: 4vw; color:#00F000'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <h1>A FOX REACHED THE FARM!</h1><h2> Score: "+Math.floor((escaped+(-sec/100))*100)+"</h2><a href='index.html'> Restart</a></span>";
	  }
	  else if (farm_is_alone) {
		document.getElementById("time").innerHTML = "<br /><span id='border_text'style='font-family: Impact; font-size: 4vw; color:#00F000'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <h1>FARM IS ALONE!</h1><h2> Score: "+Math.floor((escaped+(-sec/100))*100)+"</h2><a href='index.html'> Restart</a></span>";
	  }
	  else{
		document.getElementById("time").innerHTML = "<br /><span id='border_text'style='font-family: Impact; font-size: 4vw; color:#00F000'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <h1>ANIMALS SURVIVED!</h1><h2> Score: "+Math.floor((escaped+(-sec/100))*100)+"</h2><a href='index.html'> Restart</a></span>";
	  }
	}
}, 1000);

let prev_pos;
function checkCameraPosition(){// REALIZZARLA CON IL TIMEOUT
	if ( controls.getObject().position.x>300 || controls.getObject().position.x<-300 || controls.getObject().position.z>300 || controls.getObject().position.z<-300){
		farm_is_alone = true;
	}
	
	// CHECK FENCE
	//south
	if ( controls.getObject().position.x>80 && controls.getObject().position.x < 140 && controls.getObject().position.z>80 && controls.getObject().position.z < 100){
		controls.getObject().position.set(controls.getObject().position.x,10, 80);
	}
	
	//north
	if ( controls.getObject().position.x>80 && controls.getObject().position.x < 140 && controls.getObject().position.z>125 && controls.getObject().position.z < 145){
		controls.getObject().position.set(controls.getObject().position.x,10, 145);
	}
	
	if ( controls.getObject().position.x>80 && controls.getObject().position.x < 100 && controls.getObject().position.z>80 && controls.getObject().position.z < 143){
		controls.getObject().position.set(80 ,10, controls.getObject().position.z);
	}
	
	if ( controls.getObject().position.x>110 && controls.getObject().position.x < 140 && controls.getObject().position.z>80 && controls.getObject().position.z < 143){
				controls.getObject().position.set(140 ,10, controls.getObject().position.z);
	}
	
	// CHECK WINDMILL
		//south
	if ( controls.getObject().position.x>19 && controls.getObject().position.x < 80 && controls.getObject().position.z>215 && controls.getObject().position.z < 230){
		controls.getObject().position.set(controls.getObject().position.x,10, 214.5);
	}
	
	//north
	if ( controls.getObject().position.x>19 && controls.getObject().position.x < 80 && controls.getObject().position.z >260 && controls.getObject().position.z < 285){
		controls.getObject().position.set(controls.getObject().position.x,10, 285.5);
	}
	
	if ( controls.getObject().position.x>19 && controls.getObject().position.x < 30 && controls.getObject().position.z>215 && controls.getObject().position.z < 285){
		controls.getObject().position.set(18.5 ,10, controls.getObject().position.z);
	}
	
	if ( controls.getObject().position.x>70 && controls.getObject().position.x < 80 && controls.getObject().position.z>215 && controls.getObject().position.z < 285){
				controls.getObject().position.set(80.5 ,10, controls.getObject().position.z);
	}
			
	/*
	 * 
	 * 
	if ( controls.getObject().position.x>80 && controls.getObject().position.x < 140 && controls.getObject().position.z > 80 && controls.getObject().position.z<140){
		console.log("respingo ", controls.getObject().position, " e setto ",prev_pos);
		controls.getObject().position.x=prev_pos.x;
		controls.getObject().position.y=prev_pos.y;
		controls.getObject().position.z=prev_pos.z;
	}
	else{
		prev_pos = controls.getObject().position;
	}
	/*
	scene.children.forEach(function (item, index, array) {
		
		if(item.type == "PerspectiveCamera"){
			
			if ( item.position.x>300 || item.position.x<-300 || item.position.z>300 || item.position.z<-300){
				farm_is_alone = true;
			}
			
			if ( item.position.x>80 && item.position.x < 140 && item.position.z > 80 && item.position.z<140){
				console.log("respingo ", item.position, " e setto ",prev_pos);
				item.position.set(prev_pos);
			}
			else{
				prev_pos = item.position;
			}
			/*if ( item.position.x>80 && item.position.x < 140 && item.position.z>80 && item.position.z < 100){
				item.position.set(item.position.x,10, 80);
			}
			
			if ( item.position.x>80 && item.position.x < 140 && item.position.z>120 && item.position.z < 145){
				item.position.set(item.position.x,10, 145);
			}
			
			if ( item.position.x>80 && item.position.x < 100 && item.position.z>80 && item.position.z < 143){
				item.position.set(80 ,10, item.position.z);
			}
			
			if ( item.position.x>110 && item.position.x < 140 && item.position.z>80 && item.position.z < 143){
				item.position.set(140 ,10, item.position.z);
			}
		}
	});*/
}


function clickListener(event) {
	if(stick == undefined){
		window.addEventListener("click", clickListener , once);
		return;
	}
	controls.lock();
	// PICK FOX
	
	animateStick(stick);
	
	raycaster_mouse.setFromCamera( mouse, camera);
	var intersects = raycaster_mouse.intersectObjects( scene.children, true ); // true raises the recursive mode.
	current_color+=100;
	let fox_already_hit = false;

	for ( var i = 0; i < intersects.length; i++ ) {
		//console.log("Intersections",intersects[i].object.id, floor_Id);
		if(!(intersects[i].object.id == floor_Id) && !fox_already_hit){ // Intersection with floor must be skipped
			
			if(intersects[i].object.children!=undefined && intersects[i].object.children.length >0){
				//console.log("BECCATO! RICORSIVO LISTENER!", intersects[i].object);

				intersects[i].object.children.forEach(function (item, index, array) {
					item.material.forEach( function (item,index,array){
						
						item.color.set(current_color);
					});
				});
			}else{
				//console.log("BECCATO! LISTENER!", intersects[i].object);
				if(intersects[ i ].object.material.name =="fox_material" && intersects[ i ].distance< FOX_FEAR_DISTANCE){
					fox_already_hit = true; // one fox per time.
					//console.log("FOX MATERIAL BECCATO", intersects[i].object);
					//console.log(scene.children);
					escaped += 1; // for the score.
					intersects[ i ].object.material.color.set( 0xff0000 );
					//console.log(intersects[ i ]);
					
					let tween_rotation = new TWEEN.Tween(intersects[ i ].object.skeleton.bones[0].rotation).to({x: intersects[ i ].object.skeleton.bones[0].rotation.x, y: intersects[ i ].object.skeleton.bones[0].rotation.y+Math.PI/2, z:  intersects[ i ].object.skeleton.bones[0].rotation.z}, 1000);
					let tween_position = new TWEEN.Tween(intersects[ i ].object.skeleton.bones[0].position).to({x: intersects[ i ].object.skeleton.bones[0].position.x+2000, y: intersects[ i ].object.skeleton.bones[0].position.y, z:  intersects[ i ].object.skeleton.bones[0].position.z}, 10000);

					for (let tween_number = 0; tween_number<15; tween_number+=1){
						intersects[ i ].object.skeleton.bones[0].tweens[tween_number].stop();
					}	
					
					FoxWalkEscape(intersects[i].object.skeleton.bones);
					tween_rotation.chain(tween_position).start();

				}/*else{
					
					/intersects[ i ].object.material.color.set( current_color );
				}*/
			}
		}
	}
}
