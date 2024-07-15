import SKILL_CARDS from "../json/skill_cards.json" with { mode: "json" };
import ICONS from "../images/skillCards/imports";
import { getSkillCardContestPower } from "../utils/contestPower";
import { deserializeEffect, deserializeEffectSequence } from "../utils/effects";

SKILL_CARDS.forEach((skillCard, i) => {
  skillCard.id = parseInt(skillCard.id, 10);
  skillCard.unlockPlv = parseInt(skillCard.unlockPlv, 10);
  skillCard.upgraded = skillCard.upgraded == "TRUE";
  skillCard.conditions = deserializeEffect(skillCard.conditions).conditions || [];
  skillCard.cost = deserializeEffect(skillCard.cost).actions || [];
  skillCard.effects = deserializeEffectSequence(skillCard.effects);
  skillCard.limit = parseInt(skillCard.limit, 10) || null;
  skillCard.unique = skillCard.unique == "TRUE";
  skillCard.forceInitialHand = skillCard.forceInitialHand == "TRUE";
  skillCard.pIdolId = parseInt(skillCard.pIdolId, 10);
  skillCard.icon = ICONS[skillCard.id];
  skillCard.contestPower = getSkillCardContestPower(skillCard);
});

const SKILL_CARDS_BY_ID = SKILL_CARDS.reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {});

class SkillCards {
  static getAll() {
    return SKILL_CARDS;
  }

  static getById(id) {
    return SKILL_CARDS_BY_ID[id];
  }

  static getFiltered({
    rarities,
    types,
    plans,
    unlockPlvs,
    sourceTypes,
    pIdolIds,
  }) {
    return SKILL_CARDS.filter((skillCard) => {
      if (rarities && !rarities.includes(skillCard.rarity)) return false;
      if (types && !types.includes(skillCard.type)) return false;
      if (plans && !plans.includes(skillCard.plan)) return false;
      if (unlockPlvs && !unlockPlvs.includes(skillCard.unlockPlv)) return false;
      if (sourceTypes && !sourceTypes.includes(skillCard.sourceType))
        return false;
      if (pIdolIds && !pIdolIds.includes(skillCard.pIdolId)) return false;
      return true;
    });
  }
}

export default SkillCards;
