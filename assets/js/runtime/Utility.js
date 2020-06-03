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
    borderZ = worldZ * extendRatio;
    cameraDepth = worldZ * cameraFieldScale;
}

function random(l, r) {
    return l + (r - l) * Math.random();
}

function d2r(deg) {
    return deg / 180.0 * Math.PI;
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

