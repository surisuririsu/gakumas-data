import P_ITEMS from "../json/p_items.json" with { mode: "json" };
import ICONS from "../images/pItems/icons/imports";
import DETAILS from "../images/pItems/details/imports";
import { getPItemContestPower } from "../utils/contestPower";
import { deserializeEffectSequence } from "../utils/effects";

P_ITEMS.forEach((pItem) => {
  pItem.id = parseInt(pItem.id, 10);
  pItem.upgraded = pItem.upgraded == "TRUE";
  pItem.effects = deserializeEffectSequence(pItem.effects);
  pItem.pIdolId = parseInt(pItem.pIdolId, 10) || null;
  pItem.icon = ICONS[pItem.id];
  pItem.details = DETAILS[pItem.id];
  pItem.contestPower = getPItemContestPower(pItem);
});

const P_ITEMS_BY_ID = P_ITEMS.reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {});

class PItems {
  static getAll() {
    return P_ITEMS;
  }

  static getById(id) {
    return P_ITEMS_BY_ID[id];
  }

  static getFiltered({ rarities, plans, modes, sourceTypes, pIdolIds }) {
    return P_ITEMS.filter((pItem) => {
      if (rarities && !rarities.includes(pItem.rarity)) return false;
      if (plans && !plans.includes(pItem.plan)) return false;
      if (modes && !modes.includes(pItem.mode)) return false;
      if (sourceTypes && !sourceTypes.includes(pItem.sourceType)) return false;
      if (pIdolIds && !pIdolIds.includes(pItem.pIdolId)) return false;
      return true;
    });
  }
}

export default PItems;
