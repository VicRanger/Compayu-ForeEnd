/*
0: happy
1: angry
2: sad
3: afraid
*/

var meshLoadUrl = "./assets/models/";

function MeshLoadData(fileName) {
    var ret = {};
    ret.fileName = fileName;
    ret.modelLoader = null;
    ret.meshData = null;
    ret.loadProgress = 0;
    ret.setLoadProgress = function (_loadProgress) {
        this.loadProgress = _loadProgress;
        G.updateLoadModelProgress();
    }
    return ret;
}

function AudioLoadData(fileUrl, autostart = false) {
    this.fileUrl = fileUrl;
    this.player = null;
    this.autostart = autostart;
    this.setLoadProgress = function () {
        G.updateLoadAudioProgress();
    }
    return this;
}
var meshLoadDic = {
    //用new创建时词法作用域才在MeshLoadData下
    happyBase: new MeshLoadData('Happy_base'),
    happyUnit: new MeshLoadData('Happy_fly'),
    angryBase: new MeshLoadData('Angry_base'),
    angryUnit: new MeshLoadData('Angry_fly'),
    worryBase: new MeshLoadData('Worry_base'),
    worryUnit: new MeshLoadData('Worry_fly'),
    disgustBase: new MeshLoadData('Disgust_base'),
    disgustUnit: new MeshLoadData('Disgust_fly'),
}
var audioLoadDic = {
    bg: new AudioLoadData('./assets/audio/1.mp3', true),
}
var hemiLightColorDic = {
    default: {
        groundColor: {
            r: 64,
            g: 64,
            b: 64
        },
        skyColor: {
            r: 32,
            g: 32,
            b: 32
        }
    },
    happy: {
        groundColor: {
            r: 255,
            g: 189,
            b: 206
        },
        skyColor: {
            r: 230,
            g: 106,
            b: 137
        }
    },
    angry: {
        groundColor: {
            r: 238,
            g: 130,
            b: 67

        },
        skyColor: {
            r: 232,
            g: 117,
            b: 67

        },
    },
    worry: {
        groundColor: {
            r: 64,
            g: 133,
            b: 211
        },
        skyColor: {
            r: 176,
            g: 213,
            b: 245
        }
    },
    disgust: {
        groundColor: {
            r: 145,
            g: 189,
            b: 142
        },
        skyColor: {
            r: 103,
            g: 169,
            b: 72
        }
    }
}
for (i in hemiLightColorDic) {
    let colors = hemiLightColorDic[i];
    for (j in colors) {
        let c = colors[j];
        c.r /= 255;
        c.g /= 255;
        c.b /= 255;
    }
}
var flockSettings = {
    happy: {
        speed: 10,
        unitModelName: 'happyUnit'
    },
    angry: {
        speed: 10,
        unitModelName: 'angryUnit'
    },
    worry: {
        speed: 10,
        unitModelName: 'worryUnit'
    },
    disgust: {
        speed: 10,
        unitModelName: 'disgustUnit'
    }
}

function generateEnterFunc(pos1, d1, pos2, d2) {
    return (base) => {
        let obj = base.threeObj;
        let tl = new TimelineMax();
        tl.to(obj.material, 0.3, {
                opacity: 1
            }, 0)
            .to(obj.position, 2, {
                x: worldX * pos1[0],
                y: worldY * pos1[1],
                z: worldZ * pos1[2],
                ease: Power1.easeOut
            }, d1)
            .to(obj.position, 3, {
                x: worldX * pos2[0],
                y: worldY * pos2[1],
                z: worldZ * pos2[2],
                ease: Power2.easeInOut

            }, d2);
    };
}

function generateInitFunc(pos) {
    return (base) => {
        let obj = base.threeObj;
        // obj.material.opacity = 0;
        obj.position.set(worldX * pos[0], worldY * pos[1], worldZ * pos[2]);
    }
}
var baseSettings = [{
    name: 'happy',
    lightPosition: {
        x: 0.5,
        y: 0,
        z: 0.1
    },
    lightIntensity: 0.6,
    baseModelName: 'happyBase',
    initFunc: generateInitFunc([0, 0, -10]),
    enterFunc: generateEnterFunc([-0.5, -0.5, 0], 1, [-baseRangeX, 0, 0.5], 4),
    updateFunc: (base) => {
        let obj = base.threeObj;
        obj.rotation.x += T.getDelta() * 0.15;
        obj.rotation.y -= T.getDelta() * 0.1;
    }
}, {
    name: 'angry',
    lightPosition: {
        x: -0.5,
        y: 0,
        z: 0.1
    },
    lightIntensity: 0.6,
    baseModelName: 'angryBase',
    initFunc: generateInitFunc([0, 0, -10]),
    enterFunc: generateEnterFunc([0.5, 0.5, 0], 1.5, [baseRangeX, 0, 0.5], 4),
    updateFunc: (base) => {
        let obj = base.threeObj;
        obj.rotation.x += T.getDelta() * 0.15;
        obj.rotation.y -= T.getDelta() * 0.1;
    }
}, {
    name: 'worry',
    lightPosition: {
        x: 0,
        y: -0.1,
        z: 0.1
    },
    lightIntensity: 0.6,
    baseModelName: 'worryBase',
    initFunc: generateInitFunc([0, 0, -10]),
    enterFunc: generateEnterFunc([-0.5, 0.5, 0], 2, [0, baseRangeY, 0.5], 4),
    updateFunc: (base) => {
        let obj = base.threeObj;
        obj.rotation.x += T.getDelta() * 0.15;
        obj.rotation.y -= T.getDelta() * 0.1;
    }
}, {
    name: 'disgust',
    lightPosition: {
        x: 0,
        y: 0.1,
        z: 0.1
    },
    lightIntensity: 0.6,
    baseModelName: 'disgustBase',
    initFunc: generateInitFunc([0, 0, -10]),
    enterFunc: generateEnterFunc([0.5, -0.5, 0.5], 2.5, [0, -baseRangeY, 0.5], 4),
    updateFunc: (base) => {
        let obj = base.threeObj;
        obj.rotation.x += T.getDelta() * 0.15;
        obj.rotation.y -= T.getDelta() * 0.1;
    }
}]
var svgData = new (function SvgData() {
    this.uploadSvg = `
    <svg viewBox="0 0 1024 1024" width="2rem" height="2rem"><path d="M268.939 186.181c5.725 0 10.333-4.143 10.333-9.309l0-27.927c0-5.167-4.608-9.309-10.333-9.309l-72.425 0c-5.725 0-10.333 4.143-10.333 9.309l0 27.927c0 5.12 4.608 9.309 10.333 9.309L268.939 186.181zM372.363 535.271c0 89.972 72.937 162.909 162.909 162.909S698.18 625.243 698.18 535.271s-72.937-162.909-162.909-162.909S372.363 445.299 372.363 535.271zM0 325.817l0 465.453c0 93.091 93.091 93.091 93.091 93.091l837.816 0c0 0 93.091 0 93.091-93.091L1023.998 325.817c0-93.091-93.091-93.091-93.091-93.091L744.725 232.726l-46.545-93.091L372.363 139.635l-46.545 93.091L93.091 232.726C93.091 232.727 0 232.727 0 325.817zM791.271 325.817c25.693 0 46.545 20.852 46.545 46.545 0 25.693-20.852 46.545-46.545 46.545-25.693 0-46.545-20.852-46.545-46.545C744.725 346.67 765.578 325.817 791.271 325.817zM535.271 325.817c115.665 0 209.454 93.789 209.454 209.454s-93.789 209.454-209.454 209.454-209.454-93.789-209.454-209.454S419.606 325.817 535.271 325.817z" ></path></svg>`;
    this.postSvg = `
    <svg viewBox="0 0 1024 1024"  width="2rem" height="2rem"><path d="M843.693959 293.609061 425.255869 712.056362 186.145026 472.947566 66.579883 592.504522 425.255869 951.165158 963.260126 413.174204Z" ></path></svg>`;
    this.closeSvg = `
    <svg viewBox="0 0 24 24" width="24" height="24"><path d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z" fill-rule="evenodd"></path></svg>`;
});