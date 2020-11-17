import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calcPrice from '../utils/calcPrice';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
	return (
		<>
			<p>You have {order.length} items in your order!</p>

			{order.map((orderItem, index) => {
				const pizza = pizzas.find((pizza) => pizza.id === orderItem.id);

				return (
					<MenuItemStyles key={orderItem.id + index}>
						<Img fluid={pizza.image.asset.fluid} />
						<h2>{pizza.name}</h2>
						<p>
							{formatMoney(
								calcPrice(pizza.price, orderItem.size)
							)}
							<button
								type="button"
								className="remove"
								title={`Remove ${orderItem.size} ${pizza.name} from order`}
								onClick={() => removeFromOrder(index)}
							>
								&times;
							</button>
						</p>
					</MenuItemStyles>
				);
			})}
		</>
	);
}
