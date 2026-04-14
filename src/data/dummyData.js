export const mockRoutes = [
  {
    id: 'r1',
    name: 'North Campus Loop',
    stops: [
      { id: 's1', name: 'Main Gate', lat: 40.7128, lng: -74.0060 },
      { id: 's2', name: 'Library', lat: 40.7140, lng: -74.0050 },
      { id: 's3', name: 'Science Block', lat: 40.7150, lng: -74.0030 },
      { id: 's4', name: 'North Hostel', lat: 40.7145, lng: -74.0080 },
    ],
    path: [
      [40.7128, -74.0060],
      [40.7140, -74.0050],
      [40.7150, -74.0030],
      [40.7145, -74.0080],
      [40.7128, -74.0060] // Loop back
    ]
  },
  {
    id: 'r2',
    name: 'South Engineering Express',
    stops: [
      { id: 's1', name: 'Main Gate', lat: 40.7128, lng: -74.0060 },
      { id: 's5', name: 'Student Union', lat: 40.7110, lng: -74.0040 },
      { id: 's6', name: 'Engineering Dept', lat: 40.7090, lng: -74.0020 },
      { id: 's7', name: 'Sports Complex', lat: 40.7100, lng: -74.0080 },
    ],
    path: [
      [40.7128, -74.0060],
      [40.7110, -74.0040],
      [40.7090, -74.0020],
      [40.7100, -74.0080],
      [40.7128, -74.0060]
    ]
  }
];

export const mockBuses = [
  {
    id: 'b1',
    busNumber: '101',
    routeId: 'r1',
    status: 'On Time',
    lat: 40.7135,
    lng: -74.0055,
    nextStop: 'Library',
    eta: '2 mins',
    pathIndex: 0
  },
  {
    id: 'b2',
    busNumber: '205',
    routeId: 'r2',
    status: 'Delayed',
    lat: 40.7110,
    lng: -74.0040,
    nextStop: 'Engineering Dept',
    eta: '5 mins',
    delayMinutes: 5,
    pathIndex: 1
  },
  {
    id: 'b3',
    busNumber: '102',
    routeId: 'r1',
    status: 'On Time',
    lat: 40.7148,
    lng: -74.0035,
    nextStop: 'North Hostel',
    eta: '4 mins',
    pathIndex: 2
  }
];
