class BaseGameObject {
    constructor(tag, colTag) {
        this.id = G.generateID();
        this.threeObj = null;
        this.position = new THREE.Vector3;
        this.vel = new THREE.Vector3;
        this.colTag = colTag || 0x00000000;
        this.tag = tag || 0x00000000;
        // console.log(this.id,this.colTag,this.tag)
    }
    setThreeObj(mesh) {
        this.threeObj = mesh;
        // this.position = mesh.position.clone();
        mesh.gameObj = this;
        mesh.up = new THREE.Vector3(0,1,0);
    }
}