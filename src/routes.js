import DashboardIcon from "./assets/DashboardIcon.svg";
import DashboardIconActive from "./assets/DashboardIconActive.svg";
import TradeIcon from "./assets/TradeIcon.svg";
import TradeIconActive from "./assets/TradeIconActive.svg";
import Dashboard from "./pages/Dashboard";
import Trade from "./pages/Trade";

const routes = [
  {
    label: "Dashboard",
    path: "/",
    icon: DashboardIcon,
    activeIcon: DashboardIconActive,
    component: Dashboard,
  },
  {
    label: "Trade",
    path: "/trade",
    icon: TradeIcon,
    activeIcon: TradeIconActive,
    component: Trade,
  },
];

export default routes;