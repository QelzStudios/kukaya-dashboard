<script lang="ts">
	let email = '';
	let password = '';

	function handleSubmit(event: any) {
		event.preventDefault();
		console.log('Email:', email);
		console.log('Password:', password);
		// Add your login logic here
	}
</script>

<div class="flex h-1/2 w-5/6 flex-col items-center justify-center gap-5 bg-[#f2ece3]">
	<div class="flex w-full justify-center">
		<img alt="logo" class="mr-5 w-[60px] rounded-sm" src="logo.png" />
	</div>

	<form on:submit|preventDefault={handleSubmit} class="h-1/2 w-4/5 rounded bg-white p-4 shadow">
		<div class="mb-4">
			<label class="block text-sm font-medium text-gray-700">Email</label>
			<input
				type="email"
				bind:value={email}
				class="mt-1 block w-full rounded border border-gray-300 p-2"
				required
			/>
		</div>

		<div class="mb-4">
			<label class="block text-sm font-medium text-gray-700">Password</label>
			<input
				type="password"
				bind:value={password}
				class="mt-1 block w-full rounded border border-gray-300 p-2"
				required
			/>
		</div>

		<button
			type="submit"
			class="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-[#00214e]"
		>
			Login
		</button>
	</form>
</div>
