import { atom } from 'recoil';

import { InputSingleTextDialogProps } from '@/components/InputDialog';

import { Objective } from '../types';

type InputTitleDialogStateProps = {
  type: string;
  index: number;
  props: InputTitleDialogStateProps;
};

export const InputTitleDialogState = atom<InputTitleDialogStateProps>({
  key: 'objectives__Objective__InputTitleDialog',
  default: {
    type: "", 
    index: 0, 
    props: {
      title: "",
      label: "",
      open: false,
      error: false,
      defaultValue: "",
      message: "",
      onClose: () => {}
    }, 
  }, 
});

type ObjectiveStateType = {
  isLoading: boolean;
  value: Objective | null;
};

export const ObjectiveState = atom<ObjectiveStateType >({
  key: 'objectives__Objective',
  default: {
    isLoading: false,
    value: null, 
  }, 
});
