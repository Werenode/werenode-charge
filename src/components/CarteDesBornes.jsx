import React, { useMemo, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, ScaleControl, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'react-leaflet-markercluster/styles';
import L from "leaflet";
//import { bornes } from "../data/bornes";

// --- Fix des icônes Leaflet (sinon les marqueurs n'apparaissent pas en build/Pages) ---
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
// --------------------------------------------------------------------------------------

function FitToDataBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points?.length) return;
    const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, points]);
  return null;
}

function LocateButton() {
  const map = useMap();
  const ref = useRef(null);

  useEffect(() => {
    const control = L.control({ position: "topleft" });
    control.onAdd = () => {
      const btn = L.DomUtil.create("button", "leaflet-bar");
      btn.style.cursor = "pointer";
      btn.style.background = "#fff";
      btn.style.padding = "6px 10px";
      btn.style.border = "none";
      btn.title = "Me localiser";
      btn.innerText = "📍";
      btn.onclick = () => {
        if (!navigator.geolocation) return alert("Géolocalisation non supportée.");
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            const here = [coords.latitude, coords.longitude];
            map.setView(here, 14);
            L.marker(here).addTo(map).bindPopup("Vous êtes ici").openPopup();
          },
          () => alert("Impossible de récupérer votre position.")
        );
      };
      ref.current = btn;
      return btn;
    };
    control.addTo(map);
    return () => control.remove();
  }, [map]);

  return null;
}

export default function CartesDesBornes() {
  const franceCenter = useMemo(() => [46.6, 2.4], []);
  const clusterOptions = useMemo(() => ({ chunkedLoading: true }), []);

  return (
    <div style={{ height: "70vh", width: "100%", borderRadius: 16, overflow: "hidden" }}>
      <MapContainer
        center={franceCenter}
        zoom={6}
        minZoom={3}
        maxZoom={19}
        zoomControl={false}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          // OpenStreetMap — sans clé API
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
        <ZoomControl position="topright" />
        <ScaleControl position="bottomleft" />

        <LocateButton />
        <FitToDataBounds points={bornes} />

        <MarkerClusterGroup chunkedLoading {...clusterOptions}>
          {bornes.map((c) => (
            <Marker key={c.id} position={[c.lat, c.lng]}>
              <Popup>
                <div style={{ lineHeight: 1.4 }}>
                  <strong>{c.name}</strong><br />
                  Participants: {c.participants}<br />
                  Puissance: {c.production_kWp} kWc<br />
                  <button
                    style={{
                      marginTop: 8,
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: "1px solid #ddd",
                      cursor: "pointer",
                      background: "white"
                    }}
                    onClick={() => alert(`Prendre contact avec ${c.name}`)}
                  >
                    Rejoindre / Contacter
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
