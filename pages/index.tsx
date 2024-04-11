import { Inter } from 'next/font/google';
import Head from 'next/head';

import { useEffect, useMemo, useState } from 'react';

import filterPodcast from 'lib/filterPodcast';
import { encodeOptions } from 'lib/searchParamCodec';

import useFeed from 'hooks/useFetchedValue';

import FilterOptionForm from 'components/FilterOptionForm';
import RSSFeedRender from 'components/RSSFeedRender';

import styles from 'styles/Home.module.scss';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const [feedUrl, setFeedUrl] = useState('');

	const xml = useFeed(feedUrl);

	const [filter, setFilter] = useState({});

	const filteredXml = useMemo(() => {
		if (!xml) return null;
		return filterPodcast(xml, filter);
	}, [filter, xml]);

	const optionParams = useMemo(() => {
		return encodeOptions({
			inputUrl: feedUrl,
			filterOptions: filter
		});
	}, [feedUrl, filter]);

	const [filteredPodcastLink, setFilteredPodcastLink] = useState('');

	useEffect(() => {
		const origin = window.location.origin;

		const newUrl = `${origin}/podcast?${optionParams.toString()}`;

		setFilteredPodcastLink(newUrl);
	}, [optionParams]);

	return (
		<>
			<Head>
				<title>Podmuxer</title>
			</Head>
			<main className={`${styles.main} ${inter.className}`}>
				<h1>Podmuxer</h1>
				<input
					type="url"
					value={feedUrl}
					onChange={e => setFeedUrl(e.target.value)}
				/>

				<FilterOptionForm value={filter} onChange={setFilter} />

				<a href={filteredPodcastLink} target="_blank">
					{filteredPodcastLink}
				</a>

				{filteredXml ? (
					<RSSFeedRender xml={filteredXml} />
				) : (
					<p>Enter a podcast RSS feed URL to get started</p>
				)}
			</main>
		</>
	);
}
