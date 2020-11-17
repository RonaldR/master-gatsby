import calcPrice from './calcPrice';
import formatMoney from './formatMoney';

export default function attachNamesAndPrices(order, pizzas) {
	return order.map((orderItem) => {
		const pizza = pizzas.find((pizza) => pizza.id === orderItem.id);
		return {
			...orderItem,
			name: pizza.name,
			thumbnail: pizza.image.asset.fluid.src,
			price: formatMoney(calcPrice(pizza.price, orderItem.size)),
		};
	});
}
