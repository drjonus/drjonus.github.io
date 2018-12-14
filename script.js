let map, newMarker, markers, newPoint, popString, myLocation, compareBtn;

markers = [];

function initialize() {
  map = L.map('map').setView([45.527453, -122.668923], 10)

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox.outdoors'
  }).addTo(map);

  L.control.locate({
    flyTo: true,
    showPopup: false,
    locateOptions: {enableHighAccuracy: true, maxZoom: 15},
    strings: {title: "Find current location"},
    follow: false
  }).addTo(map);

  function onLocationFound(e) {
    myLocation = L.marker(e.latlng).remove();
    var radius = e.accuracy / 2;

    myLocation = L.marker(e.latlng).addTo(map)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
  }

  function onLocationError(e) {
      alert(e.message);
  }

  function addMarker(e){
	// Add marker to map at click location; add popup window
    newMarker = new L.marker(e.latlng).addTo(map);
    newMarker.bindPopup(`${newMarker.getLatLng()}`).openPopup();
    markers.push(newMarker);
    popString = document.createElement("li");
    popString.style.display = "flex";
    popString.innerHTML += newMarker._popup.getContent();
    newPoint.appendChild(popString);
    newPoint.append(compareBtn);
  }

  map.on('locationfound', onLocationFound);
  map.on('locationerror', onLocationError);
  map.on('click', addMarker);

  newPoint = document.createElement("div");
  newPoint.style.display = "flex";
  newPoint.style.justifyContent = "space-evenly";
  newPoint.style.flexDirection = "column";
  newPoint.style.width = "100%";
  newPoint.style.marginTop = "5px";

  compareBtn = document.createElement("button");
  compareBtn.type = "radio";

  target = document.getElementById("pointTarget");
  target.appendChild(newPoint);

};

let lat1, lat2, lon1, lon2;

function getDistance(origin, destination) {
  // return distance in meters
  lon1 = toRadian(origin[1]);
  lat1 = toRadian(origin[0]);
  lon2 = toRadian(destination[1]);
  lat2 = toRadian(destination[0]);

  let deltaLat = lat2 - lat1;
  let deltaLon = lon2 - lon1;

  let a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  let EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS * 1000;
}

function toRadian(degree) {
  return degree*Math.PI/180;
}

let distance = getDistance([lat1, lng1], [lat2, lng2]);

initialize();
