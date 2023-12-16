import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Events from "./components/Equipments/Equipments.jsx";
import EventDetails from "./components/Equipments/EquipmentDetails.jsx";
import NewEvent from "./components/Equipments/NewEquipment.jsx";
import EditEvent from "./components/Equipments/EditEquipment.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        element: <NewEvent />,
      },
    ],
  },
  {
    path: "/equipments/:id",
    element: <EventDetails />,
    children: [
      {
        path: "/equipments/:id/edit",
        element: <EditEvent />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
