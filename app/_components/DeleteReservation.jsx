"use client";

import { useState, useTransition } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservation } from "../_lib/actions";

function DeleteReservation({ bookingId }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => {
      deleteReservation(bookingId);
      // The modal will close automatically because the
      // parent list will re-render without this card
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

      {/* DECORATED MODAL OVERLAY */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950/40 backdrop-blur-sm">
          <div className="bg-primary-900 border border-primary-800 p-8 shadow-2xl max-w-md w-[90%] md:w-full">
            <h2 className="text-2xl font-semibold text-accent-400 mb-4">
              Delete Reservation
            </h2>
            <p className="text-primary-200 mb-8">
              Are you sure you want to delete this reservation? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-6 font-semibold">
              <button
                disabled={isPending}
                onClick={() => setShowConfirm(false)}
                className="text-primary-300 hover:text-primary-50 transition-colors disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                disabled={isPending}
                onClick={handleDelete}
                className="bg-accent-600 px-6 py-2 text-primary-900 hover:bg-accent-700 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteReservation;
