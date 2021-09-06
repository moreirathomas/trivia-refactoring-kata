import { Player, PlayerSet } from ".";
import { CircularBoard } from "../Board";

const board = new CircularBoard({ size: 12, questionPoolSize: 50 });

let pauline: Player;
let laurent: Player;
const players = new PlayerSet([pauline, laurent]);

describe("Test of the core game rules", function () {
  beforeEach(function () {
    pauline = new Player("Pauline");
    laurent = new Player("Laurent");
  });

  it("a player should start at location 0 with no point", function () {
    expect(pauline.isInPenaltyBox()).toEqual(false);
    expect(pauline.getLocation()).toEqual(0);
    expect(pauline.getScore()).toEqual(0);
  });

  it("a player should move by the value of the dice roll", function () {
    pauline.roll(board, 2);
    expect(pauline.getLocation()).toEqual(2);
  });

  it("a player who gives the correct answer should be given a point", function () {
    pauline.giveTheCorrectAnswer(players);
    expect(pauline.getScore()).toEqual(1);
  });

  it("a player who gives a wrong answer should be sent to penalty box with no additional point", function () {
    pauline.giveAWrongAnswer(players);
    expect(pauline.isInPenaltyBox()).toEqual(true);
    expect(pauline.getScore()).toEqual(0);
  });

  it("a player who is in the penalty box should stay in it if the dice roll leads to an even value", function () {
    pauline.giveAWrongAnswer(players);
    pauline.roll(board, 2);
    expect(pauline.isInPenaltyBox()).toEqual(true);
  });

  it("a player who is in the penalty box should get out of it if the dice roll leads to an odd value and move by the value of the dice roll starting from their's last known position", function () {
    pauline.giveAWrongAnswer(players);
    pauline.roll(board, 3);
    expect(pauline.isInPenaltyBox()).toEqual(false);
    expect(pauline.getLocation()).toEqual(3);
  });

  it("a player who is getting out of the penalty box and answers correctly should be given an additional point for their's answer", function () {
    pauline.giveAWrongAnswer(players);
    pauline.roll(board, 3);
    pauline.giveTheCorrectAnswer(players);
    expect(pauline.getScore()).toEqual(1);
  });
});
