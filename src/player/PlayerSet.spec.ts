import { Player } from ".";
import { PlayerSet } from "./PlayerSet";

it("on initialization, the current player should be the first one added", function () {
  const player0 = new Player("Chloe");
  const player1 = new Player("Omar");
  const player2 = new Player("Sebastian");
  const playerSet = new PlayerSet([player0, player1, player2]);
  expect(playerSet.getCurrentPlayer().name).toEqual("Chloe");
});

it("should allow to turn to the next player", function () {
  const player0 = new Player("Chloe");
  const player1 = new Player("Omar");
  const player2 = new Player("Sebastian");
  const playerSet = new PlayerSet([player0, player1, player2]).turnToNextPlayer();
  expect(playerSet.getCurrentPlayer().name).toEqual("Omar");
});

it("when all players have played, it should allow to turn back to the first player", function () {
  const player0 = new Player("Chloe");
  const player1 = new Player("Omar");
  const player2 = new Player("Sebastian");
  const playerSet = new PlayerSet([player0, player1, player2]).turnToNextPlayer().turnToNextPlayer().turnToNextPlayer();
  expect(playerSet.getCurrentPlayer().name).toEqual("Chloe");
});
