import { CircularBoard } from "./CircularBoard";

it("should move on board according to the dice roll", function () {
  const board = new CircularBoard({ size: 12, questionPoolSize: 50 });
  expect(board.computeLocationAfterRoll(0, 1)).toEqual(1);
});

it("it should loop around the board according to its circular nature", function () {
  const board = new CircularBoard({ size: 12, questionPoolSize: 50 });
  expect(board.computeLocationAfterRoll(11, 1)).toEqual(0);
});
