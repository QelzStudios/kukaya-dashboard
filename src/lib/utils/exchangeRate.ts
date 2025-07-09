export default function convertDollarToCurrency(
	amountInDollars: number,
	type?: boolean,
	exchangeRate: number = 2655.38
) {
	const converted = amountInDollars * exchangeRate;
	// Round up to 2 decimal places
	const roundedUp = Math.ceil(converted * 100) / 100;

	if (type) {
		return roundedUp;
	}

	// Manual comma formatting
	const parts = roundedUp.toFixed(2).split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return parts.join('.');
}
