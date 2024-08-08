import STAGES from "../json/stages.json" with { mode: "json" };
import { deserializeEffectSequence } from "../utils/effects";

STAGES.forEach((stage) => {
  stage.id = parseInt(stage.id, 10);
  stage.season = parseInt(stage.season, 10);
  const [vo, da, vi] = stage.criteria.split(",").map((p) => parseFloat(p));
  stage.criteria = { vocal: vo, dance: da, visual: vi };
  const [voT, daT, viT] = stage.turnCounts
    .split(",")
    .map((p) => parseInt(p, 10));
  stage.turnCounts = { vocal: voT, dance: daT, visual: viT };
  stage.firstTurns = stage.firstTurns.split(",");
  stage.effects = deserializeEffectSequence(stage.effects);
});

const STAGES_BY_ID = STAGES.reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {});

class Stages {
  static getAll() {
    return STAGES;
  }

  static getById(id) {
    return STAGES_BY_ID[id];
  }
}

export default Stages;
