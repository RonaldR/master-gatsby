import calcPrice from './calcPrice';

export default function calcOrderTotal(order, pizzas) {
	return order.reduce((acc, orderItem) => {
		const pizza = pizzas.find((pizza) => pizza.id === orderItem.id);
		return acc + calcPrice(pizza.price, orderItem.size);
	}, 0);
}
