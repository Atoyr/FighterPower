import { atom } from 'recoil';

export type InputDialogErrorProps = {
  objectiveTitleErrorMessage?: string;
}

export const  InputDialogErrorState = atom<InputDialogErrorProps>({
  key: 'objectives__InputObjective__InputDialogError',
  default: {
  }, 
})

export const  InputDialogOpenState = atom<boolean>({
  key: 'objectives__InputObjective__InputDialogOpen',
  default: false, 
})

