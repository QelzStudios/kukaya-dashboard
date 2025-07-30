export default {
	shillion: 25611, // Assuming 1 USD = 25611 TSh
	convertToTSh: (amountInUSD: number) => {
		return Math.round(amountInUSD * 25611 * 100) / 100;
	}
};
