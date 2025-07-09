import type { NewOrder } from '$lib/stores/orderStore.svelte';
import orderStore from '$lib/stores/orderStore.svelte';
import { generateOrderSummary } from '$lib/utils/orderTransformer';
// import supabase from '$lib/utils/supabaseInit';
import supabase from '../supabaseInit';

interface Order {
	buyerId: string;
	status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | null;
	cart?: unknown;
	created_at: string;
	edited_at?: string;
}

class OrderService {
	// 🆕 Create a new order
	async createOrder(order: Omit<Order, 'id' | 'created_at' | 'edited_at'>) {
		const payload = {
			edited_at: new Date().toISOString(), // Convert to ISO string
			cart: JSON.stringify(order.cart),
			status: 'confirmed',
			buyerId: order.buyerId
		};

		// Ensure the payload is a plain object
		const plainPayload = JSON.parse(JSON.stringify(payload));
		const { data, error } = await supabase.from('orders').insert(plainPayload);
		if (error) {
			throw new Error(error.message);
		}

		return { success: true, data };
	}

	// 📥 Fetch orders (optionally filter by buyerId)
	async getOrders(orderId?: string, page: number = 1, pageSize: number = 50) {
		const from = (page - 1) * pageSize;
		const to = from + pageSize - 1;

		let query = supabase
			.from('orders')
			.select('*') // join with products table
			.range(from, to);

		if (orderId) {
			query = query.eq('orderId', orderId);
		}

		const { data, error } = await query;
		if (error) throw new Error(error.message);

		return { success: true, data: data as unknown as NewOrder[] };
	}

	// 🔁 Update an order
	async updateOrder(orderId: string, updates: Partial<Omit<Order, 'id'>>) {
		const { data, error } = await supabase
			.from('orders')
			.update({
				...updates,
				edited_at: new Date()
			})
			.eq('id', orderId);

		if (error) {
			throw new Error(error.message);
		}

		return { success: true, data };
	}

	async deleteOrder(orderId: string) {
		const { error } = await supabase.from('orders').delete().eq('id', orderId);
		if (error) {
			throw new Error(error.message);
		}

		return { success: true };
	}
	/**
	 * 📡 Listen to real-time INSERTs on the orders table
	 * Pushes new orders to orderStore
	 */
	async realTimeChanges() {
		const channel = supabase
			.channel('orders-inserts-channel')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'orders'
				},
				async (payload) => {
					const newOrder = await generateOrderSummary(payload.new as NewOrder);
					orderStore.unshift(newOrder);
				}
			)
			.subscribe((status) => {
				if (status === 'SUBSCRIBED') {
					console.log('✅ Subscribed to orders INSERT events');
				} else if (status) {
					console.error('❌ Subscription error on orders table');
				}
			});

		return channel;
	}
}

export default new OrderService();
