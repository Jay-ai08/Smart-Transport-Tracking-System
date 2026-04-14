// Center coordinates updated to 29.1492, 76.6530

export const mockRoutes = [
  {
    id: 'r3',
    name: 'Sonipat → Geeta University',
    stops: [
      { id: 's8', name: 'Sonipat Bus Stand', lat: 28.9900, lng: 77.0219 },
      { id: 's9', name: 'Murthal Toll', lat: 29.0200, lng: 76.9680 },
      { id: 's10', name: 'Panipat Junction', lat: 29.3960, lng: 76.9750 },
      { id: 's11', name: 'Geeta University Nauthla', lat: 29.4035, lng: 76.9660 },
    ],
    path: [
      [28.9900, 77.0219],
      [28.9950, 77.0100],
      [29.0050, 76.9920],
      [29.0200, 76.9680],
      [29.0450, 76.9700],
      [29.1000, 76.9720],
      [29.2200, 76.9700],
      [29.3200, 76.9680],
      [29.3700, 76.9650],
      [29.3950, 76.9630],
      [29.4035, 76.9660]
    ]
  },
  {
    id: 'r5',
    name: 'Geeta University → Murthal',
    stops: [
      { id: 's12', name: 'Geeta University Nauthla', lat: 29.4035, lng: 76.9660 },
      { id: 's13', name: 'Bursham', lat: 29.3920, lng: 76.9510 },
      { id: 's14', name: 'Khalila', lat: 29.3800, lng: 76.9560 },
      { id: 's15', name: 'Samalkha', lat: 29.3620, lng: 76.9530 },
      { id: 's16', name: 'Murthal', lat: 29.0200, lng: 76.9680 },
    ],
    path: [
      [29.4035, 76.9660],
      [29.3920, 76.9510],
      [29.3800, 76.9560],
      [29.3620, 76.9530],
      [29.0200, 76.9680]
    ]
  },
  {
    id: 'r6',
    name: 'Safidon → Geeta University',
    stops: [
      { id: 's15', name: 'Safidon Bus Stand', lat: 29.4100, lng: 76.6700 },
      { id: 's16', name: 'Madlauda', lat: 29.1400, lng: 76.8600 },
      { id: 's17', name: 'Geeta University Nauthla', lat: 29.4035, lng: 76.9660 },
    ],
    path: [
      [29.4100, 76.6700],
      [29.4300, 76.7200],
      [29.4500, 76.7800],
      [29.4700, 76.8400],
      [29.4900, 76.9000],
      [29.5200, 76.9400],
      [29.1400, 76.8600],
      [29.4035, 76.9660]
    ]
  },
  {
    id: 'r7',
    name: 'Jind → Geeta University',
    stops: [
      { id: 's18', name: 'Jind Bus Stand', lat: 29.3200, lng: 76.3100 },
      { id: 's19', name: 'Safidon Bus Stand', lat: 29.4100, lng: 76.6700 },
      { id: 's20', name: 'Geeta University Nauthla', lat: 29.4035, lng: 76.9660 },
    ],
    path: [
      [29.3200, 76.3100],
      [29.3400, 76.4300],
      [29.3800, 76.5600],
      [29.4100, 76.6700],
      [29.4300, 76.7800],
      [29.4500, 76.8800],
      [29.4035, 76.9660]
    ]
  }
];

export const mockBuses = [
  {
    id: 'b3',
    busNumber: '201',
    routeId: 'r3',
    status: 'On Time',
    lat: 28.9945,
    lng: 77.0070,
    nextStop: 'Murthal Toll',
    eta: '15 mins',
    pathIndex: 1,
    crowdLevel: 'Medium',
    colorHex: '#06b6d4' // Cyan
  },
  {
    id: 'b5',
    busNumber: '501',
    routeId: 'r5',
    status: 'On Time',
    lat: 29.4035,
    lng: 76.9660,
    nextStop: 'Bursham',
    eta: '55 mins',
    pathIndex: 0,
    crowdLevel: 'Medium',
    colorHex: '#0ea5e9' // Blue
  },
  {
    id: 'b6',
    busNumber: '601',
    routeId: 'r6',
    status: 'On Time',
    lat: 29.4100,
    lng: 76.6700,
    nextStop: 'Panipat Junction',
    eta: '70 mins',
    pathIndex: 0,
    crowdLevel: 'Medium',
    colorHex: '#3b82f6' // Indigo
  },
  {
    id: 'b7',
    busNumber: '701',
    routeId: 'r7',
    status: 'On Time',
    lat: 29.3200,
    lng: 76.3100,
    nextStop: 'Safidon Bus Stand',
    eta: '80 mins',
    pathIndex: 0,
    crowdLevel: 'Medium',
    colorHex: '#8b5cf6' // Violet
  }
];
