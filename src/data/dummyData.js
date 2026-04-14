// Panipat Area Coordinates ~ 29.3909, 76.9635

export const mockRoutes = [
  {
    id: 'r1',
    name: 'North Campus Loop',
    stops: [
      { id: 's1', name: 'Main Gate', lat: 29.3950, lng: 76.9650 },
      { id: 's2', name: 'Library', lat: 29.3980, lng: 76.9680 },
      { id: 's3', name: 'Science Block', lat: 29.4000, lng: 76.9600 },
      { id: 's4', name: 'North Hostel', lat: 29.3950, lng: 76.9550 },
    ],
    path: [
      [29.3950, 76.9650],
      [29.3962, 76.9665],
      [29.3980, 76.9680],
      [29.3994, 76.9672],
      [29.4004, 76.9635],
      [29.3992, 76.9595],
      [29.3965, 76.9560],
      [29.3950, 76.9550],
      [29.3955, 76.9582],
      [29.3950, 76.9650]
    ]
  },
  {
    id: 'r2',
    name: 'South Express',
    stops: [
      { id: 's1', name: 'Main Gate', lat: 29.3900, lng: 76.9600 },
      { id: 's5', name: 'Student Union', lat: 29.3850, lng: 76.9580 },
      { id: 's6', name: 'Engineering Dept', lat: 29.3800, lng: 76.9650 },
      { id: 's7', name: 'Sports Complex', lat: 29.3850, lng: 76.9700 },
    ],
    path: [
      [29.3900, 76.9600],
      [29.3885, 76.9590],
      [29.3862, 76.9583],
      [29.3850, 76.9580],
      [29.3838, 76.9588],
      [29.3817, 76.9615],
      [29.3800, 76.9650],
      [29.3825, 76.9685],
      [29.3845, 76.9695],
      [29.3850, 76.9700],
      [29.3875, 76.9692],
      [29.3900, 76.9600]
    ]
  },
  {
    id: 'r3',
    name: 'City Shuttle',
    stops: [
      { id: 's8', name: 'Panipat Station', lat: 29.3920, lng: 76.9750 },
      { id: 's9', name: 'Market Hub', lat: 29.3960, lng: 76.9800 },
    ],
    path: [
      [29.3920, 76.9750],
      [29.3930, 76.9762],
      [29.3944, 76.9775],
      [29.3954, 76.9783],
      [29.3960, 76.9800],
      [29.3948, 76.9787],
      [29.3934, 76.9768],
      [29.3920, 76.9750]
    ]
  },
  {
    id: 'r4',
    name: 'Evening Special',
    stops: [
      { id: 's10', name: 'Hostel A', lat: 29.3880, lng: 76.9500 },
      { id: 's11', name: 'Hostel B', lat: 29.4020, lng: 76.9500 },
    ],
    path: [
      [29.3880, 76.9500],
      [29.3895, 76.9512],
      [29.3920, 76.9525],
      [29.3948, 76.9545],
      [29.3950, 76.9550],
      [29.3978, 76.9525],
      [29.3995, 76.9508],
      [29.4020, 76.9500],
      [29.3990, 76.9508],
      [29.3950, 76.9550],
      [29.3880, 76.9500]
    ]
  }
];

export const mockBuses = [
  {
    id: 'b1',
    busNumber: '101',
    routeId: 'r1',
    status: 'On Time',
    lat: 29.3950,
    lng: 76.9650,
    nextStop: 'Library',
    eta: '2 mins',
    pathIndex: 0,
    crowdLevel: 'Low',
    colorHex: '#10b981' // Green
  },
  {
    id: 'b2',
    busNumber: '102',
    routeId: 'r2',
    status: 'Delayed',
    lat: 29.3900,
    lng: 76.9600,
    nextStop: 'Student Union',
    eta: '5 mins',
    delayMinutes: 5,
    pathIndex: 0,
    crowdLevel: 'Medium',
    colorHex: '#f59e0b' // Orange/Yellow
  },
  {
    id: 'b3',
    busNumber: '201',
    routeId: 'r3',
    status: 'On Time',
    lat: 29.3920,
    lng: 76.9750,
    nextStop: 'Market Hub',
    eta: '7 mins',
    pathIndex: 0,
    crowdLevel: 'Full',
    colorHex: '#06b6d4' // Cyan
  },
  {
    id: 'b4',
    busNumber: '301',
    routeId: 'r4',
    status: 'On Time',
    lat: 29.3880,
    lng: 76.9500,
    nextStop: 'Hostel B',
    eta: '3 mins',
    pathIndex: 0,
    crowdLevel: 'Low',
    colorHex: '#ef4444' // Red
  }
];
