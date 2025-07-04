import supabase from '../supabaseInit';
import toastStore from '~/store/toastStore';

interface OrderItem {
	id?: string;
	orderId: string;
	product_Id: string;
	quantity: number;
	unitPrice: number;
	created_at?: string;
}

class OrderItemService {
	// ➕ Add order items (supports single or bulk insert)
	async addOrderItems(items: Omit<OrderItem, 'id' | 'created_at'>[]) {
		const { data, error } = await supabase.from('order_items').insert(items);
		if (error) {
			toastStore.initToads('error', error.message, 5000);
			throw new Error(error.message);
		}
		toastStore.initToads('success', 'Order items added', 3000);
		return { success: true, data };
	}

	// 📦 Get all items for an order
	async getItemsForOrder(orderId: string) {
		const { data, error } = await supabase
			.from('order_items')
			.select('*, products(*)') // joins product details
			.eq('orderId', orderId);

		if (error) {
			toastStore.initToads('error', error.message, 5000);
			throw new Error(error.message);
		}

		return { success: true, data };
	}

	// 🗑️ Delete items by orderId (e.g., cancel order)
	async deleteItemsForOrder(orderId: string) {
		const { error } = await supabase
			.from('order_items')
			.delete()
			.eq('orderId', orderId);

		if (error) {
			toastStore.initToads('error', error.message, 5000);
			throw new Error(error.message);
		}
		toastStore.initToads('success', 'Order items deleted', 3000);
		return { success: true };
	}
}

export default new OrderItemService();
