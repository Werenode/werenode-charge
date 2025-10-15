import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import BoundsWatcher from "./BoundsWatcher";
import { useEvses } from "../hooks/useEvses";
// import localFallback from "../data/evses.json"; // optionnel si tu veux un fallback

const evIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapView() {
  const [bounds, setBounds] = useState(null);
  const [filters, setFilters] = useState({}); // ex: { minPowerKW: 7, status: "available", type: "AC" }

  const { data: evses, loading } = useEvses({
    bounds,
    filters,
    collectionName: "evse",
    // fallback: localFallback, // décommente si tu veux voir qqch sans Firestore
  });

  return (
    <div className="w-full">
      <MapContainer center={[48.77, 2.03]} zoom={12} style={{ height: "80vh", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <BoundsWatcher onChange={setBounds} />

        {!loading && evses.map(e => (
          typeof e.lat === "number" && typeof e.lng === "number" && (
            <Marker key={e.id ?? `${e.lat}-${e.lng}`} position={[e.lat, e.lng]} icon={evIcon}>
              <Popup>
                <strong>{e.name ?? "Borne Werenode"}</strong><br />
                Puissance: {e.powerKW ?? "?"} kW<br />
                Statut: {e.status ?? "?"}<br />
                {e.operator && <>Opérateur: {e.operator}<br/></>}
                {e.address && <>{e.address}<br/></>}
                {e.price && <>Tarif: {e.price} €/kWh</>}
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
      {/* Exemple de filtres UI minimalistes */}
      {/* <Filters onChange={setFilters} /> */}
    </div>
  );
}
