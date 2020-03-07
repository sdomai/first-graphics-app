console.log("hello nola");
import * as L from "leaflet";
import homicides from "../_data/harvard_park_homicides";
console.log(homicides);

var map = L.map("map");
var sat = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGF0aW1lcyIsImEiOiJjanJmNjg4ZzYweGtvNDNxa2ZpZ2lma3Z4In0.g0lYVIEs9Y5QcUOhXactHA"
);
sat.addTo(map);
map.setView([33.983265, -118.306799], 18);

// loop through each item of the file, name each item
// one time for every step through the life
// obj=each record on the json file
homicides.forEach(obj => {
  L.circleMarker([obj.latitude, obj.longitude])
    .addTo(map)
    // label on each marker
    .bindTooltip(obj.first_name + " " + obj.last_name, { permanent: true });
});
