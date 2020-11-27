export const getCzmlDataSource = (data) => {
    const czml = [{
        "id": "document",
        "name": "gridmember",
        "version": "1.0",
        "clock": {
            "interval": "2012-08-04T03:00:00Z/2012-08-04T18:00:00Z",
            "currentTime": "2012-08-04T03:00:00Z",
            "multiplier": 4
        }
    }, {
        "id": "walkman",
        "name": "Red box with black outline",
        "availability": "2012-08-04T03:00:00Z/2012-08-04T18:00:00Z",
        "path": {
            "material": {
                "solidColor": {
                    "color": {
                        "interval": "2012-08-04T03:00:00Z/2012-08-04T18:00:00Z",
                        "rgba": [255, 0, 0, 128]
                    }
                }
            },
            "width": [{
                "interval": "2012-08-04T03:00:00Z/2012-08-04T18:00:00Z",
                "number": 3.0
            }],
            "show": [{
                "interval": "2012-08-04T03:00:00Z/2012-08-04T18:00:00Z",
                "boolean": false
            }]
        },
        "position": {
            "interpolationAlgorithm": "LAGRANGE",
            "interpolationDegree": 1,
            "epoch": "2012-08-04T03:00:00Z",
            "cartographicDegrees": data.map(({ lon, lat }, i) => [i * 10, lon, lat, 1]).flat(2)
        },
        "model": {
            "gltf": "/static/model/walkman/walk.gltf",
            "scale": 16.0,
        },
        "orientation": {
            "velocityReference": "#position"
        },
    }];
    return czml;
}