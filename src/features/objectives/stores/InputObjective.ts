import { atom } from 'recoil';

export type InputDialogErrorProps = {
  objectiveTitleErrorMessage?: string;
  keyResultTitleErrorMessage?: string;
}

export const  InputDialogErrorState = atom<InputDialogErrorProps>({
  key: 'objectives__InputObjective__InputDialogError',
  default: {
  }, 
})

