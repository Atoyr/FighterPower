import React, { useEffect} from "react";

export const useDocumentTitle = (title: string) => {
  const mode: string = (import.meta.env.MODE ?? "") as string;

   useEffect(() => {
     document.title = `FighterPower${mode} ${title}`;
   }, [title]);
}
