import { useParams } from 'react-router-dom';


export const KeyResult = () => {
  const { objectiveId } = useParams<"objectiveId">();
  const { keyResultId } = useParams<"keyResultId">();

  return (
    <>
      <h2>{objectiveId}</h2>
      <h2>{keyResultId}</h2>
    </>
  );
};

