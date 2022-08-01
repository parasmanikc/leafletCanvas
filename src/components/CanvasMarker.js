import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-canvas-marker";
import L from "leaflet";

export default function LeafletCanvasMarker() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    var ciLayer = L.canvasIconLayer({}).addTo(map);

    ciLayer.addOnClickListener(function (e, data) {
      console.log(data);
    });
    ciLayer.addOnHoverListener(function (e, data) {
      console.log(data[0].data._leaflet_id);
    });

    var myIcon = L.divIcon({className: 'my-div-icon', html: `<div style='
    width: 0; 
     height: 0; 
     border-left: 10px solid transparent;
     border-right: 10px solid transparent;
     
     border-bottom: 25px solid red;
    '></div>`});

    var icon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconSize: [20, 18],
      iconAnchor: [10, 9],
    });

    var markers = [];
    for (var i = 0; i < 50000; i++) {
      var marker = L.marker(
        [58.5578 + Math.random() * 1.8, 29.0087 + Math.random() * 3.6],
        { icon: icon }
      ).bindPopup("I Am " + i);
      markers.push(marker);
    }
    ciLayer.addLayers(markers);
  }, [map]);

  return null;
}