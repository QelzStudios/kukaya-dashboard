import UserService from '$lib/services/user-service/main';
import type { NewOrder } from '$lib/stores/orderStore.svelte';
import exchangeRate from './exchangeRate';
import exchangeRates from './exchangeRates';
import extractNumber from './extractNumber';
import platformPrricer from './platformPrricer';

export interface OrderSummary {
	orderNumber: string;
	customerNumber: string;
	customerName: string;
	shippingCost: number;
	grandTotal: number;
	orderedAt: string;
	delivered: boolean;
	id: string;
	items: { name: string; quantity: number }[];
}

export async function generateOrderSummary(order: NewOrder): Promise<OrderSummary> {
	const { cart, buyerId, id } = order;

	// Fetch user details from userService
	const user: User = await UserService.getUser(buyerId);
	const items = cart.cartListings.map((item) => ({
		name: item.name,
		quantity: item.qty
	}));

	// Calculate total item cost
	const itemTotal = cart.cartListings.reduce((sum, item) => {
		const dor = item.price;
		return sum + dor * item.qty;
	}, 0);

	const shippingCost = exchangeRates.convertToTSh(cart.shipping);
	const grandTotal = itemTotal + shippingCost;

	return {
		orderNumber: cart.orderId,
		customerNumber: user.phoneNumber,
		customerName: user.fullName,
		shippingCost,
		grandTotal,
		orderedAt: new Date().toISOString(), // or pass explicitly
		delivered: false, // hardcoded for now — add field if needed
		items,
		id
	};
}
