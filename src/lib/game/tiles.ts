export let tiles =
[
  {
    name: 'A',
    index: 1,
    amount: 2,
    center: 'c0',
    deg: 0,
    connectors: [
      'p0', null, null,
      'p0', null, 'p0',
      'd0', 'p0', null,
      'p0', null, null
    ],
    dropZone: [
      null, null, null,
      null, null, 'p0',
      'd0', null, null,
      null, null, null
    ],
    dropZoneCenter: 'c0'
  },
  {
    name: 'B',
    index: 2,
    amount: 4,
    center: 'c0',
    deg: 0,
    connectors: [
      'p0', null, null,
      'p0', null, null,
      'p0', null, null,
      'p0', null, null
    ],
    dropZone: [
      null, null, null,
      null, null, 'p0',
      'd0', null, null,
      null, null, null
    ],
    dropZoneCenter: 'c0'
  },
  {
    name: 'C',
    index: 3,
    amount: 1,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, null,
      'z0', null, null,
      'z0', null, null,
      'z0', null, null
    ],
    dropZone: [
      null, null, null,
      null, null, null,
      null, null, null,
      null, null, null
    ],
    dropZoneCenter: 'z0'
  },
  {
    name: 'D',
    index: 4,
    amount: 4,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, 'p1',
      'd0', 'p0', null,
      'p0', null, 'p0',
      'd0', 'p1', null
    ],
    dropZone: [
      'z0', null, 'p1',
      null, null, null,
      'p0', null, null,
      null, null, null
    ],
    dropZoneCenter: 'd0'
  },
  {
    name: 'E',
    index: 5,
    amount: 2,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, null,
      'p0', null, null,
      'p0', null, null,
      'p0', null, null
    ],
    dropZone: [
      'z0', null, null,
      null, null, null,
      null, null, null,
      null, null, null
    ],
    dropZoneCenter: 'p0'
  },
  {
    name: 'F',
    index: 6,
    amount: 2,
    center: null,
    deg: 0,
    connectors: [
      'p0', null, null,
      'z0', null, null,
      'p0', null, null,
      'z0', null, null
    ],
    dropZone: [
      'p0', null, null,
      null, null, null,
      'p0', null, null,
      null, null, null
    ],
    dropZoneCenter: 'z0'
  },
  {
    name: 'G',
    index: 7,
    amount: 1,
    center: null,
    deg: 0,
    connectors: [
      'p0', null, null,
      'z0', null, null,
      'p0', null, null,
      'z0', null, null
    ],
    dropZone: [
      'p0', null, null,
      null, null, null,
      'p0', null, null,
      null, null, null
    ],
    dropZoneCenter: 'z0'
  },
  {
    name: 'H',
    index: 8,
    amount: 3,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, null,
      'p0', null, null,
      'z1', null, null,
      'p0', null, null
    ],
    dropZone: [
      'z0', null, null,
      null, null, null,
      'z1', null, null,
      null, null, null
    ],
    dropZoneCenter: 'p0'
  },
  {
    name: 'I',
    index: 9,
    amount: 2,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, null,
      'p0', null, null,
      'p0', null, null,
      'z1', null, null
    ],
    dropZone: [
      'z0', null, null,
      null, null, null,
      null, null, null,
      'z1', null, null
    ],
    dropZoneCenter: 'p0'
  },
  {
    name: 'J',
    index: 10,
    amount: 3,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, 'p0',
      'd0', 'p1', 'p1',
      'd0', 'p0', null,
      'p0', null, null
    ],
    dropZone: [
      'z0', null, null,
      null, 'p1', null,
      null, null, null,
      'p0', null, null
    ],
    dropZoneCenter: 'd0'
  },
  {
    name: 'K',
    index: 11,
    amount: 3,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, null,
      'p0', null, 'p0',
      'd0', 'p1', 'p1',
      'd0', 'p0', null
    ],
    dropZone: [
      'z0', null, null,
      'p0', null, null,
      null, null, 'p1',
      null, null, null
    ],
    dropZoneCenter: 'd0'
  },
  {
    name: 'L',
    index: 12,
    amount: 3,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, 'p0',
      'd0', 'p1', 'p1',
      'd1', 'p2', 'p2',
      'd2', 'p0', null
    ],
    dropZone: [
      'z0', null, null,
      'd0', null, 'p1',
      'd1', null, 'p2',
      'd2', null, null
    ],
    dropZoneCenter: 'p0'
  },
  {
    name: 'M',
    index: 13,
    amount: 2,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, null,
      'p0', null, null,
      'p0', null, null,
      'z0', null, null
    ],
    dropZone: [
      'z0', null, null,
      null, null, null,
      null, null, null,
      null, null, null
    ],
    dropZoneCenter: 'p0'
  },
  {
    name: 'N',
    index: 14,
    amount: 3,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, null,
      'p0', null, null,
      'p0', null, null,
      'z0', null, null
    ],
    dropZone: [
      'z0', null, null,
      null, null, null,
      null, null, null,
      null, null, null
    ],
    dropZoneCenter: 'p0'
  },
  {
    name: 'O',
    index: 15,
    amount: 2,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, 'p0',
      'd0', 'p1', 'p1',
      'd0', 'p0', null,
      'z0', null, null
    ],
    dropZone: [
      'z0', null, null,
      null, null, 'p1',
      'd0', null, null,
      'z0', null, null
    ],
    dropZoneCenter: 'p0'
  },
  {
    name: 'P',
    index: 16,
    amount: 3,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, 'p0',
      'd0', 'p1', 'p1',
      'd0', 'p0', null,
      'z0', null, null
    ],
    dropZone: [
      'z0', null, null,
      null, null, 'p1',
      'd0', null, null,
      'z0', null, null
    ],
    dropZoneCenter: 'p0'
  },
  {
    name: 'Q',
    index: 17,
    amount: 1,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, null,
      'z0', null, null,
      'p0', null, null,
      'z0', null, null
    ],
    dropZone: [
      null, null, null,
      null, null, null,
      'p0', null, null,
      null, null, null
    ],
    dropZoneCenter: 'z0'
  },
  {
    name: 'R',
    index: 18,
    amount: 3,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, null,
      'z0', null, null,
      'p0', null, null,
      'z0', null, null
    ],
    dropZone: [
      null, null, null,
      null, null, null,
      'p0', null, null,
      null, null, null
    ],
    dropZoneCenter: 'z0'
  },
  {
    name: 'S',
    index: 19,
    amount: 2,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, null,
      'z0', null, 'p0',
      'd0', 'p1', null,
      'z0', null, null
    ],
    dropZone: [
      null, null, null,
      null, null, 'p0',
      'd0', 'p1', null,
      null, null, null
    ],
    dropZoneCenter: 'z0'
  },
  {
    name: 'T',
    index: 20,
    amount: 1,
    center: null,
    deg: 0,
    connectors: [
      'z0', null, null,
      'z0', null, 'p0',
      'd0', 'p1', null,
      'z0', null, null
    ],
    dropZone: [
      null, null, null,
      null, null, 'p0',
      'd0', 'p1', null,
      null, null, null
    ],
    dropZoneCenter: 'z0'
  },
  {
    name: 'U',
    index: 21,
    amount: 8,
    center: null,
    deg: 0,
    connectors: [
      'd0', 'p0', null,
      'p0', null, 'p0',
      'd0', 'p1', null,
      'p1', null, 'p1'
    ],
    dropZone: [
      'd0', null, null,
      'p0', null, null,
      'd0', null, null,
      'p1', null, null
    ],
    dropZoneCenter: 'd0'
  },
  {
    name: 'V',
    index: 22,
    amount: 9,
    center: null,
    deg: 0,
    connectors: [
      'p0', null, null,
      'p0', null, 'p0',
      'd0', 'p1', 'p1',
      'd0', 'p0', null
    ],
    dropZone: [
      'p0', null, null,
      null, null, null,
      null, 'p1', null,
      null, null, null
    ],
    dropZoneCenter: 'd0'
  },
  {
    name: 'W',
    index: 23,
    amount: 4,
    center: null,
    deg: 0,
    connectors: [
      'p0', null, 'p0',
      'd0', 'p1', 'p1',
      'd1', 'p2', 'p2',
      'd2', 'p0', null
    ],
    dropZone: [
      'p0', null, null,
      'd0', 'p1', null,
      'd1', null, 'p2',
      'd2', null, null
    ],
    dropZoneCenter: null
  },
  {
    name: 'X',
    index: 24,
    amount: 1,
    center: null,
    deg: 0,
    connectors: [
      'd0', 'p0', 'p0',
      'd1', 'p1', 'p1',
      'd2', 'p2', 'p2',
      'd3', 'p3', 'p3'
    ],
    dropZone: [
      'd0', 'p0', null,
      'd1', 'p1', null,
      'd2', null, 'p2',
      'd3', null, 'p3'
    ],
    dropZoneCenter: null
  }
]
