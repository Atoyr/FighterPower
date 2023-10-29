import { Route, Routes } from 'react-router-dom';

import { NotFound } from '@/features/misc';

import { Achive, NewAchive } from './Achive';
import { KeyResult } from './KeyResult';
import { Objective } from './Objective';
import { Objectives } from './Objectives';

export const ObjectiveRoutes = () => {
  return ( 
    <Routes>
      <Route path="" element={<Objectives />} />
      <Route path=":objectiveId" element={<Objective />} />
      <Route path=":objectiveId/key-results/:keyResultId" element={<KeyResult />} />
      <Route path=":objectiveId/achives/new" element={<NewAchive />} />
      <Route path=":objectiveId/achives/:achiveId" element={<Achive />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
