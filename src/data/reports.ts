// data.ts

export interface ProductTransaction {
  id: string;
  timestamp: string;
  productName: string;
  category: string;
  quantity: number;
  unitPrice: number;
  revenue: number;
  region: string;
}

export interface SummaryMetrics {
  totalRevenue: number;
  totalSalesCount: number;
  topProduct: string;
  topProductVolume: string;
}

// Generate realistic data covering historical blocks up to June 2026
export const productSalesDatabase: ProductTransaction[] = [
  { id: 'INV-2026-9041', timestamp: '2026-06-03T14:32:00Z', productName: 'Coca-Cola 500ml', category: 'Beverages', quantity: 140, unitPrice: 2.28, revenue: 319.20, region: 'Tashkent (HQ)' },
  { id: 'INV-2026-9042', timestamp: '2026-06-02T11:15:00Z', productName: 'Fanta Orange 1.5L', category: 'Beverages', quantity: 85, unitPrice: 4.00, revenue: 340.00, region: 'Samarkand Hub' },
  { id: 'INV-2026-9043', timestamp: '2026-05-31T09:45:00Z', productName: 'Sprite 1.0L', category: 'Beverages', quantity: 120, unitPrice: 3.00, revenue: 360.00, region: 'Fergana Valley' },
  { id: 'INV-2026-9044', timestamp: '2026-05-29T16:20:00Z', productName: 'Coca-Cola 500ml', category: 'Beverages', quantity: 200, unitPrice: 2.25, revenue: 450.00, region: 'Tashkent (HQ)' },
  { id: 'INV-2026-9045', timestamp: '2026-05-18T10:11:00Z', productName: 'Fanta Orange 1.5L', category: 'Beverages', quantity: 495, unitPrice: 4.00, revenue: 1980.00, region: 'Tashkent (HQ)' },
  { id: 'INV-2026-9046', timestamp: '2026-05-12T15:30:00Z', productName: 'Bonaqua Still 500ml', category: 'Water', quantity: 1200, unitPrice: 1.10, revenue: 1320.00, region: 'Bukhara Node' },
  { id: 'INV-2026-9047', timestamp: '2026-05-05T13:14:00Z', productName: 'Sprite 1.0L', category: 'Beverages', quantity: 310, unitPrice: 3.00, revenue: 930.00, region: 'Samarkand Hub' },
  { id: 'INV-2026-9048', timestamp: '2026-04-22T17:05:00Z', productName: 'Coca-Cola 500ml', category: 'Beverages', quantity: 1500, unitPrice: 2.20, revenue: 3300.00, region: 'Tashkent (HQ)' },
  { id: 'INV-2026-9049', timestamp: '2026-03-14T11:55:00Z', productName: 'Fanta Orange 1.5L', category: 'Beverages', quantity: 900, unitPrice: 4.00, revenue: 3600.00, region: 'Fergana Valley' },
  { id: 'INV-2026-9050', timestamp: '2026-02-10T14:22:00Z', productName: 'Bonaqua Still 500ml', category: 'Water', quantity: 4000, unitPrice: 1.05, revenue: 4200.00, region: 'Tashkent (HQ)' },
];
export const staticPrecomputedMetrics = {
  weekly: {
    revenue: "$1,470",
    sales: "4",
    topProduct: "Coca-Cola 500ml",
    volume: "340 units",
  },
  monthly: {
    revenue: "$5,700",
    sales: "7",
    topProduct: "Fanta Orange 1.5L",
    volume: "580 units",
  },
  quarterly: {
    revenue: "$21,420",
    sales: "11",
    topProduct: "Bonaqua Still 500ml",
    volume: "5,200 units",
  },
};
