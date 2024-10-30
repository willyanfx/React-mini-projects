<script lang="ts">
</script>

{#snippet entryListItem({ entry, canEdit }: { entry: any; canEdit?: boolean })}
	<li>
		{entry.text}
		{#if canEdit}<a>Edit</a>{/if}
	</li>
{/snippet}

<h1>Welcome to SvelteKit</h1>

{@render entryListItem({ entry: { text: 'name' }, canEdit: true })}
