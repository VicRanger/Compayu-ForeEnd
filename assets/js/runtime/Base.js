console.log('Base loaded');

class Base extends BaseGameObject {
    constructor(name) {
        super(0, 0);
        this.controller = null;
        this.updateFunc = null;
        this.enterFunc = null;
        this.name = name;
    }
    setThreeObj(mesh) {
        super.setThreeObj(mesh);
        this.controller = new GameObjectController(this.threeObj);
        mesh.material.emissive = new THREE.Color().setRGB(1,1,1);
        mesh.material.emissiveIntensity = 0;
    }
    setUpdateFunc(func) {
        this.updateFunc = func;
    }
    setEnterFunc(func) {
        this.enterFunc = func;
    }
    setInitFunc(func) {
        this.initFunc = func;
    }
    runEnterFunc() {
        if (this.enterFunc) {
            this.enterFunc(this);
        }
    }
    runInitFunc() {
        if (this.initFunc) {
            this.initFunc(this);
        }
    }
    update() {
        if (this.updateFunc) {
            this.updateFunc(this);
        }
    }
}