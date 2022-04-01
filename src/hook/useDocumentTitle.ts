import React, { useEffect} from "react";

export const useDocumentTitle = (title: string) => {
  let mode: string = (import.meta.env.MODE ?? "") as string;
  mode = mode == "prod" ? "" : mode;

   useEffect(() => {
     document.title = `FighterPower${mode} ${title}`;
   }, [title]);
}
