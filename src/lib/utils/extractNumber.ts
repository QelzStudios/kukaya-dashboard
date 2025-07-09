export default function extractNumber(str: string) {
	const cleaned = str.replace(/,/g, ''); // remove commas
	const match = cleaned.match(/\d+(\.\d+)?/); // match number with optional decimal
	return match ? parseFloat(match[0]) : 0;
}
