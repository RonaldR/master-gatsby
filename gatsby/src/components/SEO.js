import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

export default function SEO({ children, location, title, description, image }) {
	const {
		site: { siteMetadata },
	} = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
					twitter
				}
			}
		}
	`);

	return (
		<Helmet titleTemplate={`%s - ${siteMetadata.title}`}>
			<html lang="en" />
			<title>{title}</title>
			<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
			<link rel="alternate icon" href="/favicon.ico" />

			<meta
				name="viewport"
				content="width=device-width,initial-scale=1.0"
			/>
			<meta
				name="description"
				content={description || siteMetadata.description}
			/>

			{location && <meta property="og:url" content={location.href} />}
			<meta property="og:image" content={image || '/logo.svg'} />
			<meta property="og:title" content={title} key="ogtitle" />
			<meta
				property="og:sitename"
				content={siteMetadata.title}
				key="ogsitename"
			/>
			<meta
				property="og:description"
				content={description || siteMetadata.description}
				key="ogsitename"
			/>

			{children}
		</Helmet>
	);
}
