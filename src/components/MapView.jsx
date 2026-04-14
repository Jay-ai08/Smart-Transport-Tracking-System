import React, { useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TransportContext } from '../context/TransportContext';

// Fix typical Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Icons
const busIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const routeColors = {
  'r1': '#3b82f6', // blue
  'r2': '#10b981'  // green
};

const MapView = ({ fullMode = true }) => {
  const { buses, routes } = useContext(TransportContext);

  if (!buses || !routes) return <div>Loading...</div>;

  return (
    <div className="card w-full h-[500px]" style={{ height: fullMode ? '600px' : '300px', padding: 0, overflow: 'hidden' }}>
      <MapContainer center={[40.7128, -74.0060]} zoom={15} scrollWheelZoom={false} className="leaflet-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Draw Routes */}
        {routes.map(route => (
          <Polyline 
            key={`poly-${route.id}`}
            positions={route.path} 
            color={routeColors[route.id] || 'blue'} 
            weight={4}
            opacity={0.6}
          />
        ))}

        {/* Draw Stops */}
        {routes.map(route => route.stops.map(stop => (
          <Marker key={stop.id} position={[stop.lat, stop.lng]}>
             <Popup>{stop.name}</Popup>
          </Marker>
        )))}

        {/* Draw Buses */}
        {buses.map(bus => (
          <Marker key={bus.id} position={[bus.lat, bus.lng]} icon={busIcon}>
            <Popup>
              <strong>Bus {bus.busNumber}</strong><br/>
              Status: {bus.status}<br/>
              Next: {bus.nextStop}<br/>
              ETA: {bus.eta}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
