import { useEffect, useMemo, useState } from 'react';

import { debounce } from 'lodash';

export default function useDebouncedValue<T>(inputValue: T, timeout = 300) {
	const [value, setValue] = useState(inputValue);

	const debouncedSetValue = useMemo(
		() => debounce(setValue, timeout),
		[timeout]
	);

	useEffect(() => {
		debouncedSetValue(inputValue);
	}, [debouncedSetValue, inputValue]);

	return value;
}
