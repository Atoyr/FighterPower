import { Objective } from './Objective';
import { KeyResult } from './KeyResult';
import { Archive } from './Archive';

export type ObjectiveKeyResults = {
  __type : 'objective_key_results';
  id? : string;
  version : number;
  objective: Objective;
  keyResults: Array<KeyResult>;
  Archives: Array<Archive>;
};
