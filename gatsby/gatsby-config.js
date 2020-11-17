import dotenv from 'dotenv';

dotenv.config();

export default {
	siteMetadata: {
		title: `Slicks Slices`,
		siteUrl: `https://gatsby.pizza`,
		description: `The beste pizza's in the world`,
		twitter: '@slicksSlices',
	},
	plugins: [
		'gatsby-plugin-styled-components',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-source-sanity',
			options: {
				projectId: 'qjs4a8fd',
				dataset: 'production',
				watchMode: true,
				token: process.env.SANITY_TOKEN,
			},
		},
	],
};
