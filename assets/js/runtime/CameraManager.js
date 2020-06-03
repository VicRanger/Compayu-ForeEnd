class CameraManager {
    constructor(camera, cameraDepth = 30) {
        this.camera = camera;
        this.focusObj = null;
        this.focusType = 0;
        /*
        0: free 
        1: follow game object
        */
        this.rotationTween = null;
        this.positionTween = null;
        this.isAnimRotation = false;
        this.isAnimPosition = false;
        this.isRejectAnim = false;
        this.cameraDepth = cameraDepth;
        this.centerFocusOffset = new THREE.Vector3(0, 0, cameraDepth * 0.5);
        this.centerFocusScale = 1;
        this.lerpTime = 7.5;
    }
    lookAt(obj) {
        this.centerFocusScale = 1;
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
        tweenHemiLight(hemiLightColorDic['default'], 1);
    }
    setToOrigin() {
        var callback = () => {
            this.isRejectAnim = false;
        }
        this.isRejectAnim = true;
        this.animatePosition(new THREE.Vector3(0, 0, cameraDepth), 2, callback);
        TweenMax.to(this.camera.rotation, 1, {
            x: 0,
            y: 0,
            z: 0,
        })
    }
    update(obj) {
        switch (this.focusType) {
            case 1:
                this.updateCenterFocus();
                break;
            default:
                if (!G.isUnitClick && !this.isRejectAnim && !G.isPlayTutorial) {
                    let fac = 1;
                    let mouseSpeed = 10;
                    let tMouseX = mouseXn;
                    let tMouseY = mouseYn;
                    if (Math.abs(mouseXn) < 0.4) {
                        tMouseX = 0;
                    }
                    if (Math.abs(mouseYn) < 0.4) {
                        tMouseY = 0;
                    }
                    this.camera.position.x += mouseSpeed * tMouseX * fac * T.getDelta();
                    this.camera.position.x = Math.min(Math.max(this.camera.position.x, -worldX * baseRangeX), worldX * baseRangeX);
                    this.camera.position.y += mouseSpeed * tMouseY * fac * T.getDelta();
                    this.camera.position.y = Math.min(Math.max(this.camera.position.y, -worldY * baseRangeY), worldY * baseRangeY);
                    this.camera.position.z = Math.min(Math.max(this.camera.position.z, this.cameraDepth), this.cameraDepth);
        
                }
                break;
        }
    }
    updateCenterFocus() {
        // this.camera.lookAt(this.focusObj.threeObj.position);
        var objPos = this.focusObj.threeObj.position.clone();
        if (mouseWheelDelta != 0) {
            this.centerFocusScale += (mouseWheelDelta > 0 ? T.deltaTime : -T.deltaTime) * 2;
            this.centerFocusScale = Math.min(Math.max(this.centerFocusScale, 0.75), 1.75);
        }
        var targetPos = new THREE.Vector3(objPos.x, objPos.y, objPos.z).add(this.centerFocusOffset.clone().multiplyScalar(this.centerFocusScale));
        this.camera.position.lerp(targetPos, this.lerpTime * T.deltaTime);
        this.camera.rotation.set(0, 0, 0);
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