import {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse
} from 'next';

import filterPodcast, { FilterOptions } from 'lib/filterPodcast';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const url = ctx.query.inputUrl as string;

	const inputXml = await fetch(url).then(res => res.text());

	const titleReplacement = ctx.query.titleReplacement as string;
	const descriptionReplacement = ctx.query.descriptionReplacement as string;
	const imageReplacement = ctx.query.imageReplacement as string;

	const titleRegexWhitelist = ctx.query.titleRegexWhitelist as string;
	const titleRegexBlacklist = ctx.query.titleRegexBlacklist as string;

	const filterOptions: FilterOptions = {
		contentReplacement: {
			channel: {
				title: titleReplacement,
				description: descriptionReplacement
			},
			items: {
				image: imageReplacement
			}
		},
		titleRegex: {
			whitelist: titleRegexWhitelist
				? new RegExp(titleRegexWhitelist)
				: undefined,
			blacklist: titleRegexBlacklist
				? new RegExp(titleRegexBlacklist)
				: undefined
		}
	};

	const filteredXml = filterPodcast(inputXml, filterOptions);

	ctx.res.setHeader('Content-Type', 'application/xml');

	ctx.res.statusCode = 200;

	ctx.res.end(filteredXml);

	return {
		props: {}
	};
};

export default async function Podcast(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return <></>;
}
