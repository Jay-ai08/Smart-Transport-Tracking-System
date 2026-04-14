import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TransportContext } from '../context/TransportContext';

// Fix typical Leaflet icon issue base
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Div Icon Generator for exact layout marker styles
const createCustomMarker = (colorHex) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${colorHex}; 
      width: 28px; 
      height: 28px; 
      
      display: flex; 
      align-items: center; 
      justify-content: center; 
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    ">
      <div style="background-color: white; mask: url('data:image/svg+xml;utf8,<svg stroke=%22currentColor%22 fill=%22none%22 stroke-width=%222%22 viewBox=%220 0 24 24%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M8 6v6%22/><path d=%22M15 6v6%22/><path d=%22M2 12h19.6%22/><path d=%22M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3%22/><circle cx=%227%22 cy=%2218%22 r=%222%22/><circle cx=%2217%22 cy=%2218%22 r=%222%22/></svg>') center/contain no-repeat; width: 14px; height: 14px; -webkit-mask: url('data:image/svg+xml;utf8,<svg stroke=%22currentColor%22 fill=%22none%22 stroke-width=%222%22 viewBox=%220 0 24 24%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2%22/><circle cx=%227%22 cy=%2217%22 r=%222%22/><path d=%22M9 17h6%22/><circle cx=%2217%22 cy=%2217%22 r=%222%22/></svg>') center/contain no-repeat;"></div>
    </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

const StopMarker = L.divIcon({
    className: 'stop-node-icon',
    html: `<div style="width: 10px; height: 10px; border-radius: 50%; background-color: #94a3b8; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.3);"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5]
});

const MapView = ({ fullMode = true, customCenter = null }) => {
  const { buses, routes } = useContext(TransportContext);

  if (!buses || !routes) return <div>Loading...</div>;

  const mapCenter = customCenter || [29.3909, 76.9635];

  return (
    <div style={{ width: '100%', height: '100%', padding: 0 }}>
      {/* Set MapContainer to fill parent exactly */}
      <MapContainer center={mapCenter} zoom={14} scrollWheelZoom={true} style={{ width: '100%', height: '100%', zIndex: 1 }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Draw Routes */}
        {routes.map(route => {
          // Identify associated color from dummy mockBuses to match route
          const linkedBus = buses.find(b => b.routeId === route.id);
          const drawColor = linkedBus ? linkedBus.colorHex : '#3b82f6';
          
          return (
            <React.Fragment key={`route-group-${route.id}`}>
              <Polyline 
                positions={route.path} 
                color={drawColor} 
                weight={3}
                opacity={0.7}
              />
              {/* Draw tiny Stops */}
              {route.stops.map(stop => (
                 <Marker key={stop.id} position={[stop.lat, stop.lng]} icon={StopMarker}>
                    <Popup>{stop.name}</Popup>
                 </Marker>
              ))}
            </React.Fragment>
          );
        })}

        {/* Draw Live Tracking Bus Markers */}
        {buses.map(bus => (
          <Marker 
            key={bus.id} 
            position={[bus.lat, bus.lng]} 
            icon={createCustomMarker(bus.colorHex || '#3b82f6')}
            style={{ transition: 'all 0.5s linear' }}
          >
            <Popup>
              <strong>GU-{bus.busNumber}</strong><br/>
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
