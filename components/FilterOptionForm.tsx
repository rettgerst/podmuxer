import { useState } from 'react';

import { FilterOptions } from 'lib/filterPodcast';

interface FilterOptionFormProps {
	value: FilterOptions;
	onChange?: (value: FilterOptions) => void;
}

export default function FilterOptionForm({
	value,
	onChange
}: FilterOptionFormProps) {
	return (
		<form>
			<h2>Content Replacement</h2>
			<label>
				Channel Title
				<input
					type="text"
					value={value.contentReplacement?.channel?.title}
					onChange={e => {
						if (!onChange) return;
						onChange({
							...value,
							contentReplacement: {
								...value.contentReplacement,
								channel: {
									...value.contentReplacement?.channel,
									title: e.target.value
								}
							}
						});
					}}
				/>
			</label>
			<br />
			<label>
				Channel Description
				<input
					type="text"
					value={value.contentReplacement?.channel?.description}
					onChange={e => {
						if (!onChange) return;
						onChange({
							...value,
							contentReplacement: {
								...value.contentReplacement,
								channel: {
									...value.contentReplacement?.channel,
									description: e.target.value
								}
							}
						});
					}}
				/>
			</label>

			<br />

			<label>
				Channel Image
				<input
					type="text"
					value={value.contentReplacement?.channel?.image}
					onChange={e => {
						if (!onChange) return;
						onChange({
							...value,
							contentReplacement: {
								...value.contentReplacement,
								channel: {
									...value.contentReplacement?.channel,
									image: e.target.value
								}
							}
						});
					}}
				/>
			</label>

			<br />
			<label>
				Item Image
				<input
					type="text"
					value={value.contentReplacement?.items?.image}
					onChange={e => {
						if (!onChange) return;
						onChange({
							...value,
							contentReplacement: {
								...value.contentReplacement,
								items: {
									...value.contentReplacement?.items,
									image: e.target.value
								}
							}
						});
					}}
				/>
			</label>

			<br />
			<h2>Title Regex</h2>
			<label>
				Title Whitelist
				<input
					type="text"
					value={value.titleRegex?.whitelist?.source}
					onChange={e => {
						if (!onChange) return;
						onChange({
							...value,
							titleRegex: {
								...value.titleRegex,
								whitelist: e.target.value
									? new RegExp(e.target.value)
									: undefined
							}
						});
					}}
				/>
			</label>
			<br />
			<label>
				Title Blacklist
				<input
					type="text"
					value={value.titleRegex?.blacklist?.source}
					onChange={e => {
						if (!onChange) return;
						onChange({
							...value,
							titleRegex: {
								...value.titleRegex,
								blacklist: e.target.value
									? new RegExp(e.target.value)
									: undefined
							}
						});
					}}
				/>
			</label>
		</form>
	);
}
