/**
 * 摧毁房屋面
 * @param {*} names 
 */
export const destoryBuild = (names) =>
    names.map(v => window.earth.entities.removeById(v.id));

/**
 * 画房屋面
 * @param {*} arr 
 */
export const drawBuild = (arr) => {
    arr.map(({ points, id }) => window.earth.entities.add({
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(points.map(v => [v.x, v.y]).flat()),
            material: new Cesium.Color(240 / 255, 10 / 255, 0 / 255, 0.2),
            outline: true,
            outlineWidth: 1,
            outlineColor: new Cesium.Color(240 / 255, 10 / 255, 0 / 255, 0.3),

        },
        lon: points[0].x,
        lat: points[0].y,
        id,
        classificationType: Cesium.ClassificationType.BOTH,
    }))
}