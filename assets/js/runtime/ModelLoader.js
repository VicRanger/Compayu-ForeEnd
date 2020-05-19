class ModelLoader{
    constructor(url,fileName,onCompleteFunc,onProgressFunc){
        this.url = url;
        this.fileName = fileName;
        this.loader = null;
        this.loaded = 0;
        this.total = 0;
        this.onProgressFunc = onProgressFunc;
        this.onCompleteFunc = onCompleteFunc;
    }
    loadMesh(){
        if(!this.url || !this.fileName){
            console.log('url or filename error in ModelLoader');
        }
        var onComplete = (mesh)=>{
            this.onCompleteFunc(mesh);
        }
        var onProgress = (xhr)=>{
            if (xhr.lengthComputable) {
                this.loaded = xhr.loaded;
                this.total = xhr.total;
                this.onProgressFunc(Math.round(this.loaded/this.total, 2));
            }
        }
        this.loader = new THREE.OBJLoader();
        this.loader.setPath(this.url);
        this.loader.load(this.fileName+'.obj',onComplete,onProgress,null);
    }
}