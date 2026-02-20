
// Build stable local date key for daily deterministic selection.
function getLocalDayKey(now: Date): string {
	const year = now.getFullYear().toString();
	const month = (now.getMonth() + 1).toString().padStart(2, '0');
	const day = now.getDate().toString().padStart(2, '0');
	return `${year}-${month}-${day}`;
}

// Hash the day key into a valid array index.
function hashDayToIndex(dayKey: string, length: number): number {
	let hash = 0;
	for (const char of dayKey) {
		hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
	}
	return hash % length;
}

export { hashDayToIndex, getLocalDayKey };