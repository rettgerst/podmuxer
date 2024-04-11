import fs from 'fs';
import path from 'path';

import filterPodcast from 'lib/filterPodcast';

const officialXML = fs.readFileSync(
	path.resolve(__dirname, 'theofficialpodcast.xml'),
	'utf8'
);

const readThreadNames = ['Red Thread'];
const criminallyStupidNames = ['Criminally Stupid', 'Podophiles'];

// main show is anything that is not red thread or criminally stupid/podophiles

const mainShowNameRegex = new RegExp(
	`(${readThreadNames.join('|')}|${criminallyStupidNames.join('|')})`,
	'i'
);

describe('filter official podcast episodes', () => {
	test('main show', () => {
		const mainXML = filterPodcast(officialXML, {
			contentReplacement: {
				channel: {
					title: 'The Official Podcast'
				},
				items: {}
			},
			titleRegex: {
				blacklist: mainShowNameRegex
			}
		});

		expect(mainXML).toMatchSnapshot();
	});

	test('red thread', () => {
		const redThreadXML = filterPodcast(officialXML, {
			contentReplacement: {
				channel: {
					title: 'Red Thread'
				},
				items: {}
			},
			titleRegex: {
				whitelist: new RegExp(readThreadNames.join('|'), 'i')
			}
		});

		expect(redThreadXML).toMatchSnapshot();
	});

	test('criminally stupid', () => {
		const criminallyStupidXML = filterPodcast(officialXML, {
			contentReplacement: {
				channel: {
					title: 'Criminally Stupid'
				},
				items: {}
			},
			titleRegex: {
				whitelist: new RegExp(criminallyStupidNames.join('|'), 'i')
			}
		});

		expect(criminallyStupidXML).toMatchSnapshot();
	});
});
