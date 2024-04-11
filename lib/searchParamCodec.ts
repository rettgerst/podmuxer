import Options from './Options';
import { FilterOptions } from './filterPodcast';

export function encodeOptions(options: Options): URLSearchParams {
	const { inputUrl, filterOptions } = options;

	const searchParams = new URLSearchParams();

	searchParams.set('inputUrl', inputUrl);

	if (filterOptions.contentReplacement?.channel?.title) {
		searchParams.set(
			'titleReplacement',
			filterOptions.contentReplacement.channel.title
		);
	}

	if (filterOptions.contentReplacement?.channel?.description) {
		searchParams.set(
			'descriptionReplacement',
			filterOptions.contentReplacement.channel.description
		);
	}

	if (filterOptions.contentReplacement?.items?.image) {
		searchParams.set(
			'imageReplacement',
			filterOptions.contentReplacement.items.image
		);
	}

	if (filterOptions.titleRegex?.whitelist) {
		searchParams.set(
			'titleRegexWhitelist',
			filterOptions.titleRegex.whitelist.source
		);
	}

	if (filterOptions.titleRegex?.blacklist) {
		searchParams.set(
			'titleRegexBlacklist',
			filterOptions.titleRegex.blacklist.source
		);
	}

	return searchParams;
}

export function decodeOptions(searchParams: URLSearchParams): Options {
	const inputUrl = searchParams.get('inputUrl') || '';

	const filterOptions: FilterOptions = {
		contentReplacement: {
			channel: {
				title: searchParams.get('titleReplacement') || '',
				description: searchParams.get('descriptionReplacement') || ''
			},
			items: {
				image: searchParams.get('imageReplacement') || ''
			}
		},
		titleRegex: {
			whitelist: searchParams.get('titleRegexWhitelist')
				? new RegExp(searchParams.get('titleRegexWhitelist') as string)
				: undefined,
			blacklist: searchParams.get('titleRegexBlacklist')
				? new RegExp(searchParams.get('titleRegexBlacklist') as string)
				: undefined
		}
	};

	return {
		inputUrl,
		filterOptions
	};
}
