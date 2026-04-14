# Advanced Integrations Plan

To elevate the demonstration of the application and highlight its "depth" for your project presentation, I will implement three advanced processing modules deep within the tracking state logic.

## Proposed Changes

### 1. Processing Logic & Data Architecture (`dummyData.js` & `TransportContext.jsx`)
- **[MODIFY] dummyData.js**
  - Add a base `crowdLevel` (Low, Medium, Full) property to all buses.
  - Setup a map of "Trigger Zones" referencing specific stops (e.g., Main Gate, North Hostel).
- **[MODIFY] TransportContext.jsx**
  - **ETA Prediction Engine:** Implement a Haversine distance algorithm to calculate the real distance (in km/meters) between the active moving bus coordinate and its subsequent target stop. Using a mock variable speed constraint (e.g., traffic conditions factoring into a base 30 km/hr speed), the function will output a calculated ETA in real-time instead of hardcoded strings.
  - **Capacity Simulation:** Add randomization hooks to dynamically shift the `crowdLevel` during intervals.
  - **Geofence Engine:** Deep within the `setInterval` movement tick, calculate if the `distance` between a bus and a predefined zone (like Hostels) dips below `0.5km` (500 meters). Trigger the native Browser `Notification` API. To avoid spam, record `{ busId_stopId: true }` in a state once triggered, and reset it when the bus leaves that zone.

---

### 2. UI Enhancements (`BusCard.jsx` & `App.jsx`)
- **[MODIFY] App.jsx**
  - Request user permission for Native Browser Notifications (`Notification.requestPermission()`) on initial load.
- **[MODIFY] BusCard.jsx**
  - Add a new "Crowd Level" UI metric right next to the ETA. 
  - Utilize dynamic styling: 🟢 Low (Green text/icon), 🟡 Medium (Warning color), and 🔴 Full (Red color).

## User Review Required

> [!WARNING]
> Geofencing notifications will trigger native Operating System alerts (like Windows/Mac toast popups). Your browser will ask for "Notification Permission" when you refresh the page. You **must** click "Allow" in your browser address bar to see the desktop geofence alerts working.

> [!NOTE]
> Are you okay with the ETA algorithm overriding the current static strings and rapidly updating based on math, and utilizing the native `new Notification()` API for the geofence alarms?

## Verification Plan

### Automated Tests
- Syntax pass and successful Vite build mapping.

### Manual Verification
- You log into the dashboard and see a dynamic "Crowd" field changing.
- You observe the ETA string dynamically adjusting as the bus marker slowly crawls closer to the destination (e.g., '14 mins' -> '10 mins' -> 'Arriving soon').
- A native desktop notification pops up when your map marker reaches the "Main Gate" boundary radius.
