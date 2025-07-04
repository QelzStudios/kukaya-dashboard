import supabase from '../supabaseInit';
import toastStore from '~/store/toastStore';

interface Order {
	buyerId: string;
	status?:
		| 'pending'
		| 'confirmed'
		| 'shipped'
		| 'delivered'
		| 'cancelled'
		| null;
	cart?: any;
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
			buyerId: order.buyerId,
		};

		// Ensure the payload is a plain object
		const plainPayload = JSON.parse(JSON.stringify(payload));
		const { data, error } = await supabase.from('orders').insert(plainPayload);
		if (error) {
			toastStore.initToads('error', error.message, 5000);
			throw new Error(error.message);
		}

		toastStore.initToads('success', 'Order created successfully', 3000);
		return { success: true, data };
	}

	// 📥 Fetch orders (optionally filter by buyerId)
	async getOrders(buyerId?: string) {
		let query = supabase
			.from('orders')
			.select('*')
			.order('created_at', { ascending: false });
		if (buyerId) {
			query = query.eq('buyerId', buyerId);
		}
		const { data, error } = await query;
		if (error) {
			toastStore.initToads('error', error.message, 5000);
			throw new Error(error.message);
		}

		return { success: true, data };
	}

	// 🔁 Update an order
	async updateOrder(orderId: string, updates: Partial<Omit<Order, 'id'>>) {
		const { data, error } = await supabase
			.from('orders')
			.update({
				...updates,
				edited_at: new Date(),
			})
			.eq('id', orderId);

		if (error) {
			toastStore.initToads('error', error.message, 5000);
			throw new Error(error.message);
		}

		return { success: true, data };
	}

	async deleteOrder(orderId: string) {
		const { error } = await supabase.from('orders').delete().eq('id', orderId);
		if (error) {
			toastStore.initToads('error', error.message, 5000);
			throw new Error(error.message);
		}

		toastStore.initToads('success', 'Order deleted successfully', 3000);
		return { success: true };
	}
}

export default new OrderService();
