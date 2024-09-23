import React from 'react';
// import './ServicesPage.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const ServicesPage = () => {
	return (
		<div>
			<Nav />
			<div className="services">
				<h1>Servicios</h1>
				<p>Estos son los servicios que ofrecemos.</p>
				<ul>
					<li>Servicio 1</li>
					<li>Servicio 2</li>
					<li>Servicio 3</li>
					<li>Servicio 4</li>
					<li>Servicio 5</li>
				</ul>
			</div>
			<Footer />
		</div>
	);
}

export default ServicesPage;