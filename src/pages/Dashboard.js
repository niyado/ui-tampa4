import React from "react";
import AllocationPanel from "../components/panels/AllocationPanel";
import PerformancePanel from "../components/panels/PerformancePanel";

const Dashboard = () => {
  return <div className="Dashboard">
    <AllocationPanel />
    <PerformancePanel />
  </div>;
};

export default Dashboard;