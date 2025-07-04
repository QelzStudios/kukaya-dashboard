<script>
	export let order;

	let isDelivered = order.delivered || false;

	const handleConfirm = () => {
		alert(`Order ${order.orderNumber} confirmed.`);
	};

	const handleRevoke = () => {
		alert(`Order ${order.orderNumber} revoked.`);
	};

	function formatDate(dateStr) {
		const date = new Date(dateStr);
		return date.toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function markAsDelivered() {
		isDelivered = true;
	}
</script>

<div
	class="w-full max-w-full rounded-2xl border p-4 shadow-lg transition hover:shadow-xl sm:p-6"
	class:bg-green-100={isDelivered}
	class:bg-white={!isDelivered}
	class:border-green-400={isDelivered}
	class:border-gray-200={!isDelivered}
>
	<div class="mb-4 flex gap-3 sm:flex-row sm:items-start sm:justify-between">
		<div class="sm:w-[90%] md:w-auto">
			<h2 class="text-base font-semibold text-gray-900 sm:text-lg">Order #{order.orderNumber}</h2>
			<p class="text-sm text-gray-600">
				{order.customerName} &mdash; <span class="text-gray-500">{order.customerNumber}</span>
			</p>
			<p class="mt-1 text-xs text-gray-400">Ordered on: {formatDate(order.orderedAt)}</p>
		</div>

		{#if !isDelivered}
			<div class="flex flex-wrap items-center gap-2 sm:justify-end">
				<!-- Delivered Toggle Icon -->
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					on:click={markAsDelivered}
					class="rounded-full p-1 focus:outline-none"
					title="Mark as delivered"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="gray"
						class="h-6 w-6 transition duration-200 ease-in-out hover:stroke-green-600"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
					</svg>
				</button>

				<button
					on:click={handleConfirm}
					class="rounded-md bg-green-600 px-3 py-1.5 text-xs text-white hover:bg-green-700"
				>
					Confirm
				</button>
				<button
					on:click={handleRevoke}
					class="rounded-md bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600"
				>
					Revoke
				</button>
			</div>
		{/if}
	</div>

	<div class="mb-3 space-y-1 text-sm text-gray-700">
		<p><strong>Shipping Cost:</strong> ${order.shippingCost.toFixed(2)}</p>
		<p>
			<strong>Grand Total:</strong> ${order.grandTotal.toLocaleString(undefined, {
				minimumFractionDigits: 2
			})}
		</p>
	</div>

	<div>
		<h3 class="mb-1 text-sm font-semibold text-gray-800">Items Ordered:</h3>
		<ul class="list-disc space-y-1 pl-5 text-sm text-gray-600">
			{#each order.items as item}
				<li>{item.name} × {item.quantity}</li>
			{/each}
		</ul>
	</div>
</div>
