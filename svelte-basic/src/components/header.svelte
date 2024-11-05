<script lang="ts">
	// let name: string = $state('scott');
	// let lastname: string = $state('sky');
	// let status: 'OPEN' | 'CLOSE' = $state('OPEN');
	// let full_name = $derived(`${name} ${lastname}`);
	let { header }: { header?: string } = $props();
	let background = header ? 'back' : 'pink';
	function onclick() {
		status = status === 'OPEN' ? 'CLOSE' : 'OPEN';
	}
</script>

<header>
	<h1>
		{header ? header : 'User'}'s Form
	</h1>
</header>

<!-- <input type="text" bind:value={name} />
<input type="text" bind:value={lastname} />
<p>the store is now {status}</p>
<!-- <button onclick={toggle}>{status === 'OPEN' ? 'CLOSE' : 'OPEN'}</button> -->
<!-- <button {onclick}>{status === 'OPEN' ? 'CLOSE' : 'OPEN'}</button> -->

<style>
	header {
		background: red;
	}
</style>
