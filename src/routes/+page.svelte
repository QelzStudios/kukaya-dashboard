<script lang="ts">
	import { Button, Spinner } from 'flowbite-svelte';
	import { EyeSlashOutline, EyeOutline } from 'flowbite-svelte-icons';
	import AuthService from '../lib/services/auth-service/main';
	import { goto } from '$app/navigation';
	import logger from '$lib/utils/sentry';

	let email = $state('');
	let password = $state('');
	let processing = $state(false);
	let errorMessage = $state('');
	let showPassword = $state(false);

	async function handleSubmit(event: any) {
		try {
			event.preventDefault();
			processing = true;
			const isAuth = await AuthService.loginWithEmailAndPassword(email, password);
			if (isAuth) processing = false;
			goto('/dashboard');
		} catch (error) {
			logger.captureException(error);

			const err = error as Error;
			processing = false;
			errorMessage = err.message;
			setTimeout(() => (errorMessage = ''), 9000);
		}
	}
</script>

<div class=" flex h-screen w-screen items-center justify-center">
	<div
		class="flex h-1/2 w-5/6 flex-col items-center justify-center gap-5 bg-[#f2ece3] p-2 md:h-[400px] md:w-[400px]"
	>
		<div class="flex w-full justify-center">
			<img alt="logo" class="mr-5 w-[80px] rounded-sm" src="logo.png" />
		</div>

		<form
			on:submit|preventDefault={handleSubmit}
			class="h-5/6 w-4/5 rounded bg-white p-4 shadow md:h-[250px]"
		>
			<div class="mb-4">
				<label class="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					disabled={processing}
					bind:value={email}
					class="mt-1 block w-full rounded border border-gray-300 p-2"
					required
				/>
			</div>

			<div class="mb">
				<label class="block text-sm font-medium text-gray-700">Password</label>
				<input
					type={showPassword ? 'text' : 'password'}
					disabled={processing}
					bind:value={password}
					class="mt-1 block w-full rounded border border-gray-300 p-2"
					required
				/>
			</div>
			<div class=" flex h-6 items-center justify-between">
				<p class=" text-sm text-red-600">{errorMessage}</p>
				<span class="mr-4 flex gap-1">
					{#if showPassword}
						<EyeOutline />
					{:else}
						<EyeSlashOutline />
					{/if}

					<input class="mt-[0.5px]" type="checkbox" bind:checked={showPassword} /></span
				>
			</div>

			<Button
				type="submit"
				disabled={processing}
				class="flex h-12 w-full items-center justify-center rounded bg-blue-600 py-2 text-xl text-white transition hover:bg-[#00214e]"
			>
				{#if processing}
					<Spinner size="8" color="gray" />
				{:else}
					login
				{/if}
			</Button>
		</form>
	</div>
</div>
