import IDOLS from "../json/idols.json" with { mode: "json" };

IDOLS.forEach(async (idol) => {
  idol.id = parseInt(idol.id, 10);
  idol.icon = await import(`../images/idols/${idol.id}.png`);
});

const IDOLS_BY_ID = IDOLS.reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {});

class Idols {
  static getAll() {
    return IDOLS;
  }

  static getById(id) {
    return IDOLS_BY_ID[id];
  }
}

export default Idols;
