const exchangeRates = {
	shillion: 2570, // Assuming 1 USD = 2570 TSh
	convertToTSh: (amountInUSD: number) => {
		return Math.round(amountInUSD * exchangeRates.shillion * 100) / 100;
	},
};

export default exchangeRates;
