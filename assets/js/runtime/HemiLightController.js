console.log('HemiLightController Loaded');

class HemiLightController{
    constructor(light,skyColor,groundColor){
        this.light = light;
        this.skyColor = groundColor;
        this.groundColor = skyColor;
    }
    update(){
        this.light.color.set(this.skyColor);
        this.light.groundColor.set(this.groundColor);
    }
}