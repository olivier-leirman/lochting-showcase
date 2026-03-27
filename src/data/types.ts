// BW Design System — Data Types
// Shared interfaces for Medipim & Lochting fixture data

export interface Product {
  id: string;
  name: string;
  cnk: string; // Belgian pharmacy product code (7-digit)
  category: string;
  subcategory: string;
  price: number;
  stock: number;
  supplier: string;
  description: string;
  requiresPrescription: boolean;
  imageUrl?: string;
}

export interface WebshopProduct extends Product {
  slug: string;
  isActive: boolean;
  isFeatured: boolean;
  shortDescription: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Material Symbols icon name
  productCount: number;
}

export interface Supplier {
  id: string;
  name: string;
  country: string;
  productCount: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  pharmacyName: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Customer {
  id: string;
  name: string;
  pharmacyName: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
}

export interface Notification {
  id: string;
  type: 'order' | 'stock' | 'system' | 'promotion';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  icon: string; // Material Symbols icon name
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  lastLogin: string;
}
