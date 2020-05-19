class GameObjectController{
    constructor(threeObj){
        this.threeObj = threeObj;
        this.rotationTween = null;
        this.positionTween = null;
        this.isAnimRotation = false;
        this.isAnimPosition = false;
        this.isRejectAnim = false;
    }
    animateRotation(rot, duration = 1, callback = null) {
        this.clearRotationAnim();
        this.isAnimRotation = true;
        this.rotationTween = TweenMax.to(this.threeObj.rotation, duration, {
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
    animatePosition(pos, duration = 1,callback = null) {
        this.clearPositionAnim();
        this.isAnimRotation = true;
        this.positionTween = TweenMax.to(this.threeObj.position, duration, {
            x: pos.x,
            y: pos.y,
            z: pos.z,
            onComplete: function () {
                this.isAnimPosition = false;
                if (callback){
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