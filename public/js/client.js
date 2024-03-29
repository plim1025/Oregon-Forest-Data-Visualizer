import { geojsonFeature } from "./geoJson.js";
import { createPopup, showSidebar } from "./popup.js";

//plotly
//group data by DBH (by groups of 5) amounts, then y axis is tree height



const adjustMapZoomFromSearch = (id) => {
  var lat, lng;
  mymap.onEachFeature(function(feature, layer){
    console.log(feature);
    console.log(layer);
  });
  /*if(mymap.getZoom() < 12) {
    mymap.setView([lat, lng], 13);
  } else {
    mymap.setView([lat, lng]);
  }*/
}

const searchStands = (e) => {
  e.preventDefault();
  var containsID = false;
  const searchVal = document.getElementById('searchbar').value;
  for(var i in geojsonFeature.features){
    if(geojsonFeature.features.hasOwnProperty(i)){
      if(geojsonFeature.features[i].properties.OI_KEY == searchVal){
          containsID = true;
          createPopup(geojsonFeature.features[i]);
          //adjustMapZoomFromSearch(geojsonFeature.features[i].id);
          break;
      }
    }
  }
  if(containsID === false){
    alert("Stand " + searchVal + " not found");
  }
}

document.getElementById('searchbar').addEventListener('keyup', e => {
  if(event.keyCode === 13)
    searchStands(e);
});

let southWest = L.latLng(43, -124);
let northEast = L.latLng(43.4, -123.7);

var mymap = L.map('map',
        {
            // maxBounds: L.latLngBounds(southWest, northEast)
        }
    )
    .setView([43.2, -124], 11);

mymap.options.minZoom = 7;

var basemaps = {
    Forest: L.tileLayer.wms('https://imagery.oregonexplorer.info:443/arcgis/services/OSIP_2018/OSIP_2018_WM/ImageServer/WMSServer?', {
      layers: '0',
      maxZoom: 20,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }),
    Street: L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    })
};

L.control.layers(basemaps).addTo(mymap);
basemaps.Forest.addTo(mymap);

const adjustMapZoom = (e) => {
  const info = document.getElementById('info');
  info.style.visibility = 'visible';
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
  if(mymap.getZoom() < 12) {
    mymap.setView([lat, lng], 13);
  } else {
    mymap.setView([lat, lng]);
  }
}


const onEachFeatureForest = (feature, layer) => {
    layer.on('click', e => {
      adjustMapZoom(e);
      createPopup(feature);
      showSidebar();
      document.getElementById('downloadButton').style.visibility = 'visible';
      document.getElementById('toggleButton').style.visibility = 'visible';
    });
    layer.on('mouseover', function () {
      this.setStyle({
        'fillColor': '#0000ff'
      });
    });
    layer.on('mouseout', function () {
      this.setStyle({
        'fillColor': '#C0C0C0'
      });
    });
}

const onEachFeatureStreet = (feature, layer) => {
  layer.on('click', e => {
    adjustMapZoom(e);
    createPopup(e, feature);
    showSidebar();
    document.getElementById('downloadButton').style.visibility = 'visible';
    document.getElementById('toggleButton').style.visibility = 'visible';
  });
  layer.on('mouseover', function () {
    this.setStyle({
      'fillColor': '#909090'
    });
  });
  layer.on('mouseout', function () {
    this.setStyle({
      'fillColor': '#303030'
    });
  });
}

L.geoJSON(geojsonFeature, {
    weight: 0.3,
    style: function(feature) {
        return {color: "#FFF"};
    },
    onEachFeature: onEachFeatureForest
}).addTo(mymap);

mymap.on('baselayerchange', (e) => {
  if(e.name === 'Forest') {
    L.geoJSON(geojsonFeature, {
      weight: 0.3,
      style: function(feature) {
          return {color: "#FFF"};
      },
      onEachFeature: onEachFeatureForest
    }).addTo(mymap);
  } else if (e.name === 'Street') {
    L.geoJSON(geojsonFeature, {
      weight: 0.3,
      style: function(feature) {
          return {color: "#303030"};
      },
      onEachFeature: onEachFeatureStreet
    }).addTo(mymap);
  }
});