export {};
const createAutomatedTournament = require("./createAutomatedTournament");

const teams = [
  { players: [{ name: "Henk" }, { name: "Walter" }], points: 0, id: "" },
  { players: [{ name: "Jonas" }, { name: "Heike" }], points: 0, id: "" },
  { players: [{ name: "Susanne" }, { name: "Albrecht" }], points: 0, id: "" },
  { players: [{ name: "Andrea" }, { name: "Mehrnaz" }], points: 0, id: "" },
];

let matches = [];

describe("a function that take a group of teams and create matches for them", () => {
  test(" should push 2 games in the match array, if given an array of length 4", () => {
    matches = createAutomatedTournament(teams);
    expect(matches).toHaveLength(2);
  });
});

describe("a function that take a group of teams and create matches for them", () => {
  test("should use every team once", () => {
    matches = createAutomatedTournament(teams);
    expect(matches).toEqual([
      [
        { players: [{ name: "Henk" }, { name: "Walter" }], points: 0, id: "" },
        { players: [{ name: "Jonas" }, { name: "Heike" }], points: 0, id: "" },
      ],
      [
        {
          players: [{ name: "Susanne" }, { name: "Albrecht" }],
          points: 0,
          id: "",
        },
        {
          players: [{ name: "Andrea" }, { name: "Mehrnaz" }],
          points: 0,
          id: "",
        },
      ],
    ]);
  });
});
