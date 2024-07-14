import P_ITEMS from "../json/p_items.json" with { type: "json" };

function deserializeEffects(effectsString) {
  return effectsString.split("|").map((effectString) =>
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

P_ITEMS.forEach((pItem) => {
  pItem.id = parseInt(pItem.id, 10);
  pItem.upgraded = pItem.upgraded == "TRUE";
  pItem.effects = deserializeEffects(pItem.effects);
});

export default P_ITEMS;
