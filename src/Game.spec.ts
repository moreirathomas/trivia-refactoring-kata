import { Game } from "./Game";
import { Player } from "./player/Player";

it("players should alternate", function () {
  const chloe = new Player("Chloe");
  const omar = new Player("Omar");
  const name = Game.builder() //
    .withPlayers(chloe)
    .withPlayers(omar)
    .build()
    .roll(1)
    .giveTheCorrectAnswer().player.name;
  expect(name).toEqual("Omar");
});

it("players should alternate (case: going into penalty box)", function () {
  const chloe = new Player("Chloe");
  const omar = new Player("Omar");
  const name = Game.builder() //
    .withPlayers(chloe, omar)
    .build()
    .roll(1)
    .giveAWrongAnswer().player.name;
  expect(name).toEqual("Omar");
});

it("players should alternate (case: in penalty box)", function () {
  const chloe = new Player("Chloe");
  const omar = new Player("Omar");
  const name = Game.builder() //
    .withPlayers(chloe, omar)
    .build()
    .roll(1)
    .giveAWrongAnswer()
    .roll(5)
    .giveTheCorrectAnswer()
    .roll(2)
    .pass().player.name;
  expect(name).toEqual("Omar");
});

it("players should alternate (case: going out of the penalty box)", function () {
  const chloe = new Player("Chloe");
  const omar = new Player("Omar");
  const name = Game.builder() //
    .withPlayers(chloe, omar)
    .build()
    .roll(1)
    .giveAWrongAnswer()
    .roll(5)
    .giveTheCorrectAnswer()
    .roll(1)
    .giveTheCorrectAnswer().player.name;
  expect(name).toEqual("Omar");
});

it("game should not start without at least 2 players", function () {
  const chloe = new Player("Chloe");
  expect(() => Game.builder().withPlayers(chloe).build()).toThrowError();
});
