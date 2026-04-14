import React, { createContext, useState, useEffect } from 'react';
import { mockBuses, mockRoutes } from '../data/dummyData';

export const TransportContext = createContext();

export const TransportProvider = ({ children }) => {
  const [buses, setBuses] = useState(mockBuses);
  const [routes, setRoutes] = useState(mockRoutes);

  // Simulate real-time movement
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBuses(prevBuses => {
        return prevBuses.map(bus => {
          const route = routes.find(r => r.id === bus.routeId);
          if (!route) return bus;

          // Simple linear movement between points could be calculated here.
          // For now, we will simply jump to the next point in the path or interploate slightly.
          // Let's just move them to the next point slowly by moving logic
          let nextIndex = bus.pathIndex + 1;
          if (nextIndex >= route.path.length) nextIndex = 0;

          const currentPos = route.path[bus.pathIndex];
          const nextPos = route.path[nextIndex];

          // Small step interpolation (very simple)
          const step = 0.2; // Move 20% closer to the next point
          const newLat = bus.lat + (nextPos[0] - bus.lat) * step;
          const newLng = bus.lng + (nextPos[1] - bus.lng) * step;

          // If close enough to next point, increment pathIndex
          const dist = Math.sqrt(Math.pow(nextPos[0] - newLat, 2) + Math.pow(nextPos[1] - newLng, 2));
          let updatedIndex = bus.pathIndex;
          if (dist < 0.0005) {
            updatedIndex = nextIndex;
          }

          // Update ETA randomly for realism occasionally
          let status = bus.status;
          let delayMinutes = bus.delayMinutes || 0;
          if (Math.random() < 0.05) {
            const isDelayed = Math.random() > 0.8;
            if (isDelayed) {
              status = 'Delayed';
              delayMinutes = Math.floor(Math.random() * 10) + 1;
            } else {
              status = 'On Time';
              delayMinutes = 0;
            }
          }

          return {
            ...bus,
            lat: newLat,
            lng: newLng,
            pathIndex: updatedIndex,
            status,
            delayMinutes
          };
        });
      });
    }, 2000); // 2 seconds tick

    return () => clearInterval(intervalId);
  }, [routes]);

  const addBus = (bus) => {
    setBuses([...buses, { ...bus, id: `b${Date.now()}` }]);
  };

  const updateBus = (id, updatedData) => {
    setBuses(buses.map(b => b.id === id ? { ...b, ...updatedData } : b));
  };

  return (
    <TransportContext.Provider value={{ buses, routes, addBus, updateBus }}>
      {children}
    </TransportContext.Provider>
  );
};
