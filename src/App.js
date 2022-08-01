import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import InnerHtmlCheck from './components/InnerHtmlCheck';
import L from "leaflet";
import CustomMarker from './components/CustomMarker';
// import LeafletCanvasMarker from './components/CanvasMarker';
import triangleMarker from 'leaflet-triangle-marker';

import { bicycleRental, campus, nigeriaDummy, darkShipDummy} from './sample-geojson';
import {
  CircleMarker as LeafletCircleMarker,
  Canvas as LeafletCanvas,
} from "leaflet";

  
LeafletCanvas.include({
  _updateCustomMarker: function (layer) {
    if (!this._drawing || layer._empty()) {
      return;
    }

    var p = layer._point,
      ctx = this._ctx,
      r = Math.max(Math.round(layer._radius), 1),
      s = (Math.max(Math.round(layer._radiusY), 1) || r) / r,
      rot   =  60 * (Math.PI * 2) / 360 

      // this._drawnLayers[layer._leaflet_id] = layer
      // ctx.save()
      // ctx.translate(p.x, p.y)
      //  ctx.rotate(50 * (Math.PI * 2) / 360)
    // ctx.save()
    // ctx.translate(p.x - r    , p.y )
    // ctx.rotate(rot);
    // ctx.beginPath();
    //ctx.translate(p.x , p.y )
    //ctx.rotate(50 * Math.PI / 180);
    // ctx.moveTo(p.x + r     , p.y );
    // ctx.lineTo(p.x + 0.50*r, p.y + 0.25 * r);
    // // ctx.lineTo(p.x + 0.50*r, p.y + 0.87 * r);
    // // ctx.lineTo(p.x         , p.y + 0.50 * r);
    // ctx.lineTo(p.x - 0.50*r, p.y + 0.87 * r);
    // // ctx.lineTo(p.x - 0.43*r, p.y + 0.25 * r);
    // // ctx.lineTo(p.x -      r, p.y );
    
    // ctx.lineTo(p.x - r, p.y - 0.25 * r);
    // // ctx.lineTo(p.x - 0.50*r, p.y - 0.87 * r);
    // // ctx.lineTo(p.x         , p.y - 0.50 * r);
    // // ctx.lineTo(p.x + 0.50*r, p.y - 0.87 * r);
    // // ctx.lineTo(p.x + 0.43*r, p.y - 0.25 * r);

    ctx.moveTo(p.x - r    , p.y );
    ctx.lineTo(p.x - r +30,p.y - 10);
    ctx.lineTo(p.x - r +30,p.y + 10);
    ctx.closePath();
    ctx.restore();
    // if (s !== 1) {
    //   ctx.restore();
    // }

    this._fillStroke(ctx, layer);
  },
});

var CustomTriangle = LeafletCircleMarker.extend({
  _updatePath: function () {
    this._renderer._updateCustomMarker(this);
  },
});


class App extends Component {
   onEachFeature(feature, layer) {
    var popupContent = "<p>I started out as a GeoJSON " +
        feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

    if (feature.properties && feature.properties.popupContent) {
      popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
  }

  style (featurea) {
    return featurea.properties && featurea.properties.style;
  }

  pointToLayer (feature, latlng) {
    return new CustomTriangle(latlng, {
      // radius: 8,
      // fillColor: "#ff7800",
      // color: "#000",
      // weight: 1,
      // opacity: 1,
      // fillOpacity: 0.8
      radius: 30,
      fillOpacity: '0.8',
      stroke: false,
      height: 20,
      rotation: 60
    });
  }
  render() {
    return (
      <>
      <Map  style={{ height: "100vh", width: "100vw" }} center={[0.5, 0.5]} zoom={5}  preferCanvas={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON 
        data={[nigeriaDummy,darkShipDummy]}
        onEachFeature={this.onEachFeature.bind(this)}
        style={this.style.bind(this)}
        pointToLayer={this.pointToLayer.bind(this)}
      />

      {/* <CustomMarker key={0}
        center={[10, 0]}
        stroke={false}
        radius={4}
        fillOpacity={0.8}/> */}
      {/* <LeafletCanvasMarker /> */}
    </Map>
    {/* <InnerHtmlCheck /> */}
    </>
    );
  }
}

export default App;