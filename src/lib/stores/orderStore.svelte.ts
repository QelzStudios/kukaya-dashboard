import type { OrderSummary } from '$lib/utils/orderTransformer';

export interface CartListing {
	id: string;
	name: string;
	price: number;
	qty: number;
	remove: null; // You can refine this if `remove` has a known type
}

export interface Cart {
	cartListings: CartListing[];
	orderId: string;
	shipping: number;
	userId: string;
}

export interface Order {
	id: string;
	buyerId: string;
	cart: Cart;
	status: 'confirmed' | 'pending' | 'shipped' | 'cancelled'; // Extend as needed
	created_at: string; // ISO timestamp
	edited_at: string; // ISO timestamp
}
export type NewOrder = Omit<Order, 'created_at' | 'edited_at'>;

const orderStore = $state<OrderSummary[]>([]);

export default orderStore;
