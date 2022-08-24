import React from "react";
import AllocationPanel from "../components/panels/AllocationPanel";
import PerformancePanel from "../components/panels/PerformancePanel";
import PositionsPanel from "../components/panels/PositionsPanel";

const Dashboard = () => {
  return <div className="panels">
    <div className="panel-allocation">
    <AllocationPanel />
    </div>
    <div className="panel-performance">
    <PerformancePanel />
    </div>
    <div className="panel-positions">
    {/* add panel here */}
  </div>
  </div>;
};

export default Dashboard;