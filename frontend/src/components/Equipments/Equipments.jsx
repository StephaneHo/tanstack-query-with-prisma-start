import { Link, Outlet } from "react-router-dom";

import Header from "../Header.jsx";

import { EquipmentsIntroSection } from "./EquipmentsIntroSection";
import { SearchEquipementsSection } from "./SearchEquipmentsSection.jsx";

export const Equipments = () => {
  return (
    <div className="mx-20">
      <Outlet />

      <Header>
        <div className="flex justify-between  mx-60">
          <Link to="/equipments/new" className="button">
            Nouvel Equipement
          </Link>
        </div>
      </Header>
      <main>
        <EquipmentsIntroSection />
        <SearchEquipementsSection />
      </main>
    </div>
  );
};
