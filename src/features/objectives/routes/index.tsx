import { Route, Routes } from 'react-router-dom';

import { Objective } from './Objective';
import { Objectives } from './Objectives';

export const ObjectiveRoutes = () => {
  return ( 
    <Routes>
      <Route path="" element={<Objectives />} />
      <Route path=":objectiveId" element={<Objective />} />
    </Routes>
  );
};
