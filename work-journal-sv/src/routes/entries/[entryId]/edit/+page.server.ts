import { error } from '@sveltejs/kit';

export function load({ params }) {
	if (typeof params.entryId !== 'string') {
		error(404, 'Not Found');
	}

	if (params.entryId) {
		return {
			id: params.entryId
		};
	}
}
