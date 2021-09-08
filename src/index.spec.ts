import { Game } from ".";
import { Player } from "./player/Player";

it("players should alternate", function () {
  const chloe = new Player("Chloe");
  const omar = new Player("Omar");
  const game = new Game([chloe, omar]);
  game.roll(1);
  game.currentPlayerGivesTheCorrectAnswer();
  game.roll(2);
  expect(omar.getLocation()).toEqual(2);
});

it("players should alternate (case: going into penalty box)", function () {
  const chloe = new Player("Chloe");
  const omar = new Player("Omar");
  const game = new Game([chloe, omar]);
  game.roll(1);
  game.currentPlayerGivesAWrongAnswer();
  game.roll(2);
  expect(omar.getLocation()).toEqual(2);
});

it("players should alternate (case: in penalty box)", function () {
  const chloe = new Player("Chloe");
  const omar = new Player("Omar");
  const game = new Game([chloe, omar]);
  game.roll(1);
  game.currentPlayerGivesAWrongAnswer();
  game.roll(5);
  game.currentPlayerGivesTheCorrectAnswer();
  game.roll(2);
  game.currentPlayerGivesTheCorrectAnswer();
  game.roll(5);
  expect(omar.getLocation()).toEqual(10);
});

it("players should alternate (case: going out of the penalty box)", function () {
  const chloe = new Player("Chloe");
  const omar = new Player("Omar");
  const game = new Game([chloe, omar]);
  game.roll(1);
  game.currentPlayerGivesAWrongAnswer();
  game.roll(5);
  game.currentPlayerGivesTheCorrectAnswer();
  game.roll(1);
  game.currentPlayerGivesTheCorrectAnswer();
  game.roll(5);
  expect(omar.getLocation()).toEqual(10);
});
