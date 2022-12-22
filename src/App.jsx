import React from "react";
import "./App.css";
import Die from "./components/Die";

function App() {
	return (
		<main>
			<div className="dice-container">
				<Die value={1} className="die-block"/>
				<Die value={2} className="die-block"/>
				<Die value={3} className="die-block"/>
				<Die value={4} className="die-block"/>
				<Die value={5} className="die-block"/>
				<Die value={6} className="die-block"/>
				<Die value={3} className="die-block"/>
				<Die value={3} className="die-block"/>
				<Die value={3} className="die-block"/>
				<Die value={3} className="die-block"/>
			</div>
		</main>
	)
}

export default App;