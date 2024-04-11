import * as cheerio from 'cheerio';

export interface FilterOptions {
	contentReplacement?: {
		channel?: {
			title?: string;
			description?: string;
			image?: string;
		};
		items?: {
			titleRewrite?: [RegExp, string];
			image?: string;
		};
	};
	titleRegex?: {
		whitelist?: RegExp;
		blacklist?: RegExp;
	};
}

function titleRegexMutate(
	$: cheerio.CheerioAPI,
	titleRegex: FilterOptions['titleRegex']
) {
	if (titleRegex) {
		const { whitelist, blacklist } = titleRegex;
		$('rss channel item').each((_, item) => {
			const title = $(item).find('title').text().trim();

			const remove = () => $(item).remove();

			if (whitelist && !whitelist.test(title)) remove();
			else if (blacklist && blacklist.test(title)) remove();
		});
	}
}

/** Creates a new XML document from an input XML document and options. */
export default function filterPodcast(
	inputDocument: string,
	options: FilterOptions
) {
	const $ = cheerio.load(inputDocument, { xmlMode: true });

	const { contentReplacement, titleRegex } = options;

	if (options.contentReplacement?.channel?.title) {
		$('rss channel > title').text(options.contentReplacement.channel.title);
	}

	if (options.contentReplacement?.channel?.description) {
		$('rss channel > description').text(
			options.contentReplacement.channel.description
		);
	}

	if (options.contentReplacement?.channel?.image) {
		$('rss channel > image > url').text(
			options.contentReplacement.channel.image
		);

		$('rss channel > itunes\\:image').attr(
			'href',
			options.contentReplacement.channel.image
		);
	}

	if (options.contentReplacement?.items?.image) {
		$('rss channel item image url').text(
			options.contentReplacement.items.image
		);
	}

	titleRegexMutate($, titleRegex);

	return $.xml();
}
