<script lang="ts">
	type FormStep = {
		question: string;
		id: string;
		type: string;
	};
	type FormState = {
		name: string;
		birthday: string;
		step: number;
		error: string;
	};

	let formState: FormState = $state({
		name: '',
		birthday: '',
		step: 0,
		error: ''
	});

	import Header from '../components/header.svelte';
</script>

<main>
	<Header header={formState.name} />
	<p>Step: {formState.step}</p>

	{@render formStep({ question: 'What is your name?', id: 'name', type: 'text' })}
</main>

{#snippet formStep({ question, id, type }: FormStep)}
	<article>
		<div>
			<label for={id}>{question}</label>
			<input {type} {id} bind:value={formState[id]} />
		</div>
	</article>
{/snippet}
