import * as React from 'react';
import AppBar from './AppBar';
import StickyFooter from './StickyFooter';
import { useLocation } from "react-router-dom";

const AppWindow = () => {
  const location = useLocation();
  const showDtilList : string[] = [];

  showDtilList.push("/");
  showDtilList.push("/index");
  showDtilList.push("/terms");

  const dtil = showDtilList.some((element) => element == location.pathname);
  console.log(location.pathname, dtil);

  return (
    <StickyFooter dtil={dtil}>
      <AppBar />
    </StickyFooter>
  );
}

export default AppWindow;
