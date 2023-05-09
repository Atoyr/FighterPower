import { Route, Routes } from 'react-router-dom';

import { NotFound } from '@/features/misc';

import { Archive, NewArchive } from './Archive';
import { KeyResult } from './KeyResult';
import { Objective } from './Objective';
import { Objectives } from './Objectives';

export const ObjectiveRoutes = () => {
  return ( 
    <Routes>
      <Route path="" element={<Objectives />} />
      <Route path=":objectiveId" element={<Objective />} />
      <Route path=":objectiveId/key-results/:keyResultId" element={<KeyResult />} />
      <Route path=":objectiveId/archives/new" element={<NewArchive />} />
      <Route path=":objectiveId/archives/:archiveId" element={<Archive />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
