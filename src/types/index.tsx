export interface ApiResponse<T> {
  title: string;
  timestamp: string;
  data?: T;
}

export interface PaginatedDataResponse<T> {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageData: string;
  imageMimeType: string;
  extras: ProductExtra[];
  categoryId?: number;
  category?: Category;
  createdAt: string;
  salesCount: number;
  isActive: boolean;
};

export type ProductExtra = {
  id: number;
  productId: number;
  product: Product;
  extraId: number;
  extra: Extra;
};

export type Address = {
  id: number;
  city: string;
  state: string;
  zipCode: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  userId: number;
  user: User;
  isStandard: boolean;
};

export type Category = {
  id: number;
  name: string;
  createdAt: string;
  products: Product[];
};

export type Extra = {
  id: number;
  name: string;
  price: number;
  createdAt: string;
  isActive: boolean;
};

export type Order = {
  id: number;
  createdAt: string;
  updatedAt: string;
  orderStatus: OrderStatus;
  userId: number;
  user?: User;
  addressId?: number;
  address?: Address;
  items: OrderProductItem[];
  logs: OrderLog[];
  paymentMethodId?: number;
  paymentMethod?: PaymentMethod;
  totalPrice: number;
  notes?: string;
};

export type OrderLog = {
  id: number;
  createdAt: string;
  description: string;
  status: OrderStatus;
  userId: number;
  user?: User;
  orderId: number;
  order?: Order;
};

export enum OrderStatus {
  Cart,
  Pending,
  Preparing,
  OnTheWay,
  Delivered,
  Cancelled,
}

export type OrderProductItem = {
  id: number;
  orderId: number;
  productId: number;
  product: Product;
  extrasItems: OrderExtraItem[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
};

export type OrderExtraItem = {
  id: number;
  extraId: number;
  extra: Extra;
  orderProductItemId: number;
  quantity: number;
};

export type PaymentMethod = {
  id: number;
  name: string;
  createdAt: string;
};

export type User = {
  id: number;
  role: UserRole;
  name: string;
  email: string;
  cpf: string;
  addresses: Address[];
  isActive: boolean;
  createdAt: string;
  ordersCount: number;
};

export enum UserRole {
  Usuário,
  Admin,
}

export type LoggedUser = {
  user: User;
  token: string;
};
