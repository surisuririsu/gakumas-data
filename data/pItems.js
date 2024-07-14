import P_ITEMS from "../json/p_items.json" with { mode: "json" };

function serializeEffects(effects) {
  return effects
    .map((effect) => {
      const exp = [];
      exp.push(`at:${effect.phase}`);
      effect.conditions.forEach((condition) => {
        exp.push(`if:${condition}`);
      });
      effect.actions.forEach((action) => {
        exp.push(`do:${action}`);
      });
      if (effect.limit) {
        exp.push(`limit:${effect.limit}`);
      }
      return exp.join(",");
    })
    .join(";");
}

function deserializeEffects(effectsString) {
  return effectsString.split(";").map((effectString) =>
    effectString.split(",").reduce((acc, cur) => {
      const [expKey, expValue] = cur.split(":");
      if (expKey == "at") {
        acc.phase = expValue;
      } else if (expKey == "if") {
        if (!acc.conditions) acc.conditions = [];
        acc.conditions.push(expValue);
      } else if (expKey == "do") {
        if (!acc.actions) acc.actions = [];
        acc.actions.push(expValue);
      } else if (expKey == "limit") {
        acc.limit = parseInt(expValue, 10);
      }
      return acc;
    }, {})
  );
}

P_ITEMS.forEach(async (pItem) => {
  pItem.id = parseInt(pItem.id, 10);
  pItem.upgraded = pItem.upgraded == "TRUE";
  pItem.effects = deserializeEffects(pItem.effects);
  pItem.icon = await import(`../images/pItems/${pItem.id}.png`);
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

  static getFiltered({ plans, rarities, modes, sourceTypes }) {
    return P_ITEMS.filter((pItem) => {
      if (plans && !plans.includes(pItem.plan)) return false;
      if (rarities && !rarities.includes(pItem.rarity)) return false;
      if (modes && !modes.includes(pItem.mode)) return false;
      if (sourceTypes && !sourceTypes.includes(pItem.sourceType)) return false;
      return true;
    });
  }
}

export default PItems;
