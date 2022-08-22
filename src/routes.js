import DashboardIcon from "./assets/DashboardIcon.png";
import DashboardIconActive from "./assets/DashboardIconActive.png";
import TradeIcon from "./assets/TradeIcon.png";
import TradeIconActive from "./assets/TradeIconActive.png";
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