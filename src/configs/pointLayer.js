const visualChannels = {
        colorField: {
            "name":"Type",
            "type":"string"
        },
        colorScale: "ordinal",
        strokeColorField : null,
        strokeColorScale :"quantile",
        sizeField :null,
        sizeScale:"linear"
    };

    const pointConfig = {
        radius: 10,
        fixedRadius: false,
        opacity: 0.8,
        outline: false,
        colorRange: {
            colors: [
                "#213E9A",
                "#3C1FA7",
                "#811CB5",
                "#C318B0",
                "#D01367",
                "#DE0F0E",
                "#EC7007",
                "#F9E200"
            ],
            reversed: false
        },
        radiusRange: [ 0, 50 ],
        "hi-precision": false
	};

const layerConfig = {
        dataId: "parking_data",
        label: "Camera",
        columns: {
              "lat": "Latitude_WGS84",
              "lng": "Longitude_WGS84",
              "altitude": null
        },
        isVisible: true,
        visConfig: pointConfig
	};

const config = {
	id: "point_layer",
	type: "point",
	config: layerConfig,
	visualChannels
};

const mapState = {
  "bearing": 0,
  "dragRotate": false,
  "latitude": 49.05802026533924,
  "longitude": 44.167948987546765,
  "pitch": 0,
  "zoom": 7.860491070055236,
  "isSplit": false
};

export default { config, mapState };