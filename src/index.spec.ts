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

it("players should take turn one after the other", function () {
  runGoldenMaster(0, function () {
    const game = new Game();
    game.add("Alice");
    game.add("Bob");
    game.add("Chad");
    game.add("Dan");

    game.roll(1);
    let output = game.wasCorrectlyAnswered();
    console.log(output);

    game.roll(2);
    output = game.wasCorrectlyAnswered();
    console.log(output);

    game.roll(5);
    output = game.wasCorrectlyAnswered();
    console.log(output);

    game.roll(4);
    output = game.wasCorrectlyAnswered();
    console.log(output);

    game.roll(2);
    output = game.wasCorrectlyAnswered();
    console.log(output); // Back to Alice
  });
});

it("a player should go in penalty box", function () {
  runGoldenMaster(1, function () {
    const game = new Game();
    game.add("Alice");
    game.add("Bob");

    game.roll(1);
    let output = game.wrongAnswer();
    console.log(output);

    game.roll(2);
    output = game.wasCorrectlyAnswered();
    console.log(output);

    game.roll(5);
    output = game.wasCorrectlyAnswered();
    console.log(output);
  });
});

it("a player should move out of penalty box if they rolled odd", function () {
  runGoldenMaster(2, function () {
    const game = new Game();
    game.add("Alice");
    game.add("Bob");

    game.roll(1);
    let output = game.wrongAnswer(); // Alice goes into penalty box
    console.log(output);

    game.roll(2);
    output = game.wasCorrectlyAnswered();
    console.log(output);

    game.roll(5); // Alice gets out of penalty box
    output = game.wasCorrectlyAnswered();
    console.log(output);

    game.roll(3);
    output = game.wasCorrectlyAnswered();
    console.log(output);

    game.roll(1); // Alice was not in penalty box
    output = game.wrongAnswer(); // Alice goes into penalty box
    console.log(output);
  });
});

it("a player should stay in of penalty box if they rolled even", function () {
  runGoldenMaster(3, function () {
    const game = new Game();
    game.add("Alice");
    game.add("Bob");

    game.roll(1);
    let output = game.wrongAnswer(); // Alice goes into penalty box
    console.log(output);

    game.roll(2);
    output = game.wasCorrectlyAnswered();
    console.log(output);

    game.roll(6); // Alice stays of penalty box
    output = game.wasCorrectlyAnswered();
    console.log(output);

    game.roll(3);
    output = game.wasCorrectlyAnswered();
    console.log(output);

    game.roll(1); // Alice is still in penalty box but gets out now
    output = game.wasCorrectlyAnswered();
    console.log(output);
  });
});

it("🐛 the game does not end when a player has 6 coins", function () {
  runGoldenMaster(4, function () {
    const game = new Game();
    game.add("Bob");

    for (let i = 0; i < 6; i++) {
      game.roll(2);
      let output = game.wasCorrectlyAnswered(); // Bob eventually has 6 coins
      console.log(output); // output is false for i = 6
    }

    // Game does not end, it should be an error
    game.roll(1);
    let output = game.wasCorrectlyAnswered();
    console.log(output);
  });
});

it("🐛 unhandled case for questions in a given category all exhausted", function () {
  runGoldenMaster(5, function () {
    const game = new Game();
    game.add("Alice");

    for (let i = 0; i < 50; i++) {
      game.roll(4); // Always land on the same category
      let output = game.wasCorrectlyAnswered();
      console.log(output);
    }

    // Game does not end, it should be an error
    expect(() => game.roll(4)).toThrowError();
  });
});
