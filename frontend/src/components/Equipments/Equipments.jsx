import { Link, Outlet } from "react-router-dom";

import Header from "../Header.jsx";
import EventsIntroSection from "./EquipmentsIntroSection.jsx";
import FindEventSection from "./FindEquipmentSection.jsx";
import NewEventsSection from "./NewEquipmentsSection.jsx";

export default function Events() {
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events/new" className="button">
          New Event
        </Link>
      </Header>
      <main>
        <EventsIntroSection />
        <NewEventsSection />
        <FindEventSection />
      </main>
    </>
  );
}
