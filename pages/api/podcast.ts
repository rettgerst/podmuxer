import { NextApiRequest, NextApiResponse } from 'next';

import filterPodcast from 'lib/filterPodcast';
import { decodeOptions } from 'lib/searchParamCodec';

export default async function podcastApi(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = new URL(req.headers.host! + req.url).searchParams;

	const { inputUrl, filterOptions } = decodeOptions(params);

	const inputXml = await fetch(inputUrl).then(res => res.text());

	const filteredXml = filterPodcast(inputXml, filterOptions);

	res.setHeader('Content-Type', 'application/xml');

	res.statusCode = 200;

	res.end(filteredXml);
}
