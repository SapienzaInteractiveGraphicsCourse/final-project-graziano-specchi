import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';

export function FoxWalkTween(fox_reference,distance, side){
    //console.log( fox_reference);
    // BODY
    var root= fox_reference.getObjectByName('_rootJoint');

    // HIP and SPINE
    var hip= fox_reference.getObjectByName('b_Hip_01');
    var spine1= fox_reference.getObjectByName('b_Spine01_02');
    var spine2= fox_reference.getObjectByName('b_Spine02_03');
    
    // HEAD
    var neck= fox_reference.getObjectByName('b_Neck_04');
    var head= fox_reference.getObjectByName('b_Head_05');
    
    // RIGHT ARM
    var right_arm_1= fox_reference.getObjectByName('b_RightUpperArm_06');
    var right_arm_2= fox_reference.getObjectByName('b_RightForeArm_07');
    var right_arm_3= fox_reference.getObjectByName('b_RightHand_08');

    // LEFT ARM 
    var left_arm_1= fox_reference.getObjectByName('b_LeftUpperArm_09');
    var left_arm_2= fox_reference.getObjectByName('b_LeftForeArm_010');
    var left_arm_3= fox_reference.getObjectByName('b_LeftHand_011');

    // TAIL
    var tail_1= fox_reference.getObjectByName('b_Tail01_012');
    var tail_2= fox_reference.getObjectByName('b_Tail02_013');
    var tail_3= fox_reference.getObjectByName('b_Tail03_014');

    // LEFT LEG
    var left_leg_1= fox_reference.getObjectByName('b_LeftLeg01_015');
    var left_leg_2= fox_reference.getObjectByName('b_LeftLeg02_016');
    var left_leg_3= fox_reference.getObjectByName('b_LeftFoot01_017');
    var left_leg_4= fox_reference.getObjectByName('b_LeftFoot02_018');

    // RIGHT LEG
    var right_leg_1= fox_reference.getObjectByName('b_RightLeg01_019');
    var right_leg_2= fox_reference.getObjectByName('b_RightLeg02_020');
    var right_leg_3= fox_reference.getObjectByName('b_RightFoot01_021');
    var right_leg_4= fox_reference.getObjectByName('b_RightFoot02_022');
    let neck_rotation_offset = 0.3;
    let tail_1_rotation_offset = 0.3;

    let REPEAT_DELAY = 0;
    let FOX_TRASLATION = distance;
    let FOX_TRASLATION_TIME = 40000;
    let FOX_ROTATION = 5;
    let FOX_ROTATION_TIME = 40000;
	let TWEEN_TIME = 300;
	
	root.tweens = [];
    // RIGHT LEG FOX
    root.tweens[0] = new TWEEN.Tween(right_leg_1.rotation).to({x: right_leg_1.rotation.x, y: right_leg_1.rotation.y, z:  right_leg_1.rotation.z+Math.PI/4}, TWEEN_TIME);
    root.tweens[0].repeat(Infinity);
    root.tweens[0].repeatDelay(REPEAT_DELAY);
    root.tweens[0].yoyo(true);
    
    root.tweens[1] = new TWEEN.Tween(right_leg_2.rotation).to({x: right_leg_2.rotation.x, y: right_leg_2.rotation.y, z:  right_leg_2.rotation.z-Math.PI/8}, TWEEN_TIME);
    root.tweens[1].repeat(Infinity);
    root.tweens[1].yoyo(true);

    root.tweens[2] = new TWEEN.Tween(right_leg_3.rotation).to({x: right_leg_3.rotation.x, y: right_leg_3.rotation.y, z:  right_leg_3.rotation.z-Math.PI/4}, TWEEN_TIME);
    root.tweens[2].repeat(Infinity);
    root.tweens[2].yoyo(true);

    // DEBUG
    //console.log("NECK 1:\n",neck.rotation);
    //console.log("LEFT LEG 1:\n",left_leg_1.rotation);
    
    // INVERT THE SEQUENCE FOR LEFT LEG
    let final_z=left_leg_1.rotation.z;
    left_leg_1.rotation.set(left_leg_1.rotation.x,left_leg_1.rotation.y,left_leg_1.rotation.z+Math.PI/4);


    // LEFT LEG FOX
    root.tweens[3] = new TWEEN.Tween(left_leg_1.rotation).to({x: left_leg_1.rotation.x, y: left_leg_1.rotation.y, z: final_z }, TWEEN_TIME);
    root.tweens[3].repeat(Infinity);
    root.tweens[3].repeatDelay(REPEAT_DELAY);
    root.tweens[3].yoyo(true);   
    
    final_z = left_leg_2.rotation.z;
    left_leg_2.rotation.set(left_leg_2.rotation.x,left_leg_2.rotation.y,left_leg_2.rotation.z-Math.PI/8);
    
    root.tweens[4] = new TWEEN.Tween(left_leg_2.rotation).to({x: left_leg_2.rotation.x, y: left_leg_2.rotation.y, z:  final_z}, TWEEN_TIME);
    root.tweens[4].repeat(Infinity);
    root.tweens[4].yoyo(true);

    final_z = left_leg_3.rotation.z;
    left_leg_3.rotation.set(left_leg_3.rotation.x,left_leg_3.rotation.y,left_leg_3.rotation.z-Math.PI/4);

    root.tweens[5] = new TWEEN.Tween(left_leg_3.rotation).to({x: left_leg_3.rotation.x, y: left_leg_3.rotation.y, z: final_z }, TWEEN_TIME);
    root.tweens[5].repeat(Infinity);
    root.tweens[5].yoyo(true);

    
    // left ARM FOX

    root.tweens[6] = new TWEEN.Tween(left_arm_1.rotation).to({x: left_arm_1.rotation.x, y: left_arm_1.rotation.y, z:  left_arm_1.rotation.z+Math.PI/4}, TWEEN_TIME);
    root.tweens[6].repeat(Infinity);
    root.tweens[6].repeatDelay(REPEAT_DELAY);
    root.tweens[6].yoyo(true);
    
    root.tweens[7] = new TWEEN.Tween(left_arm_2.rotation).to({x: left_arm_2.rotation.x, y: left_arm_2.rotation.y, z:  left_arm_2.rotation.z-Math.PI/8}, TWEEN_TIME);
    root.tweens[7].repeat(Infinity);
    root.tweens[7].yoyo(true);

    root.tweens[8] = new TWEEN.Tween(left_arm_3.rotation).to({x: left_arm_3.rotation.x, y: left_arm_3.rotation.y, z:  left_arm_3.rotation.z-Math.PI/4}, TWEEN_TIME);
    root.tweens[8].repeat(Infinity);
    root.tweens[8].yoyo(true);

    // right ARM FOX
    
    final_z = right_arm_1.rotation.z;
    right_arm_1.rotation.set(right_arm_1.rotation.x,right_arm_1.rotation.y,right_arm_1.rotation.z+Math.PI/4);
    root.tweens[9] = new TWEEN.Tween(right_arm_1.rotation).to({x: right_arm_1.rotation.x, y: right_arm_1.rotation.y, z:final_z  }, TWEEN_TIME);
    root.tweens[9].repeat(Infinity);
    root.tweens[9].repeatDelay(REPEAT_DELAY);
    root.tweens[9].yoyo(true);
    //console.log("LEFT ARM 2:\n",left_arm_2.rotation);

    final_z = right_arm_2.rotation.z;
    right_arm_2.rotation.set(right_arm_2.rotation.x,right_arm_2.rotation.y, right_arm_2.rotation.z-Math.PI/8);
    root.tweens[10] = new TWEEN.Tween(right_arm_2.rotation).to({x: right_arm_2.rotation.x, y: right_arm_2.rotation.y, z:  final_z}, TWEEN_TIME);
    root.tweens[10].repeat(Infinity);
    root.tweens[10].yoyo(true);

    //console.log("LEFT ARM 3:\n",left_arm_3.rotation);

    final_z = right_arm_3.rotation.z;
    right_arm_3.rotation.set(right_arm_3.rotation.x,right_arm_3.rotation.y,right_arm_3.rotation.z-Math.PI/4);
    root.tweens[11] = new TWEEN.Tween(right_arm_3.rotation).to({x: right_arm_3.rotation.x, y: right_arm_3.rotation.y, z: final_z}, TWEEN_TIME);
    root.tweens[11].repeat(100);
    root.tweens[11].yoyo(true);

	if(side == "NORTH" || side == "WEST"){
		FOX_TRASLATION = -FOX_TRASLATION;
	}
    // BODY TRASLATION
    if(side == "NORTH" || side == "SOUTH"){
		root.tweens[12] = new TWEEN.Tween(fox_reference.position).to({x:fox_reference.position.x, y:fox_reference.position.y, z:  fox_reference.position.z+FOX_TRASLATION}, FOX_TRASLATION_TIME);
    }else{
		root.tweens[12] = new TWEEN.Tween(fox_reference.position).to({x:fox_reference.position.x+FOX_TRASLATION, y:fox_reference.position.y, z:  fox_reference.position.z}, FOX_TRASLATION_TIME);
    }

    // NECK ROTATION
    root.tweens[13] = new TWEEN.Tween(neck.rotation).to({x: neck.rotation.x, y: neck.rotation.y, z:  neck.rotation.z-neck_rotation_offset}, TWEEN_TIME);
    root.tweens[13].repeat(Infinity);
    root.tweens[13].yoyo(true);

    // TAIL ROTATION
    root.tweens[14] = new TWEEN.Tween(tail_1.rotation).to({x: tail_1.rotation.x, y: tail_1.rotation.y, z:  tail_1.rotation.z-tail_1_rotation_offset}, TWEEN_TIME);
    root.tweens[14].repeat(Infinity);
    root.tweens[14].yoyo(true);
	//console.log(" LA FOX REF SU CUI AGGIUNGO È ", fox_reference);
	for (let counter = 0; counter<15; counter+=1){
		root.tweens[counter].start();
	}				//console.log(dumpObject(root).join('\n'));
    
}


export function FoxWalkEscape(bones){
    
    // BODY
    var root= bones[0];

    // HIP and SPINE
    var hip= bones[2];
    var spine1= bones[3];
    var spine2= bones[4];
    
    // HEAD
    var neck= bones[5];
    var head= bones[6];
    
    // RIGHT ARM
    var right_arm_1= bones[7];
    var right_arm_2= bones[8];
    var right_arm_3= bones[9];

    // LEFT ARM 
    var left_arm_1= bones[10];
    var left_arm_2= bones[11];
    var left_arm_3= bones[12];

    // TAIL
    var tail_1= bones[13];
    var tail_2= bones[14];
    var tail_3= bones[15];

    // LEFT LEG
    var left_leg_1= bones[16];
    var left_leg_2= bones[17];
    var left_leg_3= bones[18];
    var left_leg_4= bones[19];

    // RIGHT LEG
    var right_leg_1= bones[20];
    var right_leg_2= bones[21];
    var right_leg_3= bones[22];
    var right_leg_4= bones[23];
    let neck_rotation_offset = 0.3;
    let tail_1_rotation_offset = 0.3;

    let REPEAT_DELAY = 0;
    let TWEEN_TIME = 100;
	
	root.tweens = [];
    // RIGHT LEG FOX
    root.tweens[0] = new TWEEN.Tween(right_leg_1.rotation).to({x: right_leg_1.rotation.x, y: right_leg_1.rotation.y, z:  right_leg_1.rotation.z+Math.PI/4}, TWEEN_TIME);
    root.tweens[0].repeat(100);
    root.tweens[0].repeatDelay(REPEAT_DELAY);
    root.tweens[0].yoyo(true);
    
    root.tweens[1] = new TWEEN.Tween(right_leg_2.rotation).to({x: right_leg_2.rotation.x, y: right_leg_2.rotation.y, z:  right_leg_2.rotation.z-Math.PI/8}, TWEEN_TIME);
    root.tweens[1].repeat(100);
    root.tweens[1].yoyo(true);

    root.tweens[2] = new TWEEN.Tween(right_leg_3.rotation).to({x: right_leg_3.rotation.x, y: right_leg_3.rotation.y, z:  right_leg_3.rotation.z-Math.PI/4}, TWEEN_TIME);
    root.tweens[2].repeat(100);
    root.tweens[2].yoyo(true);

    // DEBUG
    //console.log("NECK 1:\n",neck.rotation);
    //console.log("LEFT LEG 1:\n",left_leg_1.rotation);
    
    // INVERT THE SEQUENCE FOR LEFT LEG
    let final_z=left_leg_1.rotation.z;
    left_leg_1.rotation.set(left_leg_1.rotation.x,left_leg_1.rotation.y,left_leg_1.rotation.z+Math.PI/4);


    // LEFT LEG FOX
    root.tweens[3] = new TWEEN.Tween(left_leg_1.rotation).to({x: left_leg_1.rotation.x, y: left_leg_1.rotation.y, z: final_z }, TWEEN_TIME);
    root.tweens[3].repeat(100);
    root.tweens[3].repeatDelay(REPEAT_DELAY);
    root.tweens[3].yoyo(true);


    final_z = left_leg_2.rotation.z;
    left_leg_2.rotation.set(left_leg_2.rotation.x,left_leg_2.rotation.y,left_leg_2.rotation.z-Math.PI/8);
    
    root.tweens[4] = new TWEEN.Tween(left_leg_2.rotation).to({x: left_leg_2.rotation.x, y: left_leg_2.rotation.y, z:  final_z}, TWEEN_TIME);
    root.tweens[4].repeat(100);
    root.tweens[4].yoyo(true);

    final_z = left_leg_3.rotation.z;
    left_leg_3.rotation.set(left_leg_3.rotation.x,left_leg_3.rotation.y,left_leg_3.rotation.z-Math.PI/4);

    root.tweens[5] = new TWEEN.Tween(left_leg_3.rotation).to({x: left_leg_3.rotation.x, y: left_leg_3.rotation.y, z: final_z }, TWEEN_TIME);
    root.tweens[5].repeat(100);
    root.tweens[5].yoyo(true);

    // left ARM FOX

    root.tweens[6] = new TWEEN.Tween(left_arm_1.rotation).to({x: left_arm_1.rotation.x, y: left_arm_1.rotation.y, z:  left_arm_1.rotation.z+Math.PI/4}, TWEEN_TIME);
    root.tweens[6].repeat(100);
    root.tweens[6].repeatDelay(REPEAT_DELAY);
    root.tweens[6].yoyo(true);
    
    root.tweens[7] = new TWEEN.Tween(left_arm_2.rotation).to({x: left_arm_2.rotation.x, y: left_arm_2.rotation.y, z:  left_arm_2.rotation.z-Math.PI/8}, TWEEN_TIME);
    root.tweens[7].repeat(100);
    root.tweens[7].yoyo(true);

    root.tweens[8] = new TWEEN.Tween(left_arm_3.rotation).to({x: left_arm_3.rotation.x, y: left_arm_3.rotation.y, z:  left_arm_3.rotation.z-Math.PI/4}, TWEEN_TIME);
    root.tweens[8].repeat(100);
    root.tweens[8].yoyo(true);

    // right ARM FOX
    
    final_z = right_arm_1.rotation.z;
    right_arm_1.rotation.set(right_arm_1.rotation.x,right_arm_1.rotation.y,right_arm_1.rotation.z+Math.PI/4);
    root.tweens[9] = new TWEEN.Tween(right_arm_1.rotation).to({x: right_arm_1.rotation.x, y: right_arm_1.rotation.y, z:final_z  }, TWEEN_TIME);
    root.tweens[9].repeat(100);
    root.tweens[9].repeatDelay(REPEAT_DELAY);
    root.tweens[9].yoyo(true);

    final_z = right_arm_2.rotation.z;
    right_arm_2.rotation.set(right_arm_2.rotation.x,right_arm_2.rotation.y, right_arm_2.rotation.z-Math.PI/8);
    root.tweens[10] = new TWEEN.Tween(right_arm_2.rotation).to({x: right_arm_2.rotation.x, y: right_arm_2.rotation.y, z:  final_z}, TWEEN_TIME);
    root.tweens[10].repeat(100);
    root.tweens[10].yoyo(true);

    final_z = right_arm_3.rotation.z;
    right_arm_3.rotation.set(right_arm_3.rotation.x,right_arm_3.rotation.y,right_arm_3.rotation.z-Math.PI/4);
    root.tweens[11] = new TWEEN.Tween(right_arm_3.rotation).to({x: right_arm_3.rotation.x, y: right_arm_3.rotation.y, z: final_z}, TWEEN_TIME);
    root.tweens[11].repeat(100);
    root.tweens[11].yoyo(true);

    // NECK ROTATION
    root.tweens[12] = new TWEEN.Tween(neck.rotation).to({x: neck.rotation.x, y: neck.rotation.y, z:  neck.rotation.z-neck_rotation_offset}, TWEEN_TIME);
    root.tweens[12].repeat(100);
    root.tweens[12].yoyo(true);

    // TAIL ROTATION
    root.tweens[13] = new TWEEN.Tween(tail_1.rotation).to({x: tail_1.rotation.x, y: tail_1.rotation.y, z:  tail_1.rotation.z-tail_1_rotation_offset}, TWEEN_TIME);
    root.tweens[13].repeat(100);
    root.tweens[13].yoyo(true);
    
	//console.log(" CORRI FOX!!!!! ", bones);
	for (let counter = 0; counter<14; counter+=1){
		root.tweens[counter].start();
	}				//console.log(dumpObject(root).join('\n'));
}
