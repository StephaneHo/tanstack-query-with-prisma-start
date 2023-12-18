import { useState } from "react";

import ImagePicker from "../ImagePicker.jsx";
import { useQuery } from "@tanstack/react-query";
import ErrorBlock from "../UI/ErrorBlock";
import { fetchSelectableImages } from "../../util/http.js";

export default function EquipmentForm({ inputData, onSubmit, children }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);

  const { data, isPending, isError } = useQuery({
    queryKey: ["events-images"],
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

    onSubmit({ ...data, image: selectedImage });
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <form id="event-form" onSubmit={handleSubmit}>
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <p className="control">
                          <label htmlFor="title">Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={inputData?.name ?? ""}
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
                          <label htmlFor="description">Description</label>
                          <textarea
                            id="description"
                            name="description"
                            defaultValue={inputData?.description ?? ""}
                          />
                        </p>

                        <div className="controls-row">
                          <p className="control">
                            <label htmlFor="date">Reference</label>
                            <input
                              type="text"
                              id="ref"
                              name="ref"
                              defaultValue={inputData?.date ?? ""}
                            />
                          </p>
                        </div>

                        <p className="form-actions">{children}</p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Deactivate
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
