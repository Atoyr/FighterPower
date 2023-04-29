import { useParams } from 'react-router-dom';

export const Objective = () => {
  const { objectiveId } = useParams<"objectiveId">();

  return (
    <>
      <h1>{objectiveId}</h1>
    </>
  );
}


