import * as fs from "fs";
import { Game } from ".";
import { Player } from "./player/Player";

const ROOT_PATH = "./src/logs";

function generateFilePaths(testIndex: number) {
  return {
    master: `${ROOT_PATH}/master_${testIndex}.txt`,
    actual: `${ROOT_PATH}/actual_${testIndex}.txt`,
  };
}

function redirectLogsToFile(path: string): void {
  console.log = function (text: string): void {
    fs.appendFileSync(
      path,
      `${text}
`
    );
  };
}

function eraseFile(path: string): void {
  fs.writeFileSync(path, "");
}

function runGoldenMaster(testIndex: number, scenario: () => void): void {
  const { master, actual } = generateFilePaths(testIndex);

  function createMaster(): void {
    redirectLogsToFile(master);
    scenario();
  }

  function compareActualToMaster(): void {
    eraseFile(actual);
    redirectLogsToFile(actual);
    scenario();
    expect(fs.readFileSync(actual)).toEqual(fs.readFileSync(master));
  }

  if (!fs.existsSync(master)) {
    createMaster();
  } else {
    compareActualToMaster();
  }
}

it("Scenario #0: a 3-players game where all users answer correctly", function () {
  runGoldenMaster(0, function () {
    const game = new Game([new Player("Chloe"), new Player("Omar"), new Player("Sebastian")]);
    game.roll(3); // Chloe
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(1); // Omar
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(4); // Sebastian
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(3); // Chloe
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(1); // Omar
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(4); // Sebastian
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(3); // Chloe
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(1); // Omar
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(4); // Sebastian
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(3); // Chloe
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(1); // Omar
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(4); // Sebastian
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(3); // Chloe
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(1); // Omar
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(4); // Sebastian
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(3); // Chloe
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(1); // Omar
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(4); // Sebastian
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(3); // Chloe
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(1); // Omar
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(4); // Sebastian
    console.log(game.currentPlayerGivesTheCorrectAnswer());
  });
});

it("Scenario #1: a 2-players game with some wrong answers, hence penalty box", function () {
  runGoldenMaster(1, function () {
    const game = new Game([new Player("Chloe"), new Player("Omar")]);
    game.roll(3); // Chloe
    console.log(game.currentPlayerGivesTheCorrectAnswer()); // Location: 3; Score: 1
    game.roll(2); // Omar
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(3); // Chloe
    console.log(game.currentPlayerGivesAWrongAnswer()); // Location: 6; Score: 1; in penalty box
    game.roll(2); // Omar
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(2); // Chloe
    // The next line is necessary, even if no question is asked, because it allows to move to the next player (!)
    console.log(game.currentPlayerGivesTheCorrectAnswer()); // Location: 6; Score: 1; in penalty box
    game.roll(2); // Omar
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(5); // Chloe
    console.log(game.currentPlayerGivesAWrongAnswer()); // Location: 11; Score: 1; in penalty box
    game.roll(2); // Omar
    console.log(game.currentPlayerGivesTheCorrectAnswer());
    game.roll(5); // Chloe
    console.log(game.currentPlayerGivesTheCorrectAnswer()); // Location: 11 + 5 => 4; Score: 2; in penalty box
    game.roll(2); // Omar
    console.log(game.currentPlayerGivesTheCorrectAnswer());
  });
});

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
