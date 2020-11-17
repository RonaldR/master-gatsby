import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import SEO from '../components/SEO';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ slicemasters }) {
	return (
		<div>
			<h2 className="center">
				<span className="mark tilt">Slicemasters working</span>
			</h2>
			<p>Standing by, ready to slice!</p>
			{!slicemasters && <LoadingGrid count={4} />}
			{slicemasters && !slicemasters.length && (
				<p>No one is working right now!</p>
			)}

			{slicemasters && slicemasters.length && (
				<ItemGrid items={slicemasters} />
			)}
		</div>
	);
}

function HotSlices({ hotSlices }) {
	return (
		<div>
			<h2 className="center">
				<span className="mark tilt">Hot Slices now</span>
			</h2>
			<p>Hot Slices, ready to buy</p>
			{!hotSlices && <LoadingGrid count={4} />}
			{hotSlices && !hotSlices.length && <p>No hot slices right now!</p>}
			{hotSlices && hotSlices.length && <ItemGrid items={hotSlices} />}
		</div>
	);
}

function HomePage() {
	const { hotSlices, slicemasters } = useLatestData();

	console.log({ hotSlices, slicemasters });

	return (
		<>
			<SEO title="Home" />
			<div className="center">
				<h1>The Slickest Pizzas</h1>
				<p>Open 24/7, ORDER NOW!</p>
				<HomePageGrid>
					<CurrentlySlicing slicemasters={slicemasters} />
					<HotSlices hotSlices={hotSlices} />
				</HomePageGrid>
			</div>
		</>
	);
}

export default HomePage;
