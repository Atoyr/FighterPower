import { Rank, RankValue, RankValues } from '../types';

export function getRank(rankValue: RankValue): Rank {
  return Object.keys(RankValues).find(key => RankValues[key] === rankValue) || "";
}
