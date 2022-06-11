import React from "react";
import Home from "./Home";
import Details from "./Details";

const renderScreen = (screen, props) => {
  switch (screen.screenType) {
    case "home":
      return <Home {...props} />;
    case "details":
      return <Details {...props} />;
    default:
      return null;
  }
};

const Index = () => {
  const [screen, setScreen] = React.useState({
    screenType: "home",
    data: null,
  });
  return renderScreen(screen, { setScreen, data: screen.data });
};

export default Index;
