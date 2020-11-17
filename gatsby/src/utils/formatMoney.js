const formatter = Intl.NumberFormat('nl-NL', {
	style: 'currency',
	currency: 'EUR',
});

export default function formatMoney(price) {
	return formatter.format(price / 100);
}
