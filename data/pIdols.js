import P_IDOLS from "../json/p_idols.json" with { mode: "json" };
import ICONS from "../images/pIdols/imports";

P_IDOLS.forEach((pIdol) => {
  pIdol.id = parseInt(pIdol.id, 10);
  pIdol.idolId = parseInt(pIdol.idolId, 10);
  pIdol.icon = ICONS[pIdol.id];
});

const P_IDOLS_BY_ID = P_IDOLS.reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {});

class Idols {
  static getAll() {
    return P_IDOLS;
  }

  static getById(id) {
    return P_IDOLS_BY_ID[id];
  }

  static getFiltered({ idolIds, rarities, plans, recommendedEffects }) {
    return P_IDOLS.filter((pIdol) => {
      if (idolIds && !idolIds.includes(pIdol.idolId)) return false;
      if (rarities && !rarities.includes(pIdol.rarity)) return false;
      if (plans && !plans.includes(pIdol.plan)) return false;
      if (recommendedEffects && !recommendedEffects.includes(pIdol.recommendedEffect)) return false;
      return true;
    });
  }
}

export default Idols;
