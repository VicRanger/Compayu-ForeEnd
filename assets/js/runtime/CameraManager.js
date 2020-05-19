class CameraManager {
    constructor(camera) {
        this.camera = camera;
        this.focusObj = null;
        this.focusType = 0;
        this.rotationTween = null;
        this.positionTween = null;
        this.isAnimRotation = false;
        this.isAnimPosition = false;
        this.isRejectAnim = false;
    }
    lookAt(obj) {
        this.focusObj = obj;
        this.focusType = 1;
        this.clearPositionAnim();
        this.clearRotationAnim();
        // console.log(obj);
        tweenHemiLight(hemiLightColorDic[obj.name], 1);
    }
    isFocusing() {
        return this.focusType > 0;
    }
    stopFocus() {
        this.focusObj = null;
        this.focusType = 0;
        this.clearPositionAnim();
        this.clearRotationAnim();
        this.setToOrigin();
    }
    setToOrigin() {
        var callback = () => {
            // this.isRejectAnim = false;
        }
        // this.isRejectAnim = true;
        // this.animatePosition(new THREE.Vector3(0, 0, cameraDepth), 2);
        TweenMax.to(this.camera.rotation, 1, {
                z: 0
            }
        )
}
update(obj) {
    switch (this.focusType) {
        case 1:
            this.updateCloseFocus();
            break;
        default:
            if (!G.isUnitClick && !this.isRejectAnim && !G.isPlayTutorial) {
                let fac = Math.PI / 3;
                let mouseSpeed = 0.5;
                let tMouseX = mouseXn;
                let tMouseY = mouseYn;
                if (Math.abs(mouseXn) < 0.4) {
                    tMouseX = 0;
                }
                if (Math.abs(mouseYn) < 0.4) {
                    tMouseY = 0;
                }
                this.camera.rotation.y += -mouseSpeed * tMouseX * fac * T.getDelta();
                this.camera.rotation.y = Math.max(this.camera.rotation.y, -fac);
                this.camera.rotation.y = Math.min(this.camera.rotation.y, fac);
                this.camera.rotation.x += mouseSpeed * tMouseY * fac * T.getDelta();
                this.camera.rotation.x = Math.max(this.camera.rotation.x, -fac);
                this.camera.rotation.x = Math.min(this.camera.rotation.x, fac);
            }
            break;
    }
}
updateCloseFocus() {
    this.camera.lookAt(this.focusObj.threeObj.position);
}
animateRotation(rot, duration = 1, callback = null) {
    if (this.focusType > 0) {
        return;
    }
    this.clearRotationAnim();
    this.isAnimRotation = true;
    this.rotationTween = TweenMax.to(this.camera.rotation, duration, {
        x: rot.x,
        y: rot.y,
        z: rot.z,
        onComplete: () => {
            this.isAnimRotation = false;
            if (callback) {
                callback();
            }
        }
    })
}
animatePosition(pos, duration = 1, callback = null) {
    if (this.focusType > 0) {
        return;
    }
    this.clearPositionAnim();
    this.isAnimRotation = true;
    this.positionTween = TweenMax.to(this.camera.position, duration, {
        x: pos.x,
        y: pos.y,
        z: pos.z,
        onComplete: function () {
            this.isAnimPosition = false;
            if (callback) {
                callback();
            }
        }
    })
}
clearRotationAnim() {
    if (this.rotationTween) {
        this.rotationTween.kill();
        this.isAnimRotation = false;
    }
}
clearPositionAnim() {
    if (this.positionTween) {
        this.positionTween.kill();
        this.isAnimPosition = false;
    }
}
}