# Gakumas Data Stage Effects

Effects of p-items, skill cards, and stages in gakumas-data are represented in a custom string format as described below.

## Format

A list of effects separated by `;` where each effect can specify a phase, conditions, and actions, separated by `,`.  
Effects can have multiple conditions and actions.

```
phase,condition,action;phase,condition,condition,action,action,action
```

### Example

ターン開始時、好調が4以上の場合、集中+4、好調+4 (ステージ中1回)  
アクティブスキルカード使用時、好印象の100%スコア上昇
```
at:startOfTurn,if:goodConditionTurns>=4,do:concentration+=4,do:goodConditionTurns+=4,limit:1;
at:activeCardUsed,do:score+=goodImpressionTurns
```

## Phase

The phase of an effect indicates when it will be activated, marked with `at:`

### Example
ターン開始時
```
at:startOfTurn
```

| Phase | Representation |
|------------|-------------|
| ステージ開始時 | startOfStage |
| ターン開始時 | startOfTurn |
| スキルカード使用時 | cardUsed |
| アクティブスキルカード使用時 | activeCardUsed |
| メンタルスキルカード使用時 | mentalCardUsed |
| スキルカード使用後 | afterCardUsed |
| アクティブスキルカード使用後 | afterActiveCardUsed |
| メンタルスキルカード使用後 | afterMentalCardUsed |
| ターン終了時 | endOfTurn |
| 好印象の効果ターンが増加後 | goodImpressionTurnsIncreased |
| やる気が増加後 | motivationIncreased |
| 好調の効果ターンが増加後 | goodConditionTurnsIncreased |
| 集中が増加後 | concentrationIncreased |

## Condition

Conditions that must be met for the effect to activate, marked with `if:`

### Example

好印象が4以上の場合
```
if:goodImpressionTurns>=4
```

## Action

State changes to execute, marked with `do:`

### Example

好印象の200%分スコア上昇
```
do:score+=goodImpression*2
```

## Limit

Maximum number of times to activate an effect, marked by `limit:`

### Example

ステージ中2回
```
limit:2
```

## State variables

| Variable | Representation |
| --- | --- | 
| 経過ターン数 | turnsElapsed |
| 残りターン数 | turnsRemaining |
| スキルカード使用回数 | cardUsesRemaining |
| 最大体力 | maxStamina |
| 体力 | stamina |
| 固定元気 | fixedGenki |
| 元気 | genki |
| 体力 (元気適用) | cost |
| スコア | score |
| 使用済みカード数 | cardsUsed |
| 好調 | goodConditionTurns |
| 絶好調 | perfectConditionTurns |
| 集中 | concentration |
| 好印象 | goodImpressionTurns |
| やる気 | motivation |
| スコア上昇量増加 (1ターン) | oneTurnScoreBuff |
| スコア上昇量増加  | permanentScoreBuff |
| 消費体力減少 | halfCostTurns |
| 消費体力増加 | doubleCostTurns |
| 消費体力削減 | costReduction |
| スキルカード追加発動 | doubleCardEffectCards |
| 元気無効 | nullifyGenkiTurns |
| 使用スキルカード強化前ID | usedCardId |
| 使用スキルカード効果 | cardEffects |
| 集中適用倍数 | concentrationMultiplier |

