function update() {
    T.tick();
    // stats.update();
    for (var i = 0; i < unitList.length; i++) {
        var o = unitList[i];
        o.update();
    }
    for (let o of baseList) {
        o.update();
    }
    mainCameraManager.update();
    updateHemiLightColor();
    if (isDebugEnable) {
        debugUpdate();
    }
    renderer.render(background3D, mainCamera);
    renderer.render(world3D, mainCamera);
}

function debugUpdate() {
    $('#is-unit-click').text('' + G.isUnitClick);
    $('#camera-rot').text(`x:${mainCamera.rotation.x.toFixed(2)} y:${mainCamera.rotation.y.toFixed(2)} z:${mainCamera.rotation.z.toFixed(2)}`);
    $('#hemilight').text(`r:${bgHemiLight.color.r.toFixed(2)}, g:${bgHemiLight.color.g.toFixed(2)}, b:${bgHemiLight.color.b.toFixed(2)}`)
}

function refineColor(color, x, y) {
    if (x < 0.3 && y < 0.3) {
        color.skyColor.r *= 0.1 + x * 3;
        color.skyColor.g *= 0.1 + x * 3;
        color.skyColor.b *= 0.1 + x * 3;
        color.groundColor.r *= 0.1 + x * 3;
        color.groundColor.g *= 0.1 + x * 3;
        color.groundColor.b *= 0.1 + x * 3;
    }
}

function updateHemiLightColor() {
    if(mainCameraManager.isFocusing()){
        // tweenHemiLight(hemiLightColorDic[mainCameraManager.focusObj.name], 1);
        return;
    }
    var xLerp = -mainCamera.rotation.y / (Math.PI / 3);
    var yLerp = -mainCamera.rotation.x / (Math.PI / 3);
    var xOff = Math.abs(xLerp / 2);
    var yOff = Math.abs(yLerp / 2);
    var xyInterp = yOff / (xOff + yOff);
    let color = {};
    color.groundColor = interpColor(hemiLightColorDic['default'].groundColor,
        interpColor(interpColor(hemiLightColorDic['happy'].groundColor, hemiLightColorDic['angry'].groundColor, xLerp / 2 + 0.5), interpColor(hemiLightColorDic['worry'].groundColor, hemiLightColorDic['disgust'].groundColor, yLerp / 2 + 0.5), xyInterp), Math.max(xOff, yOff) * 2);
    color.skyColor = interpColor(hemiLightColorDic['default'].skyColor,
        interpColor(interpColor(hemiLightColorDic['happy'].skyColor, hemiLightColorDic['angry'].skyColor, xLerp / 2 + 0.5), interpColor(hemiLightColorDic['worry'].skyColor, hemiLightColorDic['disgust'].skyColor, yLerp / 2 + 0.5), xyInterp), Math.max(xOff, yOff) * 2);
    // refineColor(color,xOff,yOff);
    tweenHemiLight(color, 2);
    TweenMax.to(world3D.fog.color,2,color.groundColor);
}

function animate() {
    update();
    requestAnimationFrame(animate);
}
T.timeScale = 0.01;

function initStats() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0';
    stats.domElement.style.top = '0';
    $('#stats').append(stats.domElement);
}

function initScene() {
    mainCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    world3D = new THREE.Scene();
    background3D = new THREE.Scene();
    mainCameraManager = new CameraManager(mainCamera);
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        // antialias: true, //antialias:true/false是否开启反锯齿
        precision: "lowp", //precision:highp/mediump/lowp着色精度选择
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // options are THREE.BasicShadowMap | THREE.PCFShadowMap | THREE.PCFSoftShadowMap 
    renderer.autoClear = false;
    $('#canvas-container').append(renderer.domElement)
    domEvents = new THREEx.DomEvents(mainCamera, renderer.doElement)
    screenX = window.innerWidth;
    screenY = window.innerHeight;
    calcWorldXY();
    console.log(`screenX: ${screenX}, screenY: ${screenY}`);
    console.log(`worldX: ${worldX}, worldY: ${worldY}`);

    mainCamera.position.z = cameraDepth;
    renderer.setSize(screenX, screenY);

    // background3D.background = new THREE.Color().setHSL(1, 0, 1);
    world3D.fog = new THREE.Fog(new THREE.Color().setRGB(0.25, 0.25, 0.25), worldZ * 0.5, worldZ * 10);
}

function testLoadScene() {
    loadBorder();
    loadBases();
    loadFlocks();
    loadLights();
}

function loadWorld() {
    T.reset();
    // initStats();
    initScene();
    testLoadScene();
    animate();
}

function loadAssets() {
    network.downloadThought();
    loadAudios();
    loadModels();
}
loadAssets();

// window.addEventListener('keypress', function (e) {
//     console.log(e.keyCode);
//     switch (e.keyCode) {
//         case 120:
//             isDebugEnable = false;
//             break;
//         case 122:
//             isDebugEnable = true;
//             break;
//     }
// })
// $.get(
//     "http://127.0.0.1:8001/wte/init/",
//     {},
//     function(data,status){
//         console.log(data,status);
//     }
// )