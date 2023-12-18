import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Events from "./components/Equipments/Equipments.jsx";
import EquipmenttDetails from "./components/Equipments/EquipmentDetails.jsx";

import { QueryClientProvider } from "@tanstack/react-query";
import EditEquipment from "./components/Equipments/EditEquipment.jsx";
import NewEquipment from "./components/Equipments/NewEquipment.jsx";
import { queryClient } from "./util/http.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/equipments" />,
  },
  {
    path: "/equipments",
    element: <Events />,

    children: [
      {
        path: "/equipments/new",
        element: <NewEquipment />,
      },
    ],
  },
  {
    path: "/equipment/:id",
    element: <EquipmenttDetails />,
    children: [
      {
        path: "/equipment/:id/edit",
        element: <EditEquipment />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
