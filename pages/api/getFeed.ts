import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		res.status(405).end();
		return;
	}

	const { feedUrl } = req.body;

	const xml = await fetch(feedUrl).then(response => response.text());

	res.appendHeader('Content-Type', 'application/xml');

	res.status(200).send(xml);
}
