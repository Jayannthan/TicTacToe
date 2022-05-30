import React, { useState } from 'react';
import { Board } from '../Board/Board';
import { ResultModal } from '../ResultModal/ResultModal';
import './Game.css';
import { calculateWinner } from '../../utils/WinnerCalculator';

export const Game = () => {
	const [cellValues, setCellValues] = useState(['', '', '', '', '', '', '', '', '']);
	// const winningCombination = [];
	const [xIsNext, setXIsNext] = useState(true);
	const [isGameOver, setIsGameOver] = useState(false);
	const [noOfTurnsLeft, setNoOfTurnsLeft] = useState(9);
	const [winner, setWinner] = useState();
	const [winningCombination, setWinningCombination] = useState([]);

	const isCellEmpty = (celIndex) => cellValues[celIndex] === '';

	const restartGame = () => {
		setCellValues(['', '', '', '', '', '', '', '', '']);
		setXIsNext(true);
		setIsGameOver(false);
		setNoOfTurnsLeft(9);
		setWinner();
		setWinningCombination([]);
	}
	const cellClicked = (cellIndex) => {
		if (isCellEmpty(cellIndex)) {
			const newCellValues = [...cellValues];
			newCellValues[cellIndex] = xIsNext ? 'X' : 'O';
			const newNoOfTurnsLeft = noOfTurnsLeft - 1;
			const calcResult = calculateWinner(newCellValues, newNoOfTurnsLeft, cellIndex);
			setCellValues(newCellValues);
			console.log(newNoOfTurnsLeft);
			setXIsNext(!xIsNext);
			setIsGameOver(calcResult.hasResult);
			setNoOfTurnsLeft(newNoOfTurnsLeft);
			setWinner(calcResult.winner);
			setWinningCombination(calcResult.winningCombination);
		}
	}
	return (
		<div className="Game">
			<div id="game">
				<h1>Tic Tac Toe</h1>
				<Board
					cellValues={cellValues}
					winningCombination={winningCombination}
					cellClicked={cellClicked} />
			</div>

			<ResultModal isGameOver={isGameOver} winner={winner} onNewGameClicked={restartGame} />
		</div>

	);
}

// export default App;
