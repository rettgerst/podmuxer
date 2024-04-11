/* eslint-disable @next/next/no-img-element */
import * as cheerio from 'cheerio';

import styles from './RSSFeedRender.module.scss';

interface RSSFeedRenderProps {
	xml: string;
}

const dateFormat = Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric'
});

export default function RSSFeedRender({ xml }: RSSFeedRenderProps) {
	const $ = cheerio.load(xml, { xmlMode: true });

	const title = $('rss channel > title').text();
	const description = $('rss channel > description').text();
	const image = $('rss channel > image > url').text();

	return (
		<div className={styles.RSSFeed}>
			<div className={styles.Header}>
				<div className={styles.Left}>
					<img src={image} alt="Podcast Logo" />
				</div>
				<div className={styles.Right}>
					<h1>{title}</h1>
					<h3>{description}</h3>
				</div>
			</div>

			<div className={styles.Feed}>
				{$('rss channel item').map((_, item) => {
					const title = $(item).find('title').text().trim();
					const link = $(item).find('link').text().trim();
					const pubDate = $(item).find('pubDate').text().trim();

					return (
						<div key={link} className={styles.Item}>
							<h2>{title}</h2>
							<p>{dateFormat.format(new Date(pubDate))}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
