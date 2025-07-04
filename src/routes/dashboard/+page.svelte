<script>
	import { goto } from '$app/navigation';
	import OrderCard from '$lib/component/orderCard.svelte';
	import AuthService from '../../lib/services/auth-service/main';
	const orders = [
		{
			orderNumber: 'ORD-4567',
			customerNumber: 'CUST-1234',
			customerName: 'Ama Serwaa',
			shippingCost: 10.5,
			grandTotal: 250.75,
			orderedAt: '2025-07-02T14:00:00Z',
			delivered: false,
			items: [
				{ name: 'Laptop Bag', quantity: 1 },
				{ name: 'Wireless Mouse', quantity: 2 }
			]
		},
		{
			orderNumber: 'ORD-4567',
			customerNumber: 'CUST-1234',
			customerName: 'Ama Serwaa',
			shippingCost: 10.5,
			grandTotal: 250.75,
			orderedAt: '2025-07-02T14:00:00Z',
			delivered: false,
			items: [
				{ name: 'Laptop Bag', quantity: 1 },
				{ name: 'Wireless Mouse', quantity: 2 }
			]
		},
		{
			orderNumber: 'ORD-4567',
			customerNumber: 'CUST-1234',
			customerName: 'Ama Serwaa',
			shippingCost: 10.5,
			grandTotal: 250.75,
			orderedAt: '2025-07-02T14:00:00Z',
			delivered: false,
			items: [
				{ name: 'Laptop Bag', quantity: 1 },
				{ name: 'Wireless Mouse', quantity: 2 }
			]
		},
		{
			orderNumber: 'ORD-4567',
			customerNumber: 'CUST-1234',
			customerName: 'Ama Serwaa',
			shippingCost: 10.5,
			grandTotal: 250.75,
			orderedAt: '2025-07-02T14:00:00Z',
			delivered: false,
			items: [
				{ name: 'Laptop Bag', quantity: 1 },
				{ name: 'Wireless Mouse', quantity: 2 }
			]
		},
		{
			orderNumber: 'ORD-4567',
			customerNumber: 'CUST-1234',
			customerName: 'Ama Serwaa',
			shippingCost: 10.5,
			grandTotal: 250.75,
			orderedAt: '2025-07-02T14:00:00Z',
			delivered: false,
			items: [
				{ name: 'Laptop Bag', quantity: 1 },
				{ name: 'Wireless Mouse', quantity: 2 }
			]
		},
		{
			orderNumber: 'ORD-4567',
			customerNumber: 'CUST-1234',
			customerName: 'Ama Serwaa',
			shippingCost: 10.5,
			grandTotal: 250.75,
			orderedAt: '2025-07-02T14:00:00Z',
			delivered: false,
			items: [
				{ name: 'Laptop Bag', quantity: 1 },
				{ name: 'Wireless Mouse', quantity: 2 }
			]
		}
	];
	async function signOut() {
		await AuthService.signOut();
		goto('/');
	}
</script>

<div class="h-screen overflow-hidden">
	<div class="h-[7%]w-full flex items-center justify-between p-2">
		<h1 class=" text-xl font-bold">Orders Dashboard</h1>
		<button onclick={signOut} class="h-1/2 w-[80px] rounded-sm bg-red-400 p-1 text-white"
			>Log out</button
		>
	</div>
	<div class="mt-5 h-[92%] grid-cols-3 justify-evenly gap-4 overflow-scroll p-2 md:grid md:p-10">
		{#each orders as order}
			<OrderCard {order} />
		{/each}
	</div>
</div>
