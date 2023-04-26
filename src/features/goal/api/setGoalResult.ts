export const setGoalResult: (userId: string, goalSheetId: string, goalResult: GoalResult, transaction?: Transaction) => Promise<Result<string, Error>>
  = async (userId, goalSheetId, goalResult, transaction?) => {
  let result = await getGoalResult( userId, goalSheetId, goalResult.id ?? "", transaction);
  let newGoalResultRef;
  if (result.isFailure()) {
    return new Failure(result.value);
  } else if (result.value != null) {
    newGoalResultRef = doc(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/results`, goalResult.id as string);
  } else {
    newGoalResultRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/results`));
    goalResult.id = newGoalResultRef.id;
  }
  goalResult.version = goalResult.version + 1;
  await (transaction ? transaction.set( newGoalResultRef.withConverter(GoalResultConverter), goalResult) : setDoc(newGoalResultRef.withConverter(GoalResultConverter), goalResult));
  if (result.value == null) {
    await inccermentGoalSheetGoalResultCount(userId, goalSheetId);
  }
  await updateGoalSheetModifiedAt(userId, goalSheetId);
  return new Success(goalResult.id as string);
};

