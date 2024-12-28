import SKILL_CARDS from "../json/skill_cards.json";
import { getSkillCardContestPower } from "../utils/contestPower";
import { deserializeEffect, deserializeEffectSequence } from "../utils/effects";

SKILL_CARDS.forEach((skillCard) => {
  skillCard.availableCustomizations = skillCard.availableCustomizations
    .split(",")
    .filter((c) => c);
  skillCard.conditions =
    deserializeEffect(skillCard.conditions).conditions || [];
  skillCard.cost = deserializeEffect(skillCard.cost).actions || [];
  skillCard.effects = deserializeEffectSequence(skillCard.effects);
  skillCard.limit = skillCard.limit || null;
  skillCard.growth = deserializeEffectSequence(skillCard.growth);
  skillCard.pIdolId = skillCard.pIdolId || null;
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
