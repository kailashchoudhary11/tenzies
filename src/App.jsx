import React from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

function App() {

	const [dice, setDice] = React.useState(allNewDice());
	
	const [tenzies, setTenzies] = React.useState(false);

	const [rolls, setRolls] = React.useState(1);

	const [lowestRolls, setLowestRolls] = React.useState(JSON.parse(localStorage.getItem("lowestRolls")) || Number.MAX_VALUE);

	const [time, setTime] = React.useState({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	let myInterval = 0;

	const diceComponents = dice.map(die => (	
		<Die 
			isHeld={die.isHeld} 
			value={die.value} 
			key={die.id} 
			handleClick={() => handleHold(die.id)}
		/>
	));

	React.useEffect(() => {
		const val = dice[0].value;
		setTenzies(dice.every(die => die.value === val && die.isHeld));
		gameOver();
	}, [dice, tenzies]);

	function gameOver() {
		if (tenzies) {
			console.log("winner");
			if (rolls < lowestRolls) {
				setLowestRolls(rolls);
				localStorage.setItem("lowestRolls", JSON.stringify(lowestRolls));
			}
			clearInterval(myInterval);
		}
	}

	function allNewDice() {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			const value = Math.floor(Math.random() * 6) + 1;
			newDice.push({
				"value": value, 
				isHeld: false,
				id: nanoid(),
			});
		}
		return newDice;
	}

	function handleHold(id) {
		setDice(prevDice => prevDice.map(die => {
			return die.id === id ? {...die, isHeld : !die.isHeld} : die;
		}));
	}

	function rollDice() {
		if (tenzies) {
			setTenzies(false);
			setDice(allNewDice());
			setRolls(1);
			return;
		}
		setDice(prevDice => prevDice.map(die => {
			return die.isHeld ? 
				die :
				{...die, value: Math.floor(Math.random() * 6) + 1}
		}));
		setRolls(prevRoll => prevRoll + 1);
	}

	// React.useEffect(startTimer, []);

	function startTimer() {
		rollDice();
		myInterval = setInterval(() => console.log("Hello"), 1000);
	}

	return (
		<main>
			<h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
			{tenzies && <Confetti/>}
			<div className="current-stats">
				<p>Number of Rolls: {rolls}</p>

			</div>
			{tenzies && <p>Lowest Rolls: {lowestRolls}</p>}
			<div className="dice-container">
				{diceComponents}
			</div>
			{ tenzies ? 
				<button className="roll-dice" onClick={rollDice}>New Game</button>
				:
				<button className="roll-dice" onClick={rollDice}>Roll</button>
			}
		</main>
	)
}

export default App;