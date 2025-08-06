<script lang="ts">
	import { goto } from '$app/navigation';
	import OrderCard from '$lib/component/orderCard.svelte';
	import { onMount } from 'svelte';
	import AuthService from '../../lib/services/auth-service/main';
	import OrderService from '../../lib/services/order_service/main';
	import { generateOrderSummary, type OrderSummary } from '$lib/utils/orderTransformer';
	import orderStore from '$lib/stores/orderStore.svelte';
	import logger from '$lib/utils/sentry';

	let orders: OrderSummary[] = $state([]);

	onMount(async () => {
		try {
			const { data } = await OrderService.getOrders();
			const i = await OrderService.realTimeChanges();
			data.forEach(async (element) => {
				const sum = await generateOrderSummary(element);
				console.log({ sum });
				orderStore.push(sum);
			});
		} catch (error) {
			logger.captureException(error);
		}
	});

	$effect(() => {
		orders = orderStore;
	});

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
