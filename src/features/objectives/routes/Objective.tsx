import { useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';

import { InputSingleTextDialog } from '@/components/INputDialog'

import { InputTitleDialogState } from '../stores';

const EDIT_OBJECTIVE_TITLE = "edit_objective_title";
const ADD_KEY_RESULT = "add_key_result";
const EDIT_KEY_RESULT = "edit_key_result";

export const Objective = () => {
  const { objectiveId } = useParams<"objectiveId">();

  const [ titleDialogState, setTitleDialogState ] = useRecoilState(InputTitleDialogState);
  const resetTitleDialogState = useResetRecoilState(InputTitleDialogState);

  const onClose = async (value:string, isCancel: boolean) => {
    if (!isCancel)
    {
      // validate
      if ( value == "" ) {
        setTitleDialogProps(
          {
            type: titleDialogProps.type,
            index: titleDialogProps.index,
            props: {
              ...titleDialogProps.props,
              error: true,
              message: "空白です",
            }});
        return;
      }

      const index = titleDialogProps.index;
      setTitleDialogProps({type: "", index: 0, props: newInputTitleDialogProps()});

      switch(titleDialogState.type) {
        case ADD_KEY_RESULT :
          break;
        case EDIT_KEY_RESULT :
          break;
        case EDIT_OBJECTIVE_TITLE :
          break;
      }
    }
    resetTitleDialogState
  };

  const editObjectiveTitle = () => {
    const dialogTitle = "目標名";
    // TODO
    const defaultValue = "";
    const props = titleDialogState.Props;
    setTitleDialogProps(
      {
        type: EDIT_OBJECTIVE_TITLE, 
        index: 0, 
        props: {
          ...props,
          title: dialogTitle,
          defaultValue: defaultValue,
          open: true,
        }
      });
  }


  return (
    <>
      <h1>{objectiveId}</h1>
    </>
  );
}
