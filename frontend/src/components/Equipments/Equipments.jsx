import { Link, Outlet } from "react-router-dom";

import Header from "../Header.jsx";
import EventsIntroSection from "./EquipmentsIntroSection.jsx";
import FindEventSection from "./FindEquipmentSection.jsx";
import NewEventsSection from "./NewEquipmentsSection.jsx";

export default function Events() {
  return (
    <div className="mx-20">
      <Outlet />
      <Header>
        <Link to="/equipments/new" className="button">
          New Equipment
        </Link>
      </Header>
      <main>
        <EventsIntroSection />
        <NewEventsSection />
        <FindEventSection />
      </main>
    </div>
  );
}
