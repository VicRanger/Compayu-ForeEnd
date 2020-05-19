console.log('Start Load')
var unitBasicRad = 0.3,
    unitInitialNum = 50;
var world3D, background3D, mainCamera, renderer, orbitController = null;
var bgHemiLight, wdHemiLight;
var domEvents = null;
var stats = null;
var unitList = [];
var flockDic = {};
var unitMeshList = [];
var rangeMeshList = [];
var wallMeshList = [];
var collisionMeshList = [];
var baseList = [];
var baseDic = {};
var mainCameraManager = null;
var screenX = 0;
var screenY = 0;
var worldX = 0;
var worldY = 0;
var worldZ = 0
var borderX = 0;
var borderY = 0;
var worldZ = 0;
var mouseX = 0;
var mouseY = 0;
var mouseXn = 0;
var mouseYn = 0;
var extendRatio = 4;
var cameraDepth = 10;
var isDebugEnable = false;
var TAG = {
    UNIT: 0x00000010,
    STATIC: 0x00000001
}
var COLTAG = {
    UNIT: 0x00000011,
    STATIC: 0x11111111
}

var G = new (function G() {
    this.id = 0;
    this.isUnitMouseOver = false;
    this.loadWebProgress = 0;
    this.loadAudioProgress = 0;
    this.loadedAudio = 0;
    this.isUnitClick = false;
    this.isEnterWorld = false;
    this.isSetLogin = false;
    this.loadProgress = 0;
    this.loadModelProgress = 0;
    this.isLoadComplete = false;
    this.clickUnit = null;
    this.clickBase = null;
    this.isStopMeshClick = false;
    this.isPlayTutorial = true;
    this.isStopWindowClick = false;

    this.setLoadComplete = function () {
        this.isLoadComplete = true;
    }
    this.setLoadingBar = function (percent) {
        $('.loading-box').animate({
            'width': `${percent*100}%`
        }, 500, 'easeInOutQuint')
    }
    this.generateID = function () {
        return ++this.id;
    }
    this.updateLoadProgress = function () {
        if(this.isLoadComplete){
            return;
        }
        this.loadProgress = this.loadWebProgress*0.6 
        + this.loadModelProgress*0.2
        +this.loadAudioProgress*0.2;
        this.setLoadingBar(this.loadProgress);
        if (1-this.loadProgress < 1e-6 && 1-network.downloadStatus() < 1e-6) {
            setTimeout(() => {
                loadWorld();
                addEvents();
                UI.setLogin();
                // UI.setEnter();
                this.setLoadComplete();
            }, 1000);
            this.isLoadComplete = true;
        }
    }
    this.updateLoadWebProgress = function(percent){
        this.loadWebProgress = percent/100;
        this.updateLoadProgress();
    }
    this.updateLoadAudioProgress = function(){
        this.loadedAudio ++;
        this.loadAudioProgress = this.loadedAudio / Object.keys(audioLoadDic).length;
        this.updateLoadProgress();
    }
    this.updateLoadModelProgress = function () {
        let progress = 0;
        let loadCount = Object.keys(meshLoadDic).length;
        for (key in meshLoadDic) {
            let data = meshLoadDic[key];
            progress += data.loadProgress;
        }
        this.loadModelProgress = progress / loadCount;
        this.updateLoadProgress();
    }
    return this;
});

Pace.on("update", function (percent) {
    G.updateLoadWebProgress(percent);
});
var T = (function () {
    this.deltaTime = 0;
    this.clockTime = 0;
    this.timeScale = 1;
    return this;
})()
T.getDelta = function () {
    return this.timeScale * this.deltaTime;
}
T.reset = function () {
    this.deltaTime = 1 / 60;
    this.clockTime = Date.now() / 1000
}
T.tick = function () {
    let clock = Date.now() / 1000;
    this.deltaTime = clock - this.clockTime;
    this.clockTime = clock;
}
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};