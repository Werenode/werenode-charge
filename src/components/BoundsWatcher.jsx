import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function BoundsWatcher({ onChange }) {
  const map = useMap();
  useEffect(() => {
    const resub = () => {
      const b = map.getBounds();
      onChange?.({
        south: b.getSouth(),
        north: b.getNorth(),
        west: b.getWest(),
        east: b.getEast(),
      });
    };
    resub(); // initial
    map.on("moveend", resub);
    return () => map.off("moveend", resub);
  }, [map, onChange]);
  return null;
}
