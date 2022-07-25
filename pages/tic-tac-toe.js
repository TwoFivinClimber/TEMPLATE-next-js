/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { React, useState } from 'react';

const RenderTicTac = () => {
  const [turn, setTurn] = useState('X');
  const [cells, setCells] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState('?');

  const winGame = (squares) => {
    const winners = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      dowm: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    // eslint-disable-next-line no-restricted-syntax,, guard-for-in
    for (const set in winners) {
      // LOOPS OVER ARR WITHIN winners. set === across, down, diagonal.
      winners[set].forEach((match) => {
        // LOOPS THROUGH ARR'S IN ACROSS, DOWN, DIAGONAL. match === individual arr's in across, down, and diagonal.
        if (
          squares[match[0]] === ''
            || squares[match[1]] === ''
            || squares[match[2]] === ''
        ) {
          // SQUARES = ['X', 'X', 'X', 'O', 'X', 'O', 'O', '', ''] *** X's AND O's WERE played by user and stored in state.
          // DO NOTHING IF ANY WINNING COMBOS ARE EMPTY
        } else if (
          squares[match[0]] === squares[match[1]]
          && squares[match[1]] === squares[match[2]]
          // THIS HARD PART.  I WASN'T BREAKING DOWN THE ORDER OF EVENTS WITH THE COMPARISON IN MIND. WHEN I LOGGGD match TO SEE THAT IT GAVE ME THE ARRAYS, AND THEN LOGGED squares[match[0]] TO SEE THAT IT WAS WORKING "LINEARLY" TO RETURN THE INDICES FROM THE WINNERS, IT MADES SENSE HOW true WAS BEING OBTAINED. USING THE ABOVE SQUARES VALUE: squares[match[0]] === "x", squares[match[1]] === "x" AND squares[match[2] === "x". ==> setWinner.
        ) {
          setWinner(squares[match[0]]);
        }
      });
    }
  };
  // eslint-disable-next-line no-unused-vars
  const handleClick = (num) => {
    if (cells[num] !== '') {
      alert('That Cell Is Taken');
      return;
    }
    const squares = [...cells];
    if (turn === 'X') {
      squares[num] = 'X';
      setTurn('O');
    } else {
      squares[num] = 'O';
      setTurn('X');
    }

    winGame(squares);
    setCells(squares);
  };

  // eslint-disable-next-line arrow-body-style, react/prop-types
  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  return (
    <div>
      <table className="tic-tac-table">
        <tbody>
          <h4>Turn: {turn}</h4>
          <h4>The Winner is { winner }</h4>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RenderTicTac;
