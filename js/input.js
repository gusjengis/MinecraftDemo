var inputArr = [false,false,false,false,false,false]
var cameraDir = 0;
document.onkeydown = function(e){
    //console.log(e.keyCode);
    switch(e.keyCode){
        case 87:
            inputArr[0] = true;
        break;
        case 83:
            inputArr[1] = true;
        break;
        case 68:
            inputArr[2] = true;
        break;
        case 65:
            inputArr[3] = true;
        break;
        case 32:
            inputArr[4] = true;
        break;
        case 67:
            inputArr[5] = true;
        break;
        case 90:
            camera.zoom = 5;
            camera.updateProjectionMatrix();
        break;
    }
}
document.onkeyup = function(e){
    switch(e.keyCode){
        case 87:
            inputArr[0] = false;
        break;
        case 83:
            inputArr[1] = false;
        break;
        case 68:
            inputArr[2] = false;
        break;
        case 65:
            inputArr[3] = false;
        break;
        case 32:
            inputArr[4] = false;
        break;
        case 67:
            inputArr[5] = false;
        break;
        case 90:
            camera.zoom = 1;
            camera.updateProjectionMatrix();
        break;
    }
}
document.onclick = function(e){
    body.requestPointerLock();
    scene.remove(scene.getObjectByName(blockArr[blockIndex].cube.name));
    blockArr.splice(blockIndex,1);
    blockIndex = null;
    //console.log(blockArr[currentBlock]);
    //animate();
}
var cameraDirV = 0;
document.onmousemove = function(e){
    cameraDir -= (0.0015/2.25)*e.movementX;
    cameraDirV -= (0.0015/2.25)*e.movementY;
    if(cameraDirV >= pi/2){
        cameraDirV = pi/2-(0.0015/2.25);
    }
    if(cameraDirV <= -pi/2){
        cameraDirV = -pi/2+(0.0015/2.25);
    }
    look.y = sin(cameraDirV);
    look.x = cos(cameraDirV)*sin(cameraDir);
    look.z = cos(cameraDirV)*cos(cameraDir);
    camera.lookAt(camera.position.x + look.x,camera.position.y + look.y,camera.position.z + look.z);
    blockSelect();
}
const body = document.getElementById("body");
body.requestPointerLock = body.requestPointerLock ||
			     body.mozRequestPointerLock ||
			     body.webkitRequestPointerLock;
                 
body.requestPointerLock();
var look;
window.onload = function(){
    /**const crosshair = new THREE.Mesh( new THREE.PlaneGeometry( 0.0625/4, 0.0625/4, 32 ), new THREE.MeshBasicMaterial( { color: 0xffffff,map: loader.load('crosshair.jpg'), side: THREE.DoubleSide} ) );
    crosshair.position.z = 0;
    crosshair.position.x = 0;
    crosshair.position.y = -1;
    crosshair.lookAt(camera.position);
    camera.add( crosshair );*/
    look = camera.getWorldDirection();
    look.z = 1;
    camera.lookAt(look);
    //sun.position.set( camera.position.x+300*cos(1/7.2), camera.position.y+300*sin(1/7.2), camera.position.z );
   
    tick = 0;
    //console.clear();
    setInterval(function(){
        tick++;
        /**if(inputArr[0] == true && inputArr[3] == true){
            //WA
            camera.position.z += (((0.03**2+0.03**2)**(1/2))*cos(cameraDir);
            camera.position.x += 0.03*sin(cameraDir);
            camera.position.x += 0.03*cos(cameraDir);
            camera.position.z -= 0.03*sin(cameraDir);
        } else if(inputArr[0] == true && inputArr[2] == true){
            //WD
        } else if(inputArr[1] == true && inputArr[3] == true){
            //SA
        } else if(inputArr[1] == true && inputArr[2] == true){
            //SD
        } else {*/
            if(inputArr[0] == true){
                camera.position.z += 0.04*cos(cameraDir);
                camera.position.x += 0.04*sin(cameraDir);
            }
            if(inputArr[1] == true){
                camera.position.z -= 0.04*cos(cameraDir);
                camera.position.x -= 0.04*sin(cameraDir);
            }
            if(inputArr[2] == true){
                camera.position.x -= 0.04*cos(cameraDir);
                camera.position.z += 0.04*sin(cameraDir);
            }
            if(inputArr[3] == true){
                camera.position.x += 0.04*cos(cameraDir);
                camera.position.z -= 0.04*sin(cameraDir);
            }
        //}
        if(inputArr[4] == true){
            steve.y += 0.1;//0.03;
        }
        if(inputArr[5] == true){
            steve.y -= 0.1;
        }
        sun.position.set( camera.position.x+300*cos(tick*2*pi/(24000*7.2)), camera.position.y+300*sin(tick*2*pi/(24000*7.2)), camera.position.z+100*cos(tick*2*pi/(24000*7.2))-100*sin(tick*2*pi/(24000*7.2))+100 );
        directionalLight.position.set(cube.position.x+300*cos(tick*2*pi/(24000*7.2)),cube.position.y+300*sin(tick*2*pi/(24000*7.2)),cube.position.z+100*cos(tick*2*pi/(24000*7.2))-100*sin(tick*2*pi/(24000*7.2))+100);
        //directionalLight.target = cube;
        sun.lookAt(camera.position.x,camera.position.y,camera.position.z);
        //console.log(directionalLight.position);
        //console.log(directionalLight.position);
        gravity();
        blockSelect();
    },1000/144);
}
var player = function(){
    this.y = 1.5;
    this.vV = 0;
    this.gY = 1.5;
}
var steve = new player;
function gravity(){
    if(steve.y <= steve.gY){
        steve.y = steve.gY;
        steve.yV = 0;
    } else if(steve.y > steve.gY){
        //steve.yV -= 9.8/(10000);
    }
    //console.log(steve.yV+","+tick);
    steve.y += steve.yV;
    camera.position.y = steve.y;
}
var currentBlock;
var blockIndex;
function blockSelect(){
    this.xD = (4.5**2)/3**(1/2);
    this.yD = (4.5**2)/3**(1/2);
    this.zD = (4.5**2)/3**(1/2);
    this.x;
    this.y;
    this.z;
    selectionRay.set( camera.position, camera.getWorldDirection());
    for(i=1;i<blockArr.length;i++){
        if(selectionRay.intersectsBox(blockArr[i].box) == true){
            if((((abs(camera.position.x)-abs(blockArr[i].cube.position.x))**2 + (abs(camera.position.y)-abs(blockArr[i].cube.position.y))**2 + (abs(camera.position.z)-abs(blockArr[i].cube.position.z))**2)**(1/2)) > 4.5){
            } else if((this.xD**2 + this.yD**2 + this.zD**2)**(1/2)  >  ((camera.position.x-blockArr[i].cube.position.x)**2 + (camera.position.y-blockArr[i].cube.position.y)**2 + (camera.position.z-blockArr[i].cube.position.z)**2)**(1/2)){
                this.xD = abs(camera.position.x-blockArr[i].cube.position.x);
                this.yD = abs(camera.position.y-blockArr[i].cube.position.y);
                this.zD = abs(camera.position.z-blockArr[i].cube.position.z);
                this.x = blockArr[i].cube.position.x;
                this.y = blockArr[i].cube.position.y;
                this.z = blockArr[i].cube.position.z;
                currentBlock = i;
            }
        }
    }
    if(currentBlock == null){
        selectionEdge.material.opacity = 0;
        return 0;
    } else {
        selectionEdge.position.x = this.x;
        selectionEdge.position.y = this.y;
        selectionEdge.position.z = this.z;
        selectionEdge.material.opacity = 1;
        blockIndex = currentBlock;
        currentBlock = null;
    }

}