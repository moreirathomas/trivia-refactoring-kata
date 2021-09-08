import { Player, PlayerSet } from ".";
import { CircularBoard } from "../Board";
import { NotInPenaltyBoxAndAboutToRollPlayer as StartPlayer } from "./NotInPenaltyBoxAndAboutToRollPlayer";

const board = new CircularBoard({ size: 12, questionPoolSize: 50 });

describe("Test of the core game rules", function () {
  it("a player should start at location 0 with no point", function () {
    const pauline = new Player("Pauline");
    expect(pauline.isInPenaltyBox()).toEqual(false);
    expect(pauline.getLocation()).toEqual(0);
    expect(pauline.getScore()).toEqual(0);
  });

  it("a player should move by the value of the dice roll", function () {
    const pauline = new Player("Pauline");
    const laurent = new Player("Laurent");
    const players = new PlayerSet([pauline, laurent]);
    new StartPlayer(board, players).roll(2);
    expect(pauline.getLocation()).toEqual(2);
  });

  it("a player who gives the correct answer should be given a point", function () {
    const pauline = new Player("Pauline");
    const laurent = new Player("Laurent");
    const players = new PlayerSet([pauline, laurent]);
    new StartPlayer(board, players).roll(2).giveTheCorrectAnswer();
    expect(pauline.getScore()).toEqual(1);
  });

  it("a player who gives a wrong answer should be sent to penalty box with no additional point", function () {
    const pauline = new Player("Pauline");
    const laurent = new Player("Laurent");
    const players = new PlayerSet([pauline, laurent]);
    new StartPlayer(board, players).roll(2).giveAWrongAnswer();
    expect(pauline.isInPenaltyBox()).toEqual(true);
    expect(pauline.getScore()).toEqual(0);
  });

  it("a player who is in the penalty box should stay in it if the dice roll leads to an even value", function () {
    const pauline = new Player("Pauline");
    const laurent = new Player("Laurent");
    const players = new PlayerSet([pauline, laurent]);
    new StartPlayer(board, players) //
      .roll(2)
      .giveAWrongAnswer()
      .roll(1)
      .giveTheCorrectAnswer()
      .roll(4);
    expect(pauline.isInPenaltyBox()).toEqual(true);
  });

  it("a player who is in the penalty box should get out of it if the dice roll leads to an odd value and move by the value of the dice roll starting from their's last known position", function () {
    const pauline = new Player("Pauline");
    const laurent = new Player("Laurent");
    const players = new PlayerSet([pauline, laurent]);
    new StartPlayer(board, players) //
      .roll(2)
      .giveAWrongAnswer()
      .roll(1)
      .giveTheCorrectAnswer()
      .roll(3);
    expect(pauline.isInPenaltyBox()).toEqual(false);
    expect(pauline.getLocation()).toEqual(5);
  });

  it("a player who is getting out of the penalty box and answers correctly should be given an additional point for their's answer", function () {
    const pauline = new Player("Pauline");
    const laurent = new Player("Laurent");
    const players = new PlayerSet([pauline, laurent]);
    new StartPlayer(board, players) //
      .roll(2)
      .giveAWrongAnswer()
      // @ts-ignore
      .roll(1)
      .giveTheCorrectAnswer()
      .roll(3)
      .giveTheCorrectAnswer();
    expect(pauline.getScore()).toEqual(1);
  });
});
