import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';

export default function Pizzas({ data: { pizzas }, pageContext }) {
	return (
		<>
			<SEO
				title={
					pageContext.topping
						? `Pizzas with ${pageContext.topping}`
						: 'Pizzas'
				}
			/>
			<ToppingsFilter />
			<PizzaList pizzas={pizzas.nodes} />
		</>
	);
}

export const query = graphql`
	query PizzaQuery($topping: [String]) {
		pizzas: allSanityPizza(
			filter: { toppings: { elemMatch: { name: { in: $topping } } } }
		) {
			nodes {
				id
				name
				price
				slug {
					current
				}
				toppings {
					id
					name
					vegetarian
				}
				image {
					asset {
						fixed(width: 200, height: 200) {
							...GatsbySanityImageFixed
						}
						fluid(maxWidth: 400) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}
`;
