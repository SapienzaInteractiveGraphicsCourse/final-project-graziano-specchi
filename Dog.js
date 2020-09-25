import * as THREE from './three.module.js';


/*Note that for meshes, faces must be pointed towards the origin of the ray in order to be detected;
 * intersections of the ray passing through the back of a face will not be detected. 
 * To raycast against both faces of an object, you'll want to set the material's side property to THREE.DoubleSide. */
export function Dog(){		

		this.dog = [];

		this.body_Id = 0;
		this.big_body_Id = 1;
		this.head_Id = 2;
		this.left_leg_top_Id = 3;
		this.left_leg_bottom_Id = 4;
		this.right_leg_top_Id = 5;
		this.right_leg_bottom_Id = 6;
		this.left_arm_top_Id = 7;
		this.right_arm_top_Id = 8;
		this.nose_Id = 9;
		this.ear_left_Id = 10;
		this.ear_right_Id = 11;
		this.right_arm_bottom_Id = 12;
		this.left_arm_bottom_Id = 13;
		this.tail_Id = 14;
		
		// AGGIUNGI ANCHE NUMNODES
		this.numNodes = 15;
		
		var loader = new THREE.TextureLoader();
        
        
        var body_geometry      = new THREE.BoxGeometry( 1.0, 2.5, 1.3);
        var big_body_geometry      = new THREE.BoxGeometry( 1.1, 2.0, 1.4);
		
		var head_geometry      = new THREE.BoxGeometry( 0.8, 1.1, 1);
        var nose_geometry      = new THREE.BoxGeometry( 0.4, 0.4, 0.8);
		
		var left_ear_geometry = new THREE.BoxGeometry( 0.2, 0.4, 0.2);
		var right_ear_geometry = new THREE.BoxGeometry( 0.2, 0.4, 0.2);

		var left_leg_top_geometry  = new THREE.BoxGeometry( 0.4, 1.1, 0.4);
		var right_leg_top_geometry = new THREE.BoxGeometry( 0.4, 1.1, 0.4);
		
		var left_leg_bottom_geometry  = new THREE.BoxGeometry( 0.4, 0.8, 0.4);
		var right_leg_bottom_geometry = new THREE.BoxGeometry( 0.4, 0.8, 0.4);
		
        var left_arm_top_geometry  = new THREE.BoxGeometry( 0.4, 1.1, 0.4);
		var right_arm_top_geometry = new THREE.BoxGeometry( 0.4, 1.1, 0.4);                                                                                                
				
        var left_arm_bottom_geometry  = new THREE.BoxGeometry( 0.4, 0.8, 0.4);
		var right_arm_bottom_geometry = new THREE.BoxGeometry( 0.4, 0.8, 0.4);     
		
        var tail_geometry    = new THREE.BoxGeometry( 0.3, 0.3, 0.8);                                                                                           
		

		
		// HEAD
        var texture0 = loader.load( 'resources/furdog.png' );
		var texture1 = loader.load( 'resources/furdog.png' );
		var texture2 = loader.load( 'resources/furdog.png' );
		var texture3 = loader.load( 'resources/furdog.png' );
		var texture4 = loader.load( 'resources/furdog.png' );
		var texture5 = loader.load( 'resources/facedog_square_black&white.png' );

        var head_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];
		
		head_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});

		// NOSE
		//destra
		texture0 = loader.load( 'resources/facedog_muso_right.png' );
		//sinistra
		texture1 = loader.load( 'resources/facedog_muso_left.png' );
		//sopra
		texture2 = loader.load( 'resources/furdog.png' ); // TODO CAMBIARE TXT NASO
		// dietro
		texture3 = loader.load( 'resources/furdog.png' );
		//sotto
		texture4 = loader.load( 'resources/furdog.png' );
		//frontale
		texture5 = loader.load( 'resources/facedog_muso_front.png' );

		var nose_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];

		nose_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});



		// TAIL
		texture0 = loader.load( 'resources/furdog.png' );
		texture1 = loader.load( 'resources/furdog.png' );
		texture2 = loader.load( 'resources/furdog.png' ); 

		texture3 = loader.load( 'resources/furdog.png' );
		texture4 = loader.load( 'resources/furdog.png' );
		texture5 = loader.load( 'resources/furdog.png' );

		var tail_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];

		tail_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
		
		
		// EAR LEFT
		texture0 = loader.load( 'resources/furdog.png' );
		texture1 = loader.load( 'resources/furdog.png' );
		texture2 = loader.load( 'resources/furdog.png' ); 

		texture3 = loader.load( 'resources/furdog.png' );
		texture4 = loader.load( 'resources/furdog.png' );
		texture5 = loader.load( 'resources/furdog.png' );

		var ear_left_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];

		ear_left_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});



		// EAR RIGHT
		texture0 = loader.load( 'resources/furdog.png' );
		texture1 = loader.load( 'resources/furdog.png' );
		texture2 = loader.load( 'resources/furdog.png' ); 

		texture3 = loader.load( 'resources/furdog.png' );
		texture4 = loader.load( 'resources/furdog.png' );
		texture5 = loader.load( 'resources/furdog.png' );

		var ear_right_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];

		ear_right_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});


		// BODY
		texture0 = loader.load( 'resources/furdog.png' );
		texture1 = loader.load( 'resources/furdog.png' );
		texture2 = loader.load( 'resources/furdog.png' );
		texture3 = loader.load( 'resources/furdog.png' );
		texture4 = loader.load( 'resources/furdog.png' );
		texture5 = loader.load( 'resources/furdog.png' );

        var body_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];
		
		body_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
		
		
		// BIG BODY
		texture0 = loader.load( 'resources/furdog.png' );
		texture1 = loader.load( 'resources/furdog.png' );
		texture2 = loader.load( 'resources/furdog.png' );
		texture3 = loader.load( 'resources/furdog.png' );
		texture4 = loader.load( 'resources/furdog.png' );
		texture5 = loader.load( 'resources/furdog.png' );

		var big_body_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];

		big_body_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
		// LEFT LEG TOP
		texture0 = loader.load( 'resources/furdog.png' );
		texture1 = loader.load( 'resources/furdog.png' );
		texture2 = loader.load( 'resources/furdog.png' );
		texture3 = loader.load( 'resources/furdog.png' );
		texture4 = loader.load( 'resources/furdog.png' );
		texture5 = loader.load( 'resources/furdog.png' );


        var left_leg_top_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];

		left_leg_top_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
		
		// LEFT LEG BOTTOM
		texture0 = loader.load( 'resources/furdog.png' );
		texture1 = loader.load( 'resources/furdog.png' );
		texture2 = loader.load( 'resources/furdog.png' );
		texture3 = loader.load( 'resources/furdog.png' );
		texture4 = loader.load( 'resources/furdog.png' );
		texture5 = loader.load( 'resources/furdog.png' );

		var left_leg_bottom_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];
		
		left_leg_bottom_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});

		// RIGHT LEG TOP
		texture0 = loader.load( 'resources/furdog.png' );
		texture1 = loader.load( 'resources/furdog.png' );
		texture2 = loader.load( 'resources/furdog.png' );
		texture3 = loader.load( 'resources/furdog.png' );
		texture4 = loader.load( 'resources/furdog.png' );
		texture5 = loader.load( 'resources/furdog.png' );

        var right_leg_top_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];
		
		right_leg_top_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
		
		
		// RIGHT LEG BOTTOM
		texture0 = loader.load( 'resources/furdog.png' );
		texture1 = loader.load( 'resources/furdog.png' );
		texture2 = loader.load( 'resources/furdog.png' );
		texture3 = loader.load( 'resources/furdog.png' );
		texture4 = loader.load( 'resources/furdog.png' );
		texture5 = loader.load( 'resources/furdog.png' );

		var right_leg_bottom_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];
		
		right_leg_bottom_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
		

		// LEFT ARM TOP
		texture0 = loader.load( 'resources/furdog.png' );
		texture1 = loader.load( 'resources/furdog.png' );
		texture2 = loader.load( 'resources/furdog.png' );
		texture3 = loader.load( 'resources/furdog.png' );
		texture4 = loader.load( 'resources/furdog.png' );
		texture5 = loader.load( 'resources/furdog.png' );

        var left_arm_top_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];

		left_arm_top_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
		

		// LEFT ARM BOTTOM

		texture0 = loader.load( 'resources/furdog.png' );
		texture1 = loader.load( 'resources/furdog.png' );
		texture2 = loader.load( 'resources/furdog.png' );
		texture3 = loader.load( 'resources/furdog.png' );
		texture4 = loader.load( 'resources/furdog.png' );
		texture5 = loader.load( 'resources/furdog.png' );

		var left_arm_bottom_material = [
			new THREE.MeshPhongMaterial( { map: texture0 } ),
			new THREE.MeshPhongMaterial( { map: texture1 } ),
			new THREE.MeshPhongMaterial( { map: texture2 } ),
			new THREE.MeshPhongMaterial( { map: texture3 } ),
			new THREE.MeshPhongMaterial( { map: texture4 } ),
			new THREE.MeshPhongMaterial( { map: texture5 } )
		];
		
		left_arm_bottom_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
		// RIGHT ARM TOP
		texture0 = loader.load( 'resources/furdog.png' );
		texture1 = loader.load( 'resources/furdog.png' );
		texture2 = loader.load( 'resources/furdog.png' );
		texture3 = loader.load( 'resources/furdog.png' );
		texture4 = loader.load( 'resources/furdog.png' );
		texture5 = loader.load( 'resources/furdog.png' );

        var right_arm_top_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];

		right_arm_top_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});
		
		
		// RIGHT ARM BOTTOM
		texture0 = loader.load( 'resources/furdog.png' );
		texture1 = loader.load( 'resources/furdog.png' );
		texture2 = loader.load( 'resources/furdog.png' );
		texture3 = loader.load( 'resources/furdog.png' );
		texture4 = loader.load( 'resources/furdog.png' );
		texture5 = loader.load( 'resources/furdog.png' );

        var right_arm_bottom_material = [
		    new THREE.MeshPhongMaterial( { map: texture0 } ),
		    new THREE.MeshPhongMaterial( { map: texture1 } ),
		    new THREE.MeshPhongMaterial( { map: texture2 } ),
		    new THREE.MeshPhongMaterial( { map: texture3 } ),
		    new THREE.MeshPhongMaterial( { map: texture4 } ),
		    new THREE.MeshPhongMaterial( { map: texture5 } )
		];
		
		right_arm_bottom_material.forEach(function (item, index, array) {
			item.shadowSide = THREE.DoubleSide;
			item.flatShading = true;
		});

        var body      = new THREE.Mesh( body_geometry, body_material);
        var nose      = new THREE.Mesh( nose_geometry, nose_material);
        var ear_left      = new THREE.Mesh( left_ear_geometry, ear_left_material);
        var ear_right      = new THREE.Mesh( right_ear_geometry, ear_right_material);
        var big_body      = new THREE.Mesh( big_body_geometry, big_body_material);
       	var head      = new THREE.Mesh( head_geometry, head_material );
        var left_leg_top  = new THREE.Mesh( left_leg_top_geometry, left_leg_top_material);
        var left_leg_bottom  = new THREE.Mesh( left_leg_bottom_geometry, left_leg_bottom_material);
        var right_leg_top = new THREE.Mesh( right_leg_top_geometry, right_leg_top_material);
        var right_leg_bottom = new THREE.Mesh( right_leg_bottom_geometry, right_leg_bottom_material);
        var left_arm_top  = new THREE.Mesh( left_arm_top_geometry, left_arm_top_material);
        var right_arm_top = new THREE.Mesh( right_arm_top_geometry, right_arm_top_material);
		var left_arm_bottom  = new THREE.Mesh( left_arm_bottom_geometry, left_arm_bottom_material);
        var right_arm_bottom = new THREE.Mesh( right_arm_bottom_geometry, right_arm_bottom_material);
        var tail = new THREE.Mesh( tail_geometry, tail_material);
        
        this.dog[this.body_Id]      = body;
        this.dog[this.big_body_Id]      = big_body;
        this.dog[this.head_Id]      = head;
        this.dog[this.nose_Id]      = nose;
        this.dog[this.ear_left_Id]      = ear_left;
        this.dog[this.ear_right_Id]      = ear_right;
        this.dog[this.left_leg_top_Id]  = left_leg_top;
        this.dog[this.left_leg_bottom_Id]  = left_leg_bottom;
        this.dog[this.right_leg_top_Id] = right_leg_top;
        this.dog[this.right_leg_bottom_Id] = right_leg_bottom;
        this.dog[this.left_arm_top_Id]  = left_arm_top;
        this.dog[this.right_arm_top_Id] = right_arm_top;
        this.dog[this.left_arm_bottom_Id] = left_arm_bottom;
        this.dog[this.right_arm_bottom_Id] = right_arm_bottom;
        this.dog[this.tail_Id] = tail;
		
		
		let body_z=(left_leg_top_geometry.parameters.height+left_leg_bottom_geometry.parameters.height)/2.0
        body.position.set(0, 0, body_z);
		
		let big_body_y=body_geometry.parameters.height/2;
		big_body.position.set(0, big_body_y, body_z);
		
		let head_y=big_body_y*2;

		head.position.set(0, head_y-0.5, body_z);

		nose.position.set(0, head_y-0.75, body_z-nose_geometry.parameters.depth);

		ear_left.position.set(-0.5, head_y, body_z-nose_geometry.parameters.depth+0.5);
		ear_right.position.set(0.5, head_y, body_z-nose_geometry.parameters.depth+0.5);


		let left_arm_top_x = (-(body_geometry.parameters.width+0.5)/2)/2.7;
		let left_arm_top_y = big_body_geometry.parameters.height+1.6*1.3;

        left_arm_top.position.set (left_arm_top_x , -2+left_arm_top_y, -0.05);
		right_arm_top.position.set(-left_arm_top_x, -2+left_arm_top_y, -0.05);
		
		left_arm_bottom.position.set (left_arm_top_x , -2.5+left_arm_top_y-right_arm_bottom.geometry.parameters.height/2, -0.05);
		right_arm_bottom.position.set(-left_arm_top_x, -2.5+left_arm_top_y-right_arm_bottom.geometry.parameters.height/2, -0.05);

		left_leg_top.position.set (left_arm_top_x/1.1 , -5+left_arm_top_y, -0.05);//left_leg_top_geometry.parameters.height /2, 0);
		right_leg_top.position.set(-left_arm_top_x/1.1, -5+left_arm_top_y, -0.05);
		
		right_leg_bottom.position.set(-left_arm_top_x/1.1, -5.3+left_arm_top_y-left_arm_bottom.geometry.parameters.height/2, -0.05);
		left_leg_bottom.position.set (left_arm_top_x/1.1 , -5.3+left_arm_top_y-left_arm_bottom.geometry.parameters.height/2, -0.05);
		
		tail.position.set(0, -(head_y-1.3), body_z+0.6);

		
}
