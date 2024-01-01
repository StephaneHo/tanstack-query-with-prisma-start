import { useState } from "react";

import ImagePicker from "../ImagePicker.jsx";
import { useQuery } from "@tanstack/react-query";
import ErrorBlock from "../UI/ErrorBlock";
import { fetchSelectableImages } from "../../util/http.js";

export default function EquipmentForm({ inputData, onSubmit, children }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);

  const { data, isPending, isError } = useQuery({
    queryKey: ["equipments-images"],
    queryFn: fetchSelectableImages,
  });

  function handleSelectImage(image) {
    console.log(image);
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("formData", formData);
    onSubmit({ ...data, image: selectedImage });
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-1 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <form id="event-form" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <p className="control">
                        <label
                          htmlFor="title"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          defaultValue={inputData?.name ?? ""}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                        />
                      </p>

                      {isPending && <p>Loading selectable images ...</p>}
                      {isError && (
                        <ErrorBlock
                          title="Failed to load selectable images"
                          message="Please try again"
                        />
                      )}
                      {data && (
                        <div className="control">
                          <ImagePicker
                            images={data}
                            onSelect={handleSelectImage}
                            selectedImage={selectedImage}
                          />
                        </div>
                      )}

                      <p className="control">
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          defaultValue={inputData?.description ?? ""}
                          rows="3"
                          className="block p-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </p>

                      <div className="controls-row">
                        <p className="control">
                          <label
                            htmlFor="ref"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Reference
                          </label>
                          <input
                            type="text"
                            id="ref"
                            name="ref"
                            defaultValue={inputData?.ref ?? ""}
                            className="block p-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </p>
                      </div>

                      <div className="controls-row">
                        <p className="control">
                          <label
                            htmlFor="height"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Hauteur
                          </label>
                          <input
                            type="text"
                            id="height"
                            name="height"
                            defaultValue={inputData?.height ?? ""}
                            className="block p-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </p>
                      </div>

                      <div className="controls-row">
                        <p className="control">
                          <label
                            htmlFor="weight"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Poids
                          </label>
                          <input
                            type="text"
                            id="weight"
                            name="weight"
                            defaultValue={inputData?.weight ?? ""}
                            className="block p-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </p>
                      </div>

                      <div className="controls-row">
                        <p className="control">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Prix
                          </label>
                          <input
                            type="text"
                            id="price"
                            name="price"
                            defaultValue={inputData?.price ?? ""}
                            className="block p-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </p>
                      </div>

                      <div className="flex items-center mb-4">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value={false}
                          name="isReservedPro"
                          className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ms-2 text-sm font-medium text-gray-900"
                        >
                          Tout public
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          checked
                          id="default-radio-2"
                          type="radio"
                          value={true}
                          name="isReservedPro"
                          className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ms-2 text-sm font-medium text-gray-900"
                        >
                          Reserve aux professionels
                        </label>
                      </div>

                      <p className="form-actions">{children}</p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
