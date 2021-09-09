import * as fs from "fs";
import { Game } from ".";

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

it("Scenario #0 - loop over players", function () {
  runGoldenMaster(0, function () {
    const game = new Game();
    game.add("Anna");
    game.add("Thomas");
    game.roll(3);
    game.wasCorrectlyAnswered();
    game.roll(2);
    game.wasCorrectlyAnswered();
    game.roll(1);
    game.wrongAnswer();
    game.roll(6);
    game.wrongAnswer();
  });
});

it("Scenario #1 - choose category", function () {
  runGoldenMaster(1, function () {
    const game = new Game();
    game.add("Chloe");
    game.add("Omar");
    game.add("Sebastian");
    game.add("Roger");
    game.roll(1);
    game.wasCorrectlyAnswered();
    game.roll(2);
    game.wasCorrectlyAnswered();
    game.roll(3);
    game.wasCorrectlyAnswered();
    game.roll(4);
    game.wasCorrectlyAnswered();
  });
});

it("Scenario #2 - wrong anwser", function () {
  runGoldenMaster(2, function () {
    const game = new Game();
    game.add("Bob");
    game.roll(1);
    game.wrongAnswer(); // Get in penalty box
    game.roll(2); // Even: do not get out
    game.wrongAnswer();
    game.roll(3); // Odd: get out
    game.wrongAnswer();
  });
});

it("Scenario #3 - correct anwser", function () {
  runGoldenMaster(3, function () {
    const game = new Game();
    game.add("Bob");
    game.roll(1);
    game.wasCorrectlyAnswered();
    game.roll(2);
    game.wasCorrectlyAnswered();
    game.roll(3);
    game.wasCorrectlyAnswered();
    game.roll(1);
    game.wasCorrectlyAnswered();
    game.roll(2);
    game.wasCorrectlyAnswered();
    game.roll(3);
    game.wasCorrectlyAnswered();
    // Game should stop here
    game.roll(6);
    game.wasCorrectlyAnswered();
  });
});
