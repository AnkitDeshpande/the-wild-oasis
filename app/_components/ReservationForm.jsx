"use client";

import Image from "next/image";
import { useReservation } from "./ReservationContext";

function ReservationForm({ cabin, user }) {
  // Added user prop
  const { range } = useReservation();
  const { maxCapacity } = cabin;

  return (
    <div className="scale-[1.01]">
      {/* Reduced padding from px-16 to px-8 */}
      <div className="bg-primary-800 text-primary-300 px-8 py-2 flex justify-between items-center text-sm">
        <p>Logged in as</p>

        {user && (
          <div className="flex gap-2 items-center">
            <Image
              src={user.image}
              alt={user.name}
              width={24} // Required: matches h-6 (24px)
              height={24} // Required
              referrerPolicy="no-referrer"
              className="h-6 w-6 rounded-full" // Added w-6 to maintain aspect ratio
            />
            <p className="font-semibold">{user.name}</p>
          </div>
        )}
      </div>

      {/* Reduced horizontal padding (px-8) and text size (text-base) */}
      <form className="bg-primary-900 py-8 px-8 text-base flex gap-4 flex-col">
        <div className="space-y-1">
          <label htmlFor="numGuests" className="text-sm font-medium">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-4 py-2 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="observations" className="text-sm font-medium">
            Anything we should know?
          </label>
          <textarea
            name="observations"
            id="observations"
            rows={3} // Sets a clean height
            className="px-4 py-2 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm"
            placeholder="Pets, allergies, etc.?"
          />
        </div>

        <div className="flex justify-between items-center gap-4 pt-2">
          {!range?.from || !range?.to ? (
            <p className="text-primary-300 text-xs italic">
              Start by selecting dates
            </p>
          ) : (
            <div></div> // Placeholder to keep button on right
          )}

          <button
            className="bg-accent-500 px-6 py-3 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 text-sm"
            disabled={!range?.from || !range?.to}
          >
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
