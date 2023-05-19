import { Rank, RankValue, RankValues } from '../types';

export function getRankValue(rank: Rank): RankValue {
  switch(rank) {
    case "D":
      return RankValues.D;
    case "C":
      return RankValues.C;
    case "B":
      return RankValues.B;
    case "A":
      return RankValues.A;
    case "S":
      return RankValues.S;
    default:
      return 3;
  }
}

