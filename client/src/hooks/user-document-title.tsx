// Type: Custom Hook
// @Desc: Custom hook to set document title

import { useEffect } from "react";

export const useSetDocumentTitle = (title: string) => {
   useEffect(() => {
        document.title = `${title} | Worktec`;
   }, [title]);
};