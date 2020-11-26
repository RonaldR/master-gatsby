import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const SliceMasterGridStyles = styled.section`
	display: grid;
	gap: 2rem;
	--minWidth: 250px;
	grid-template-columns: repeat(auto-fill, minmax(var(--minWidth), 1fr));

	@media (max-width: 500px) {
		--minWidth: 100%;
	}
`;

const SliceMasterStyles = styled.div`
	a {
		text-decoration: none;
	}

	.gatsby-image-wrapper {
		height: 400px;
	}

	h2 {
		transform: rotate(-2deg);
		text-align: center;
		font-size: 4rem;
		margin-bottom: -2rem;
		position: relative;
		z-index: 1;
	}

	.description {
		background: var(--yellow);
		padding: 1rem;
		margin: 2rem;
		margin-top: -6rem;
		z-index: 2;
		position: relative;
		transform: rotate(1deg);
		text-align: center;
	}
`;

export default function SliceMasters({ data: { sliceMasters }, pageContext }) {
	return (
		<>
			<SEO
				title={`Slicemasters - Page ${pageContext.currentPage || 1}`}
			/>

			<Pagination
				pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
				totalCount={sliceMasters.totalCount}
				currentPage={pageContext.currentPage || 1}
				skip={pageContext.skip}
				base="/slicemasters"
			/>
			<h1 className="center">
				Our {sliceMasters.totalCount} slicemasters
			</h1>

			<SliceMasterGridStyles>
				{sliceMasters.nodes.map((sliceMaster) => (
					<SliceMasterStyles key={sliceMaster.id}>
						<Link to={`${sliceMaster.slug.current}`}>
							<h2>
								<span className="mark">{sliceMaster.name}</span>
							</h2>
						</Link>
						<Img fluid={sliceMaster.image.asset.fluid} />
						<p className="description">{sliceMaster.description}</p>
					</SliceMasterStyles>
				))}
			</SliceMasterGridStyles>
		</>
	);
}

export const query = graphql`
	query($skip: Int = 0, $pageSize: Int = 3) {
		sliceMasters: allSanityPerson(limit: $pageSize, skip: $skip) {
			totalCount
			nodes {
				id
				name
				description
				slug {
					current
				}
				image {
					asset {
						fluid(maxWidth: 400) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}
`;
