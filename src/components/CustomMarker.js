import {
    CircleMarker as LeafletCircleMarker,
    Canvas as LeafletCanvas,
  } from "leaflet";
  import { withLeaflet, Path } from "react-leaflet";
  
  LeafletCanvas.include({
    _updateCustomMarker: function (layer) {
      if (!this._drawing || layer._empty()) {
        return;
      }
  
      var p = layer._point,
        ctx = this._ctx,
        r = Math.max(Math.round(layer._radius), 1),
        s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;
  
      if (s !== 1) {
        ctx.save();
        ctx.scale(1, s);
      }
  
      ctx.beginPath();
      ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);
  
      if (s !== 1) {
        ctx.restore();
      }
  
      this._fillStroke(ctx, layer);
    },
  });
  
  class CustomMarker extends Path {
    createLeafletElement(props) {
      const MyMarker = LeafletCircleMarker.extend({
        _updatePath: function () {
          this._renderer._updateCustomMarker(this);
        },
      });
  
      const el = new MyMarker(props.center, this.getOptions(props));
      this.contextValue = { ...props.leaflet, popupContainer: el };
  
      return el;
    }
  
    updateLeafletElement(fromProps, toProps) {
      if (toProps.center !== fromProps.center) {
        this.leafletElement.setLatLng(toProps.center);
      }
  
      if (toProps.radius !== fromProps.radius) {
        this.leafletElement.setRadius(toProps.radius);
      }
    }
  }
  
  export default withLeaflet(CustomMarker);