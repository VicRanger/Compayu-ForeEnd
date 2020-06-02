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
    sadBase: new MeshLoadData('Worry_base'),
    sadUnit: new MeshLoadData('Worry_fly'),
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
    sad: {
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
    sad: {
        speed: 10,
        unitModelName: 'sadUnit'
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
    name: 'sad',
    lightPosition: {
        x: 0,
        y: -0.1,
        z: 0.1
    },
    lightIntensity: 0.6,
    baseModelName: 'sadBase',
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
    this.classifySvg = `
    <svg viewBox="0 0 1024 1024" width="2rem" height="2rem" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17101" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M196.1 989.7c-9.1 0-17.6-3.5-24-9.9-6.3-6.3-9.9-15-9.9-24v-236c0-1.9-1.4-3.5-3.3-3.8-39.1-5.1-108.4-19.7-133.7-60.7-12.4-20.1-13.5-44.2-3.1-67.7 27.2-61.2 72.5-105.4 97-126.2 0.7-0.6 1.2-1.5 1.3-2.4 8.9-71.3 71.3-426.8 428.7-426.8 194.6 0 351.9 88.1 420.8 235.5 73.4 157.3 30.3 352.4-118.3 535.4-0.6 0.7-0.8 1.5-0.8 2.4V950c0 18.7-15.2 33.9-33.9 33.9S783 968.7 783 950V791.8c0-8 2.8-15.7 7.9-21.8C929.1 604.9 972 432.1 908.6 296.2c-57.5-123-191.8-196.4-359.4-196.4-336.2 0-361.8 364.6-362.8 380.1-0.7 10.1-5.7 19.4-13.9 25.4-6.3 4.8-60.7 47.3-88.4 109.7-0.4 1-0.4 2.1 0 3 7.1 16.8 65.6 31.1 113.6 33.5 18.1 0.9 32.2 15.7 32.3 33.8V918c0 2.1 1.7 3.8 3.8 3.8h189.3c18.7 0 33.9 15.2 33.9 33.9s-15.2 33.9-33.9 33.9h-227z" p-id="17102"></path><path d="M583.9 687.3c-14.3 0-27.1-9-31.9-22.4l-21.3-62.3c-0.5-1.5-2-2.6-3.6-2.6H415.2c-1.6 0-3.1 1-3.6 2.5L389 665.4c-5.1 12.8-17.5 21.1-31.4 21.1-3.9 0-7.8-0.7-11.5-2-17.2-6.2-26.4-24.7-20.8-42.2l116.3-323.6c4.8-13.4 17.6-22.4 31.9-22.4 14.6 0.1 27.4 9.3 32 22.9l110.7 323.7c5.7 17.4-3.9 36.6-21.3 42.5-3.6 1.3-7.2 1.9-11 1.9z m-111.4-247c-1.6 0-3.1 1-3.6 2.5L438.7 527c-0.4 1.2-0.2 2.5 0.5 3.5s1.9 1.6 3.1 1.6h59c1.2 0 2.4-0.6 3.1-1.6 0.7-1 0.9-2.3 0.5-3.5l-28.8-84.2c-0.5-1.5-1.9-2.5-3.6-2.5z m225 244.5c-18.7 0-33.9-14.7-33.9-32.7V329.3c0-18 15.2-32.7 33.9-32.7s33.9 14.7 33.9 32.7v322.9c-0.1 18-15.3 32.6-33.9 32.6z" p-id="17103"></path></svg>`;
    this.postSvg = `
    <svg viewBox="0 0 1024 1024" width="2rem" height="2rem" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1160" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M908.647297 65.629743c10.293437 7.487531 14.502295 17.464767 12.631692 29.939893L801.524534 814.106596c-1.558495 9.046027-6.551206 16.060791-14.969946 21.049409-4.365424 2.494821-9.201569 3.745301-14.502295 3.745301-3.430122 0-7.17133-0.783853-11.228739-2.342348l-211.912387-86.541005L435.706895 888.020002c-5.615904 7.17133-13.254885 10.756995-22.924105 10.756995-4.053316 0-7.483438-0.623193-10.293437-1.870604-5.92392-2.182712-10.680247-5.848195-14.265912-10.992355s-5.380544-10.836813-5.380544-17.076934L382.842897 705.575764 787.022239 210.17993 286.943756 642.894166l-184.7784-75.785034c-11.539824-4.365424-17.775852-12.942777-18.711154-25.731034-0.624217-12.472056 4.364401-21.672602 14.969946-27.596522l778.412652-449.088158c4.680603-2.805906 9.66922-4.208858 14.969946-4.208858C898.046868 60.485583 903.658679 62.200644 908.647297 65.629743L908.647297 65.629743zM908.647297 65.629743" p-id="1161"></path></svg>`;
    this.closeSvg = `
    <svg viewBox="0 0 24 24" width="1.5rem" height="1.5rem"><path d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z" fill-rule="evenodd"></path></svg>`;
});