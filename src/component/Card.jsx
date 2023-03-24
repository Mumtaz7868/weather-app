import React, { useEffect, useState } from "react";
import image from "../images/weatherIcon.png";
import "./card.css";

const Card = () => {
	const [foreCaste, setforeCaste] = useState({});

	const city = "lahore";
	const apikey = "c655a7235ad6144cb3adf769761c4567";
	const getForeCasts = async () => {
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${apikey}`
			);
			const response = await res.json();
			console.log(response);
			setforeCaste(response);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getForeCasts();
	}, []);

	return (
		<>
			<div className="main">
				<h3>5 Day Weather Forecasts</h3>
				{/* <h4>{foreCaste.city.name}</h4> */}

				<div className="main_card">
					<div className="card">
						{/* <button onClick={getForeCasts}>Search </button> */}
						<img className="" src={image} alt="weather icon here" />
						<p>
							18<sup>o</sup>C
						</p>
					</div>
					<div className="card">
						<img className="" src={image} alt="weather icon here" />
						<p>
							18<sup>o</sup>C
						</p>
					</div>
					<div className="card">
						<img className="" src={image} alt="weather icon here" />
						<p>
							18<sup>o</sup>C
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
