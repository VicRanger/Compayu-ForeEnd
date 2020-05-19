function screenToWorld(x, y) {
    // screen pixel(origin: left-bottom) to screen gl (origin: left-top)
    let pX = x / screenX * 2 - 1;
    let pY = y / screenY * 2 - 1;
    return new THREE.Vector3(pX, pY, 0.98).unproject(mainCamera)
}

function calcWorldXY() {
    let p = screenToWorld(0, 0);
    worldX = -p.x * 2;
    worldY = -p.y * 2;
    worldZ = worldY * 1.5;
    borderX = worldX * extendRatio;
    borderY = worldY * extendRatio;
    borderZ = worldZ * extendRatio * 1.5;
    cameraDepth = worldZ * 2.2;
}

function random(l, r) {
    return l + (r - l) * Math.random();
}

function d2r(deg) {
    return deg / 180.0 * Math.PI;
}
var axisX = new THREE.Vector3(1, 0, 0);
var axisY = new THREE.Vector3(0, 1, 0);
var axisZ = new THREE.Vector3(0, 0, 1);

function tweenHemiLight(lightColor, time) {
    // console.log(lightColor);
    let color = JSON.parse(JSON.stringify(lightColor));
    // color.skyColor.ease = Power2.easeIn;
    // color.groundColor.ease = Power2.easeIn;
    TweenMax.to(bgHemiLight.color, time,
        color.skyColor
    )
    TweenMax.to(bgHemiLight.groundColor, time,
        color.groundColor
    )
    TweenMax.to(wdHemiLight.color, time,
        color.skyColor
    )
    TweenMax.to(wdHemiLight.groundColor, time,
        color.groundColor
    )
}

function interpFloat(l, r, p) {
    return l + (r - l) * p;
}

function interpColor(c1, c2, p) {
    return {
        r: c1.r * (1 - p) + c2.r * p,
        g: c1.g * (1 - p) + c2.g * p,
        b: c1.b * (1 - p) + c2.b * p
    }
}

function loadLights() {
    var skyColor = hemiLightColorDic.default.skyColor;
    var bgColor = hemiLightColorDic.default.groundColor;
    bgHemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, .9);
    bgHemiLight.color.setRGB(skyColor.r, skyColor.g, skyColor.b);
    bgHemiLight.groundColor.setRGB(bgColor.r, bgColor.g, bgColor.b);
    background3D.add(bgHemiLight);
    // var hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 1);
    // background3D.add(hemiLightHelper);
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // soft white light
    world3D.add(ambientLight);
    wdHemiLight = new THREE.HemisphereLight(0x2f80ed, 0x56aCee, 0.6);
    wdHemiLight.color.setRGB(skyColor.r, skyColor.g, skyColor.b);
    wdHemiLight.groundColor.setRGB(bgColor.r, bgColor.g, bgColor.b);
    world3D.add(wdHemiLight);
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(-1, 0, 1);
    world3D.add(directionalLight);
    var shadowHemiLight = new THREE.HemisphereLight(0xffffff, 0xcccccc, 0.3);
    world3D.add(shadowHemiLight);
    // var spotLight = new THREE.SpotLight();
    // spotLight.color.setRGB(1, 1, 1);
    // spotLight.position.set(0, 0, 1);
    // spotLight.penumbra = 1;
    // spotLight.angle = Math.PI / 2.5;
    // spotLight.decay = 2;
    // spotLight.intensity = 0.25;
    // background3D.add(spotLight);
    // for (i in baseSettings) {
    //     var o = baseSettings[i];
    //     var p = o.lightPosition;
    //     var c = hemiLightColorDic[o.name].skyColor;
    //     var spotLight = new THREE.SpotLight();
    //     spotLight.position.set(p.x * worldX, p.y * worldY, p.z * worldZ);
    //     spotLight.color.setRGB(c.r, c.g, c.b);
    //     spotLight.penumbra = 1;
    //     spotLight.angle = Math.PI /3;
    //     spotLight.decay = 2;
    //     spotLight.intensity = o.lightIntensity;
    //     console.log(c);
    //     background3D.add(spotLight);
    // }
    // console.log(spotLight);
}

function loadBorder() {
    var mesh = new THREE.Mesh();
    console.log(Math.max(borderY, borderX));
    mesh.geometry = new THREE.SphereBufferGeometry(Math.max(borderX, borderY), 128, 128)
    mesh.material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        side: THREE.BackSide,
        transparent: true,
        opacity: 1,
    });
    var go = new BaseGameObject(TAG.STATIC, COLTAG.STATIC)
    go.setThreeObj(mesh)
    background3D.add(mesh)
    wallMeshList.push(mesh)
}

function loadBases() {
    for (let setting of baseSettings) {
        var meshData = meshLoadDic[setting.baseModelName].meshData.children[0].clone();
        var mesh = new THREE.Mesh();
        mesh.geometry = meshData.geometry.clone();
        mesh.material = new THREE.MeshLambertMaterial({
            transparent: true,
            opacity: 1
        });
        mesh.scale.multiplyScalar(1.75);
        // mesh.receiveShadow = true;
        world3D.add(mesh);
        var o = new Base(setting.name);
        o.setThreeObj(mesh);
        o.setUpdateFunc(setting.updateFunc);
        o.setEnterFunc(setting.enterFunc);
        o.setInitFunc(setting.initFunc);
        o.runInitFunc();
        baseList.push(o);
        baseDic[o.name] = o;
    }
}

function addUnit(type, position, vel, flock, thought) {
    var meshData = meshLoadDic[type + 'Unit'].meshData.children[0].clone();
    var mesh = new THREE.Mesh();
    mesh.geometry = meshData.geometry.clone();
    mesh.material = new THREE.MeshLambertMaterial({})
    mesh.scale.multiplyScalar(0.75);
    mesh.receiveShadow = true;
    var rangeMat = new THREE.MeshBasicMaterial({
        visible: false,
        alphaTest: 0,
        // transparent:true,opacity:0.8,
    });
    var rangeMesh = new THREE.Mesh();
    rangeMesh.material = rangeMat;
    rangeMesh.geometry = meshData.geometry.clone();
    rangeMesh.scale.multiplyScalar(1.5);
    mesh.attach(rangeMesh);
    world3D.add(mesh);
    var o = new Unit(flockSettings[type].speed);
    o.position = position.clone();
    o.vel = vel.clone();
    o.setThreeObj(mesh);
    o.setFlock(flock);
    o.setThought(thought);
    rangeMeshList.push(rangeMesh);
    unitList.push(o);
    unitMeshList.push(mesh);
    collisionMeshList.push(mesh);
    addRangeMeshEvents(rangeMesh);
    return o;
}

function loadFlocks() {
    for (type in flockSettings) {
        var setting = flockSettings[type];
        let flock = new Flock(type);
        flockDic[type] = flock;
        for (let j = 0; j < database.thoughts[type].length; j++) {
            var thought = database.thoughts[type][j];
            var position = new THREE.Vector3(random(-worldX, worldX), random(-worldY, worldY), random(-worldZ, 0));
            var vel = new THREE.Vector3(random(-10, 10), random(-10, 10), random(-10, 10));
            addUnit(type, position, vel, flock, thought);
        }
    }
}

function changeMouseShape(style) {
    document.body.style.cursor = style;
}

function onMouseMove(e) {
    var e = e || window.event;
    mouseX = e.clientX;
    mouseXn = (e.clientX - screenX / 2) / screenX * 2;
    mouseY = e.clientY;
    mouseYn = -(e.clientY - screenY / 2) / screenY * 2;
    if (!G.isEnterWorld) {
        $('#center-box').css({
            'transform': `rotateX(${mouseYn*5}deg) rotateY(${mouseXn*5}deg)`
        })
    }
}

function onWindowResize() {
    mainCamera.aspect = window.innerWidth / window.innerHeight;
    mainCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    screenX = window.innerWidth;
    screenY = window.innerHeight;
    calcWorldXY();
    console.log(`screenX: ${screenX}, screenY: ${screenY}`);
    console.log(`worldX: ${worldX}, worldY: ${worldY}`);
}

function onWindowClick(e) {
    if (mainCameraManager.focusType > 0 || G.isPlayTutorial) {
        stopFocus();
        G.isStopMeshClick = true;
        setTimeout(() => {
            G.isStopMeshClick = false;
        }, 300);
    }
    // window.event ? window.event.cancelBubble = true : e.stopPropagation();
}

function stopFocus() {
    if (G.clickUnit) {
        // console.log(G.clickUnit)
        TweenMax.to(G.clickUnit.threeObj.material, 1, {
            emissiveIntensity: 0
        })
    }
    if (G.clickBase) {
        // console.log(G.clickBase)
        TweenMax.to(G.clickBase.threeObj.material, 1, {
            emissiveIntensity: 0
        })
    }
    // setTimeout(() => {
    G.isUnitClick = false;
    G.clickUnit = null;
    G.clickBase = null;
    // }, 100)
    mainCameraManager.stopFocus();
    UI.hideThought();
    UI.hideExpress();
}

function rangeMeshOnMouseOver(e) {
    if (G.isUnitMouseOver || G.isUnitClick || e.intersect.distance < 5) {
        return;
    }
    changeMouseShape('pointer');
    G.isUnitMouseOver = true;
    let mesh = e.target.parent;
    if (mesh) {
        TweenMax.to(mesh.material, 1, {
            emissiveIntensity: 1
        })
    }
    let flock = e.target.parent.gameObj.flock || null;
    if (flock) {
        TweenMax.to(flock, 0.3, {
            timeScale: 0.05
        });
        // tweenHemiLight(hemiLightColorDic[flock.name], 1)
    }
}

function rangeMeshOnMouseOut(e) {
    changeMouseShape('auto');
    let mesh = e.target.parent;
    if (mesh && mesh != G.clickUnit) {
        TweenMax.to(mesh.material, 1, {
            emissiveIntensity: 0
        })
    }
    let flock = e.target.parent.gameObj.flock || null;
    if (flock) {
        TweenMax.to(flock, 0.5, {
            timeScale: 1
        });
    }
    G.isUnitMouseOver = false;
}

function rangeMeshOnClick(e) {
    if (!G.isEnterWorld || G.isStopMeshClick || G.isPlayTutorial || e.intersect.distance < 5) {
        stopFocus();
        return;
    }

    let obj = e.target.parent.gameObj || null;
    if (obj) {
        G.clickUnit = obj;
        mainCameraManager.lookAt(obj);
        console.log(mainCameraManager.focusType);
        TweenMax.to(obj.threeObj.material, 1, {
            emissiveIntensity: 1
        })
        G.isUnitClick = true;
        UI.showThought();
    }
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
}

function baseMeshOnMouseOver(e) {
    if (G.isUnitMouseOver || G.isUnitClick || e.intersect.distance < 5) {
        return;
    }
    changeMouseShape('pointer');
    G.isUnitMouseOver = true;
    let mesh = e.target;
    if (mesh) {
        TweenMax.to(mesh.material, 1, {
            emissiveIntensity: 1
        })
    }
}

function baseMeshOnMouseOut(e) {
    changeMouseShape('auto');
    G.isUnitMouseOver = false;
    let mesh = e.target;
    if (mesh) {
        TweenMax.to(mesh.material, 1, {
            emissiveIntensity: 0
        })
    }
}

function baseMeshOnClick(e) {
    if (G.isStopMeshClick || G.isPlayTutorial) {
        stopFocus();
        return;
    }
    let obj = e.target.gameObj || null;
    if (obj) {
        G.clickBase = obj;
        mainCameraManager.lookAt(obj);
        UI.showExpress();
        G.isStopWindowClick = true;
        setTimeout(() => {
            G.isStopWindowClick = false;
        }, 200);
    }
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
}

function addBaseMeshEvents(baseMesh) {
    domEvents.addEventListener(baseMesh, "mouseover", baseMeshOnMouseOver);
    domEvents.addEventListener(baseMesh, "mouseout", baseMeshOnMouseOut);
    domEvents.addEventListener(baseMesh, "click", baseMeshOnClick);
}

function addRangeMeshEvents(rangeMesh) {
    domEvents.addEventListener(rangeMesh, "mouseover", rangeMeshOnMouseOver);
    domEvents.addEventListener(rangeMesh, "mouseout", rangeMeshOnMouseOut)
    domEvents.addEventListener(rangeMesh, "click", rangeMeshOnClick)
}

// function addRangeMeshesEvents() {
//     for (key in rangeMeshList) {
//         let rangeMesh = rangeMeshList[key]
//         addRangeMeshEvents(rangeMesh);
//     }
// }

function addBaseMeshesEvents() {
    for (let base of baseList) {
        addBaseMeshEvents(base.threeObj);
    }
}

function addEvents() {
    console.log('Events Added');
    // addRangeMeshesEvents();
    addBaseMeshesEvents();
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onWindowResize, false);
    $('canvas').on("click", onWindowClick);

}

function loadModels() {
    for (key in meshLoadDic) {
        let data = meshLoadDic[key];
        data.modelLoader = new ModelLoader(meshLoadUrl, data.fileName, (mesh) => {
            data.meshData = mesh.clone();
        }, (progress) => {
            data.setLoadProgress(progress);
        })
        data.modelLoader.loadMesh();
    }
}

function loadAudios() {
    for (key in audioLoadDic) {
        let data = audioLoadDic[key];
        data.player = new Tone.Player(
            data.fileUrl,
            () => {
                data.setLoadProgress();
            }).toMaster();
    }
}

function doEnter() {
    for (let base of baseList) {
        base.runEnterFunc();
    }
    network.initWebsocket();
}

function addThoughtByData(data) {
    console.log('addThoughtByData',data);
    let base = baseDic[data['type_raw']];
    console.log(base);
    console.log(database.thoughts);
    console.log(data['type_raw']);
    database.thoughts[data['type_raw']].push(data);
    var o = addUnit(base.name, base.threeObj.position.clone().add(new THREE.Vector3(0, 0, -2)), new THREE.Vector3(random(-1, 1), random(-1, 1), random(-1, 1)), flockDic[base.name], data);
    TweenMax.fromTo(o, 1, {
        maxVel: 0.01
    }, {
        maxVel: o.maxVel
    })
    return o;
}