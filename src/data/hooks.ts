import { useMemo } from 'react';
import { MEDIPIM_PRODUCTS } from './medipim/products';
import { MEDIPIM_CATEGORIES } from './medipim/categories';
import { MEDIPIM_SUPPLIERS } from './medipim/suppliers';
import { MEDIPIM_USERS } from './medipim/users';
import { LOCHTING_ORDERS } from './lochting/orders';
import { LOCHTING_CUSTOMERS } from './lochting/customers';
import { LOCHTING_NOTIFICATIONS } from './lochting/notifications';
import { LOCHTING_PRODUCTS } from './lochting/products';
import type { Product, Category, Supplier, User, Order, Customer, Notification, WebshopProduct } from './types';

// --- Medipim hooks ---

export function useMedipimProducts(): Product[] {
  return MEDIPIM_PRODUCTS;
}

export function useMedipimProduct(id: string): Product | undefined {
  return useMemo(() => MEDIPIM_PRODUCTS.find((p) => p.id === id), [id]);
}

export function useMedipimProductsByCategory(category: string): Product[] {
  return useMemo(() => MEDIPIM_PRODUCTS.filter((p) => p.category === category), [category]);
}

export function useMedipimCategories(): Category[] {
  return MEDIPIM_CATEGORIES;
}

export function useMedipimSuppliers(): Supplier[] {
  return MEDIPIM_SUPPLIERS;
}

export function useMedipimUsers(): User[] {
  return MEDIPIM_USERS;
}

// --- Lochting hooks ---

export function useLochtingOrders(): Order[] {
  return LOCHTING_ORDERS;
}

export function useLochtingOrdersByStatus(status: Order['status']): Order[] {
  return useMemo(() => LOCHTING_ORDERS.filter((o) => o.status === status), [status]);
}

export function useLochtingCustomers(): Customer[] {
  return LOCHTING_CUSTOMERS;
}

export function useLochtingCustomer(id: string): Customer | undefined {
  return useMemo(() => LOCHTING_CUSTOMERS.find((c) => c.id === id), [id]);
}

export function useLochtingNotifications(): Notification[] {
  return LOCHTING_NOTIFICATIONS;
}

export function useLochtingUnreadNotifications(): Notification[] {
  return useMemo(() => LOCHTING_NOTIFICATIONS.filter((n) => !n.read), []);
}

export function useLochtingProducts(): WebshopProduct[] {
  return LOCHTING_PRODUCTS;
}

export function useLochtingFeaturedProducts(): WebshopProduct[] {
  return useMemo(() => LOCHTING_PRODUCTS.filter((p) => p.isFeatured), []);
}
