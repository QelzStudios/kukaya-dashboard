export default function (price: number): string {
	if (price < 189) {
		return `${price + 60}`;
	}
	return `${price + 80}`;
}
