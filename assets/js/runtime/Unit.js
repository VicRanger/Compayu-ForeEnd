console.log('Unit Loaded');
/*
look at使(0,0,1)朝向目标点，使up尽量达到朝上的状态
 */
// var speedPara = 12;
class Unit extends BaseGameObject {
    constructor(maxVel) {
        //common attributes
        super(TAG.UNIT, COLTAG.UNIT);
        this.maxVel = random(maxVel * 0.75, maxVel);
        this.accVel = new THREE.Vector3;
        this.flock = null;
        this.position = new THREE.Vector3();
        this.vel = new THREE.Vector3();
        this.lightColor = new THREE.Color().setHSL(0, 0, 1);
        this.deltaTime = 0;
        this.thought = null;
        this.name = null;
        // console.log('Unit Created')
    }
    setThought(thought){
        this.thought = thought;
    }
    setThreeObj(mesh) {
        super.setThreeObj(mesh);
        mesh.material.emissive = this.lightColor;
        mesh.material.emissiveIntensity = 0;
    }
    addLight(color) {
        var light = new THREE.PointLight(color, 0.05, 0.8);
        // console.log('light added')
        light.position.add(new THREE.Vector3(0, 2, 0))
        light.layers.set(1);
        // this.position.add(new THREE.Vector3(0,0,1))
        this.threeObj.attach(light)
    }
    setColor(color) {
        if (!this.threeObj) return;
        this.threeObj.material.color = new THREE.Color(color);

    }
    setFlock(flock) {
        this.flock = flock;
        this.name = flock.name;
        this.flock.addUnit(this);
    }
    addRange() {
        // apply velocity vector indicator
        this.dirThreeObj = new THREE.Line();
        this.dirThreeObj.gameObj = this;
        this.dirThreeObj.geometry = new THREE.Geometry();
        this.dirThreeObj.geometry.vertices = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0)];
        this.dirThreeObj.material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        })
        // if (G.i) {
        //     this.threeObj.attach(this.dirThreeObj);
        // }
    }
    updateVelocity() {
        var sepCount = 0;
        var sepSteering = new THREE.Vector3();
        for (var i=0;i<baseList.length;i++) {
            var o = baseList[i];
            var dis = this.position.distanceTo(o.position);
            if (dis < unitBasicRad * 25) {
                sepCount++;
                sepSteering.add(this.position.clone().sub(o.position)
                    .multiplyScalar(5 / dis));
            }
        }
        if (sepCount > 0) {
            sepSteering.multiplyScalar(1.0 / sepCount * 5)
            this.accVel.add(sepSteering)
        }
        this.vel.add(this.accVel.clone().multiplyScalar(this.deltaTime));
        this.accVel.multiplyScalar(0);
        this.vel.normalize().multiplyScalar(this.maxVel);
    }
    updatePosition() {
        this.position.add(this.vel.clone().multiplyScalar(this.deltaTime));
        this.threeObj.position.copy(this.position);
    }
    updateRotation() {
        this.threeObj.lookAt(this.position.clone().add(this.vel));
        this.threeObj.rotateX(d2r(-90));
        this.threeObj.rotateZ(d2r(180));

    }
    updateFlock() {
        if (!(this.flock)) {
            return;
        }
        var avgSpeed = new THREE.Vector3;
        var avgPos = new THREE.Vector3;
        var sepCount = 0;
        var flockCount = 0;
        var sepSteering = new THREE.Vector3();
        for (var i = 0; i < this.flock.unitList.length; i++) {
            var o = this.flock.unitList[i];
            if (this.id == o.id) continue;
            var dis = this.position.distanceTo(o.position)
            if (dis > 0 && dis < unitBasicRad*20) {
                flockCount++;
                avgSpeed.add(this.flock.unitList[i].vel);
                avgPos.add(this.flock.unitList[i].position);
                if (dis < 2.5) {
                    sepCount++;
                    sepSteering.add(this.position.clone().sub(o.position)
                        .multiplyScalar(1 / dis));
                }
            }
        }
        if (flockCount > 0) {
            var alignSteering = avgSpeed.multiplyScalar(1 / flockCount).sub(this.vel.clone().multiplyScalar(1)).multiplyScalar(2);
            var cohesionSteering = avgPos.multiplyScalar(1 / flockCount).sub(this.position).sub(this.vel.clone().multiplyScalar(1)).multiplyScalar(1);
            this.accVel.add(alignSteering);
            this.accVel.add(cohesionSteering);
        }
        if (sepCount > 0) {
            sepSteering.multiplyScalar(1.0 / sepCount * 5)
            this.accVel.add(sepSteering)
        }
    }
    updateBorder() {
        // return;
        var r = Math.max(borderX,borderY);
        var offset =r*r * 0.5;
        var dis = this.position.lengthSq() - offset;
        if (dis > 0) {
            this.accVel.multiplyScalar(0);
            this.vel.add(this.position.clone().multiplyScalar(-(dis) / 1000 * this.maxVel * this.deltaTime));
        }
    }
    updateDebugDirVec() {
        // this.vel.normalize();
    }
    updateDebugRange() {
        for (var i = 0; i < this.rangeCircleNum * this.rangeOneCircleNum; i++) {
            var o = this.rangeThreeObjs[i];
            if (this.rangeCheck[i]) {
                o.material.color.set(0xff0000);
            } else {
                o.material.color.set(0x00ff00);
            }
        }
    }
    update() {
        this.deltaTime = T.getDelta() * (this.flock ? this.flock.timeScale : 1);
        this.updateDebugRange();
        this.updateDebugDirVec();
        this.updateFlock();
        this.updateBorder();
        this.updateVelocity();
        this.updatePosition();
        this.updateRotation();
    }
}
var count = 0;