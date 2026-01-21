"use client";

import SpinnerMini from "@/_starter/components/SpinnerMini";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState, useTransition } from "react";

// ... existing imports

function DeleteReservation({ bookingId, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    // 1. Remove setShowConfirm(false) from here.
    // This keeps the modal visible during the process.

    startTransition(async () => {
      // 2. Execute the delete action
      await onDelete(bookingId);

      // Note: We don't need to close the modal manually anymore.
      // When onDelete finishes, the parent list updates,
      // and this component is removed from the DOM.
    });
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      >
        <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
        <span className="mt-1">Delete</span>
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950/40 backdrop-blur-sm">
          <div className="bg-primary-900 border border-primary-800 p-8 shadow-2xl max-w-md w-[90%] md:w-full">
            <h2 className="text-2xl font-semibold text-accent-400 mb-4">
              Delete Reservation
            </h2>

            {/* 3. Conditional text: Change message while deleting */}
            <p className="text-primary-200 mb-8">
              {isPending
                ? "Deleting reservation..."
                : "Are you sure you want to delete this reservation? This action cannot be undone."}
            </p>

            <div className="flex justify-end gap-6 font-semibold">
              {/* Hide or disable cancel button while pending */}
              {!isPending && (
                <button
                  onClick={() => setShowConfirm(false)}
                  className="text-primary-300 hover:text-primary-50 transition-colors"
                >
                  Cancel
                </button>
              )}

              <button
                disabled={isPending}
                onClick={handleDelete}
                className="bg-accent-600 px-6 py-2 text-primary-900 hover:bg-accent-700 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center min-w-25"
              >
                {isPending ? <SpinnerMini /> : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteReservation;
