// export type Product = {
//   title: string;
//   brand: string;
//   price: number;
//   _id: string;
//   image: { url: string; thumbnailUrl: string; fileId: string };
//   rating: string;
//   category: string;
//   description: string;
//   style: string;
//   totalReviews: number;
//   availability: string;
// };

export interface Image {
  fileId: string;
  url: string;
  thumbnailUrl: string;
}

export interface Product {
  _id: string;
  title: string;
  brand: string;
  price: number;
  rating: string;
  category: string;
  style: string;
  description: string;
  totalReviews: number;
  availability: string;
  image: Image;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderItem {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
  subtotal: number;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "completed"
  | "cancelled";

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrdersResponse {
  orders: Order[];
}
