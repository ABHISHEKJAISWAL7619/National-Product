import React from "react";
import Stock from "./Home/Stock";
import Summary from "./Home/Summary";
import Production from "./Home/Production";
import MonthlyStock from "./Home/MonthlyStock";
import RecentStockIn from "./Home/RecentStockIn";
import Dispatch from "./Home/Dispatch";

const Homepage = () => {
  return (
    <div>
      <Stock />
      <Summary />
      <Production />
      <MonthlyStock />
      <RecentStockIn />
      <Dispatch />
    </div>
  );
};

export default Homepage;
