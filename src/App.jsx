import React from "react";
import "./App.css";
import Die from "./components/Die";

function App() {
	function allNewDice() {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push(Math.floor(Math.random() * 6) + 1)
		}
		return newDice;
	}
	const [dice, setDice] = React.useState(allNewDice());
	const diceComponents = dice.map((die, index) => (
		<Die value={die} key={index} />
	))

	function rollDice() {
		setDice(allNewDice());
	}
	return (
		<main>
			<div className="dice-container">
				{diceComponents}
			</div>
			<button className="roll-dice" onClick={rollDice}>Roll</button>
		</main>
	)
}

export default App;