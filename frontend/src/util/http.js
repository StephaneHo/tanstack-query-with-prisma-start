import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchEquipments({ signal, searchTerm }) {
  let url = "http://localhost:3000/equipments";
  if (searchTerm) {
    url += "?search=" + searchTerm;
  }
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the equipments");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();
  console.log(res);
  return res;
}

export async function createNewEquipment(equipmentData) {
  const response = await fetch(`http://localhost:3000/equipments/new`, {
    method: "POST",
    body: JSON.stringify(equipmentData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while creating the equipment");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const equipment = await response.json();

  return equipment;
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch(`http://localhost:3000/equipments/images`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the images");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const images = await response.json();

  return images;
}

export async function fetchEquipment({ id, signal }) {
  const response = await fetch(`http://localhost:3000/equipment/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the equipment");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const equipment = await response.json();

  return equipment;
}

export async function deleteEquipment({ id }) {
  const response = await fetch(`http://localhost:3000/equipment/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting the equipment");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export async function updateEquipment({ id, equipment }) {
  const response = await fetch(`http://localhost:3000/equipment/${id}`, {
    method: "PUT",
    body: JSON.stringify({ equipment }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while updating the equipment");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
