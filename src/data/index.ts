// Types
export type {
  Product,
  WebshopProduct,
  Category,
  Supplier,
  Order,
  OrderItem,
  Customer,
  Notification,
  User,
} from './types';

// Medipim data
export { MEDIPIM_PRODUCTS } from './medipim/products';
export { MEDIPIM_CATEGORIES } from './medipim/categories';
export { MEDIPIM_SUPPLIERS } from './medipim/suppliers';
export { MEDIPIM_USERS } from './medipim/users';

// Lochting data
export { LOCHTING_ORDERS } from './lochting/orders';
export { LOCHTING_CUSTOMERS } from './lochting/customers';
export { LOCHTING_NOTIFICATIONS } from './lochting/notifications';
export { LOCHTING_PRODUCTS } from './lochting/products';

// Hooks
export {
  useMedipimProducts,
  useMedipimProduct,
  useMedipimProductsByCategory,
  useMedipimCategories,
  useMedipimSuppliers,
  useMedipimUsers,
  useLochtingOrders,
  useLochtingOrdersByStatus,
  useLochtingCustomers,
  useLochtingCustomer,
  useLochtingNotifications,
  useLochtingUnreadNotifications,
  useLochtingProducts,
  useLochtingFeaturedProducts,
} from './hooks';
