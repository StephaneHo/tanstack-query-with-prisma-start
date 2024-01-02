import { Outlet } from "react-router-dom";

import Header from "../Header.jsx";

import { SearchEquipementsSection } from "./SearchEquipmentsSection.jsx";
import { EquipmentsCreateIntroSection } from "./EquipmentsIntroSection";

export const Equipments = () => {
  return (
    <div className="mx-20">
      <Outlet />

      <Header>
        <div className="flex justify-between mx-60"></div>
      </Header>
      <main>
        <EquipmentsCreateIntroSection />
        <SearchEquipementsSection />
      </main>
    </div>
  );
};
