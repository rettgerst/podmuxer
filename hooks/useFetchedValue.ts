import { useEffect, useState } from 'react';

import useDebouncedValue from './useDebouncedValue';

export default function useFeed(url: string) {
	const debouncedUrl = useDebouncedValue(url);

	const [fetchedValue, setFetchedValue] = useState<string | null>(null);

	useEffect(() => {
		if (!debouncedUrl) {
			return;
		}

		fetch('/api/getFeed', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ feedUrl: debouncedUrl })
		})
			.then(response => {
				if (response.ok) return response.text();
				else throw new Error('Failed to fetch feed');
			})
			.then(text => setFetchedValue(text))
			.catch(() => setFetchedValue(null));
	}, [debouncedUrl]);

	return fetchedValue;
}
