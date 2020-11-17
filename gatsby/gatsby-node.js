import path from 'path';
import fetch from 'isomorphic-fetch';
import { create } from 'domain';

async function turnPizzasIntoPages({ graphql, actions }) {
	const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
	const { data } = await graphql(`
		query {
			pizzas: allSanityPizza {
				nodes {
					name
					slug {
						current
					}
				}
			}
		}
	`);

	data.pizzas.nodes.forEach((pizza) => {
		actions.createPage({
			path: `pizza/${pizza.slug.current}`, // url
			component: pizzaTemplate,
			context: {
				slug: pizza.slug.current,
			},
		});
	});
}

async function turnToppingIntoPages({ graphql, actions }) {
	const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
	const { data } = await graphql(`
		query {
			toppings: allSanityTopping {
				nodes {
					name
					id
				}
			}
		}
	`);

	data.toppings.nodes.forEach((topping) => {
		actions.createPage({
			path: `topping/${topping.name}`, // url
			component: toppingsTemplate,
			context: {
				topping: topping.name,
			},
		});
	});
}

async function fetchBeersAndTurnIntoNodes({
	actions,
	createNodeId,
	createContentDigest,
}) {
	const res = await fetch(`https://sampleapis.com/beers/api/ale`);
	const beers = await res.json();
	for (const beer of beers) {
		const nodeMeta = {
			id: createNodeId(`beer-${beer.name}`),
			parent: null,
			children: [],
			internal: {
				type: 'Beer',
				mediaType: 'application/json',
				contentDigest: createContentDigest(beer),
			},
		};

		actions.createNode({
			...beer,
			...nodeMeta,
		});
	}
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
	const { data } = await graphql(`
		query {
			slicemasters: allSanityPerson {
				totalCount
				nodes {
					id
					name
					slug {
						current
					}
				}
			}
		}
	`);

	data.slicemasters.nodes.forEach((slicemaster) => {
		actions.createPage({
			path: `/slicemasters/${slicemaster.slug.current}`,
			component: path.resolve(`./src/templates/Slicemaster.js`),
			// data past to the template on create
			context: {
				slug: slicemaster.slug.current,
			},
		});
	});

	const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
	const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
	Array.from({ length: pageCount }).forEach((_, i) => {
		actions.createPage({
			path: `/slicemasters/${i + 1}`,
			component: path.resolve(`./src/pages/slicemasters.js`),
			// data past to the template on create
			context: {
				skip: i * pageSize,
				currentPage: i + 1,
				pageSize,
			},
		});
	});
}

export async function sourceNodes(params) {
	await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
	await Promise.all([
		turnPizzasIntoPages(params),
		turnToppingIntoPages(params),
		turnSlicemastersIntoPages(params),
	]);
}
