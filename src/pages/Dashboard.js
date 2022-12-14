import React from "react";
import AllocationPanel from "../components/panels/AllocationPanel";
import BalanceDisplay from "../components/panels/BalanceDisplay";
import Deposit from "../components/panels/Deposit";
import PerformancePanel from "../components/panels/PerformancePanel";
import PositionsPanel from "../components/panels/PositionsPanel";
import Withdraw from "../components/panels/Withdraw";
import "./Dashboard.css";

const Dashboard = () => {
  return (
  <html>
  
  <div className="panels">
    <div id="row1">
    <div id="panel-allocation">
    <AllocationPanel />
    </div>
    <div id="panel-performance">
    <PerformancePanel />
    </div>
    </div>
    <div id="row2">
    <div id="panel-transfer-funds">
    <BalanceDisplay/>
    <Deposit />
    <Withdraw />
  </div>
    <div id="panel-positions">
    <PositionsPanel />
  </div>
  </div>
  </div>
  </html>
  )
};

export default Dashboard;