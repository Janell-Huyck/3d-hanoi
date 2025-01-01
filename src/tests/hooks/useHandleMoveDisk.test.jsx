import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { useHandleMoveDisk } from '@hooks';
import { incrementMoveCount } from '@utils';

jest.mock('@utils', () => ({
  incrementMoveCount: jest.fn(),
}));

// Mock component for testing the hook
const HookTester = ({
  game,
  setTowers,
  setMoveCount,
  setVictoryMessage,
  setInvalidMoveMessage,
  fromTower,
  toTower,
}) => {
  const handleMoveDisk = useHandleMoveDisk({
    game,
    setTowers,
    setMoveCount,
    setVictoryMessage,
    setInvalidMoveMessage,
  });

  React.useEffect(() => {
    handleMoveDisk(fromTower, toTower);
  }, [fromTower, toTower, handleMoveDisk]);

  return <div data-testid="hook-tester">Hook Tester</div>;
};

describe('useHandleMoveDisk', () => {
  let mockGame,
    mockSetTowers,
    mockSetMoveCount,
    mockSetVictoryMessage,
    mockSetInvalidMoveMessage;

  beforeEach(() => {
    mockGame = {
      moveDisk: jest.fn(),
      towers: [[3, 2], [1], []],
      isGameWon: jest.fn(),
    };
    mockSetTowers = jest.fn();
    mockSetMoveCount = jest.fn();
    mockSetVictoryMessage = jest.fn();
    mockSetInvalidMoveMessage = jest.fn();

    incrementMoveCount.mockImplementation((setMoveCount) =>
      setMoveCount((prev) => prev + 1),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('handles a valid move by updating towers and incrementing move count', () => {
    render(
      <HookTester
        game={mockGame}
        setTowers={mockSetTowers}
        setMoveCount={mockSetMoveCount}
        setVictoryMessage={mockSetVictoryMessage}
        setInvalidMoveMessage={mockSetInvalidMoveMessage}
        fromTower={0}
        toTower={1}
      />,
    );

    // Ensure the correct move was made
    expect(mockGame.moveDisk).toHaveBeenCalledWith(0, 1);

    // Corrected expectation
    expect(mockSetTowers).toHaveBeenCalledWith([[3, 2], [1], []]);
    expect(incrementMoveCount).toHaveBeenCalledWith(mockSetMoveCount);
    expect(mockSetVictoryMessage).not.toHaveBeenCalled();
    expect(mockSetInvalidMoveMessage).not.toHaveBeenCalled();
  });

  it('sets victory message when the game is won', () => {
    mockGame.isGameWon.mockReturnValueOnce(true);

    render(
      <HookTester
        game={mockGame}
        setTowers={mockSetTowers}
        setMoveCount={mockSetMoveCount}
        setVictoryMessage={mockSetVictoryMessage}
        setInvalidMoveMessage={mockSetInvalidMoveMessage}
        fromTower={0}
        toTower={1}
      />,
    );

    expect(mockSetVictoryMessage).toHaveBeenCalledWith(
      'Congratulations! You have won the game!',
    );
  });

  it('sets invalid move message on an invalid move', () => {
    mockGame.moveDisk.mockImplementation(() => {
      throw new Error('Invalid move!');
    });

    render(
      <HookTester
        game={mockGame}
        setTowers={mockSetTowers}
        setMoveCount={mockSetMoveCount}
        setVictoryMessage={mockSetVictoryMessage}
        setInvalidMoveMessage={mockSetInvalidMoveMessage}
        fromTower={0}
        toTower={1}
      />,
    );

    expect(mockSetInvalidMoveMessage).toHaveBeenCalledWith('Invalid move!');
  });
});

HookTester.propTypes = {
  game: PropTypes.shape({
    moveDisk: PropTypes.func.isRequired,
    towers: PropTypes.array.isRequired,
    isGameWon: PropTypes.func.isRequired,
  }).isRequired,
  setTowers: PropTypes.func.isRequired,
  setMoveCount: PropTypes.func.isRequired,
  setVictoryMessage: PropTypes.func.isRequired,
  setInvalidMoveMessage: PropTypes.func.isRequired,
  fromTower: PropTypes.number.isRequired,
  toTower: PropTypes.number.isRequired,
};
