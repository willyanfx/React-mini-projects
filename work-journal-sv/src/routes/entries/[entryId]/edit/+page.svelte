<script>
	let { data } = $props();
</script>

<div class="mt-4">
	<p class="mb-8 rounded-lg border border-gray-700/30 bg-gray-800/50 p-4 lg:mb-20 lg:p-6">
		<span class="text-sm font-medium text-gray-500 lg:text-base">Edit entry</span>
	</p>
	<form action=""></form>
	<div class="mt-3 space-y-4"></div>
	<div class="mt-8">
		<button class="text-sm text-gray-600 underline"> Delete this entry ... </button>
	</div>
</div>
<h1>{JSON.stringify(data.id)}</h1>
