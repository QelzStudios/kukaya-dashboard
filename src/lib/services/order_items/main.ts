import type { NewOrder } from '$lib/stores/orderStore.svelte';
import orderStore from '$lib/stores/orderStore.svelte';
import { generateOrderSummary } from '$lib/utils/orderTransformer';
import supabase from '../../utils/supabaseInit';

interface OrderItem {
	id?: string;
	orderId: string;
	product_Id: string;
	quantity: number;
	unitPrice: number;
	created_at?: string;
}

class OrderItemService {
	/**
	 * ➕ Add order items (supports single or bulk insert)
	 */
	async addOrderItems(items: Omit<OrderItem, 'id' | 'created_at'>[]) {
		const { data, error } = await supabase.from('order_items').insert(items);
		if (error) throw new Error(error.message);
		return { success: true, data };
	}

	/**
	 * 📦 Get items for a specific order (or all orders if no ID)
	 * Supports pagination
	 */
	async getItemsForOrder(orderId?: string, page: number = 1, pageSize: number = 50) {
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

	/**
	 * 🗑️ Delete all items for a given order ID
	 */
	async deleteItemsForOrder(orderId: string) {
		const { error } = await supabase.from('order_items').delete().eq('orderId', orderId);
		if (error) throw new Error(error.message);
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

export default new OrderItemService();
