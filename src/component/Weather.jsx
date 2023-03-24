import { useEffect, useState } from "react";
import "./weather.css";
import React from "react";
import { Cold, Hot, Rain, Smoke } from "../images";

const Weather = () => {
	const [data, setData] = useState({});
	const [city, setCity] = useState("lahore");

	const apikey = "735208d215c16a04366e38ad4f767c6c";
	const getWeatherData = async () => {
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
			);
			const actualData = await res.json();
			console.log(actualData);
			if (actualData.cod === 200) {
				setData(actualData);
			} else {
				alert(actualData.message);
			}
			setCity("");
		} catch (err) {
			console.log(err);
		}
	};

	const handleCahnge = (e) => {
		setCity(e.target.value);
	};
	const enterPressedKey = (e) => {
		if (e.code === "Enter") {
			getWeatherData();
		}
	};

	useEffect(() => {
		getWeatherData();
	}, []);

	return (
		<>
			<div
				style={{
					backgroundImage: `url(${data?.weather?.map((item) =>
						item?.main === "Rain"
							? `${Rain}`
							: item?.main === "Smoke"
							? `${Smoke}`
							: item?.main === "Clouds"
							? `${Cold}`
							: `${Hot}`
					)})`,
				}}
				className="flex flex-col items-center bg-cover overflow-hidden"
			>
				<h1 className="mb-10 mt-20 lg:mt-10 lg:mb-5 text-6xl text-white">
					WEATHER APP
				</h1>
				<div className="inputdiv">
					<input
						className="text-3xl lg:text-xl w-96 h-16 lg:h-14 mt-1 outline-0 border-none pl-1 rounded"
						type="search"
						placeholder="Enter city name"
						onKeyDown={enterPressedKey}
						value={city}
						onChange={handleCahnge}
					/>
					<br />

					<button
						className="text-white text-3xl lg:text-xl w-96 h-16 lg:h-14 mt-4 bg-gray-500 border-none rounded"
						onKeyDown={enterPressedKey}
						onClick={getWeatherData}
					>
						Search
					</button>
				</div>
				<div className="weathericond_maindiv">
					<div className="flex flex-col text-3xl lg:text-lg w-96 h-96 lg:w-80 lg:h-80 mt-9 mb-10 lg:mt-6 lg:mb-6 rounded-2xl shadow-2xl bg-[#fff5ee] items-center  ">
						{data?.weather?.map((item, index) => (
							<img
								key={index}
								className="w-16 h-16"
								src={`http://openweathermap.org/img/wn/${item.icon}.png`}
								alt="weather icon here"
							/>
						))}
						<div className="flex">
							<h4 className="pr-1">{data.name}</h4>
							<span>({data?.sys?.country})</span>
						</div>
						<h3>
							{Math.round(data?.main?.temp - 273.15)}
							<sup>o</sup>C
						</h3>
						<h6>
							(min){Math.floor(data?.main?.temp - 273.15)}
							<sup>o</sup>C
						</h6>
						<h6>
							(max){Math.ceil(data?.main?.temp - 273.15)}
							<sup>o</sup>C
						</h6>
						<div className="text-[#00008b]  text-3xl mt-16 lg:text-2xl   lg:mt-10 mr-1.5 ml-2.5 flex text-center">
							<p>Humidity {data?.main?.humidity}</p>
							<p>Pressure {data?.main?.pressure}</p>
							<p>Speed {data?.wind?.speed}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Weather;
