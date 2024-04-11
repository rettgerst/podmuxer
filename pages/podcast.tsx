import {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse
} from 'next';

import filterPodcast, { FilterOptions } from 'lib/filterPodcast';
import { decodeOptions } from 'lib/searchParamCodec';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const params = new URL(ctx.req.headers.host + ctx.resolvedUrl).searchParams;

	const { inputUrl, filterOptions } = decodeOptions(params);

	const inputXml = await fetch(inputUrl).then(res => res.text());

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
