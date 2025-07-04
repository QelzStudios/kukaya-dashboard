<script>
	import OrderCard from '$lib/component/orderCard.svelte';
</script>

<div class="min-h-screen w-[98%] bg-gray-100 p-6">
	<div class="flex items-center justify-between p-2">
		<h1 class=" h-full text-2xl font-bold">Orders Dashboard</h1>
		<button class="h-1/2 w-[80px] rounded-sm bg-red-400 p-1 text-white">Log out</button>
	</div>
	<div class="mt-5 p-2">
		<OrderCard />
	</div>
</div>
