console.log('Flock Loaded');
var DEBUG = !1;
class Flock extends BaseGameObject {
    constructor(name) {
        super(0, 0);
        console.log('Flock Created');
        this.unitList = [];
        this.timeScale = 1;
        this.name = name;
    }
    setTimeScale(scale){
        this.timeScale = scale;
    }
    addUnit(o) {
        this.unitList.push(o)
    }
    calcVelocity() {
        if (this.unitList.length > 0) {
            return;
        }
        this.vel = new THREE.Vector3;
        for (let i = 0; i < this.unitList.length; i++) {
            let o = this.unitList[i];
            this.vel.add(o.vel);
        }
        this.vel.multiplyScalar(1 / this.unitList.length);
    }
    calcPosition() {
        if (this.unitList.length > 0) {
            return;
        }
        this.position = new THREE.Vector3;
        for (let i = 0; i < this.unitList.length; i++) {
            let o = this.unitList[i];
            this.position.add(o.vel);
        }
        this.position.multiplyScalar(1 / this.unitList.length);
    }
    update() {
        this.calcVelocity();
        this.calcPosition();
    }
}