export function serializeEffect(effect) {
  const exp = [];
  if (effect.phase) exp.push(`at:${effect.phase}`);
  if (effect.conditions) {
    effect.conditions.forEach((condition) => {
      exp.push(`if:${condition}`);
    });
  }
  if (effect.actions) {
    effect.actions.forEach((action) => {
      exp.push(`do:${action}`);
    });
  }
  if (effect.group) {
    exp.push(`group:${effect.group}`);
  }
  if (effect.limit) {
    exp.push(`limit:${effect.limit}`);
  }
  if (effect.ttl) {
    exp.push(`ttl:${effect.ttl}`);
  }
  return exp.join(",");
}

export function deserializeEffect(effectString) {
  if (!effectString.length) return {};
  return effectString.split(/,(?![^()]*\))/).reduce((acc, cur) => {
    const [expKey, expValue] = cur.split(":");
    if (expKey == "at") {
      acc.phase = expValue;
    } else if (expKey == "if") {
      if (!acc.conditions) acc.conditions = [];
      acc.conditions.push(expValue);
    } else if (expKey == "do") {
      if (!acc.actions) acc.actions = [];
      acc.actions.push(expValue);
    } else if (expKey == "group") {
      acc.group = parseInt(expValue, 10);
    } else if (expKey == "limit") {
      acc.limit = parseInt(expValue, 10);
    } else if (expKey == "ttl") {
      acc.ttl = parseInt(expValue, 10);
    } else {
      console.warn("Unrecognized effect segment", effectString);
    }
    return acc;
  }, {});
}

export function serializeEffectSequence(effectSequence) {
  return effectSequence.map(serializeEffect).join(";");
}

export function deserializeEffectSequence(effectSequenceString) {
  return effectSequenceString?.length
    ? effectSequenceString.split(";").map(deserializeEffect)
    : [];
}
