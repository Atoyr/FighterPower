import { atom } from 'recoil';

import { InputSingleTextDialogProps } from '@/components/InputDialog';

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
})

