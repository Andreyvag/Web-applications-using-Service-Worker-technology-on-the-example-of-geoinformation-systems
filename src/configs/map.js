import pointSettings from './pointLayer';
import gridSettings from './gridLayer';

export const MAP_MODE = {
  POINTS: "POINTS",
  GRID: "GRID"
};

function getModeSettings(mode) {
    switch(mode) {
        case MAP_MODE.POINTS:
          return pointSettings;
        case MAP_MODE.GRID:
          return gridSettings;
        default:
          return pointSettings;
    }
};

const mapStyle = {
	 styleType: "light",
	 topLayerGroups: {},
	 visibleLayerGroups: {
	    "label": true,
	    "road": true,
	    "border": false,
	    "building": true,
	    "water": true,
      "land": true,
      "3d building":true
   },
   threeDBuildingColor:[255,253,196]
};

const interactionConfig = {
	tooltip: {
        fieldsToShow: {
            "parking_data": [
              "City",
              "Location",
              "Type"
            ]
        },
        enabled: true
    },
    brush: {
        enabled: false
    }
};

export function getMapConfig(mode) {
  
  const settings = getModeSettings(mode);

  return {
      version: "v1",
      config: {
        visState: {
          filters: [],
          layers: [ settings.config ],
          interactionConfig,
          layerBlending: "normal",
          splitMaps: []
        },
        mapState: settings.mapState,
        mapStyle
      }
  };
};