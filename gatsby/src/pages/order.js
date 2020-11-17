import { graphql } from 'gatsby';
import React from 'react';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import Img from 'gatsby-image';
import calcPrice from '../utils/calcPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calcOrderTotal from '../utils/calcOrderTotal';

export default function Order({ data: { pizzas } }) {
	const { values, updateValue } = useForm({ name: '', email: '', maple: '' });
	const {
		order,
		addToOrder,
		removeFromOrder,
		error,
		loading,
		message,
		submitOrder,
	} = usePizza({
		pizzas,
		values,
	});

	if (message) {
		return (
			<div>
				<p>{message}</p>
			</div>
		);
	}

	return (
		<>
			<SEO title="Order a pizza" />
			<OrderStyles onSubmit={submitOrder}>
				<fieldset disabled={loading}>
					<legend>Your Info</legend>

					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						id="name"
						value={values.name}
						onChange={updateValue}
					/>

					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={values.email}
						onChange={updateValue}
					/>

					<input
						type="text"
						name="maple"
						id="maple"
						value={values.maple}
						onChange={updateValue}
						className="input-maple"
					/>
				</fieldset>

				<fieldset className="menu" disabled={loading}>
					<legend>Menu</legend>
					{pizzas.nodes.map((pizza) => (
						<MenuItemStyles key={pizza.id}>
							<Img
								width="50"
								height="50"
								fluid={pizza.image.asset.fluid}
								alt={pizza.name}
							/>

							<div>
								<h2>{pizza.name}</h2>
							</div>

							<div>
								{['S', 'M', 'L'].map((size) => (
									<button
										key={size + pizza.id}
										type="button"
										onClick={() =>
											addToOrder({ id: pizza.id, size })
										}
									>
										{size}{' '}
										{formatMoney(
											calcPrice(pizza.price, size)
										)}
									</button>
								))}
							</div>
						</MenuItemStyles>
					))}
				</fieldset>

				<fieldset className="order" disabled={loading}>
					<legend>Order</legend>
					<PizzaOrder
						order={order}
						pizzas={pizzas.nodes}
						removeFromOrder={removeFromOrder}
					/>
				</fieldset>

				<fieldset disabled={loading}>
					<h3>
						Your total is{' '}
						{formatMoney(calcOrderTotal(order, pizzas.nodes))}
					</h3>

					{error && (
						<div>
							<p>Error: {error}</p>
						</div>
					)}

					<button type="submit" disabled={loading}>
						{loading ? 'Sending order' : 'Order Ahead'}
					</button>
				</fieldset>
			</OrderStyles>
		</>
	);
}

export const query = graphql`
	query {
		pizzas: allSanityPizza {
			nodes {
				id
				name
				price
				slug {
					current
				}
				image {
					asset {
						fluid(maxWidth: 100) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}
`;
