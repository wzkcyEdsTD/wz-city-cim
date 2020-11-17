/**
 * 开关热力图
 * @param {*} blocks 
 * @param {*} forceKey 
 */
export const switchHeatMap = (blocks, forceKey, arr) => {
    blocks.map(({ k }) => {
        if (k == forceKey) {
            window.heatMap[k] ? window.heatMap[k].show(true) : doHeatMap(k, arr);
        } else {
            window.heatMap[k] ? window.heatMap[k].show(false) : undefined
        }
    })
};
/**
 * 制造热力图
 * @param {*} name 
 */
export const doHeatMap = (forceKey, arr) => {
    let bounds = {
        west: 120.58254,
        east: 120.738342,
        south: 27.984375,
        north: 28.031321
    };

    // init heatmap
    const heatMap = window.CesiumHeatmap.create(
        window.earth,
        bounds,
        {
            backgroundColor: "rgba(0,0,0,0)",
            radius: 40,
            maxOpacity: 0.4,
            minOpacity: 0,
            blur: 0.55
        }
    );

    // random example data
    let data = arr.map(({ LON, LAT }) => { return { x: LON, y: LAT, value: 10 } });
    let valueMin = 0;
    let valueMax = 100;

    // add data to heatmap
    heatMap.setWGS84Data(valueMin, valueMax, data)
    window.heatMap[forceKey] = heatMap;
}