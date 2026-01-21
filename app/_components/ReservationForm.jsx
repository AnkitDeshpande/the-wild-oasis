"use client";

import { differenceInDays } from "date-fns";
import Image from "next/image";
import { createBooking } from "../_lib/actions";
import { useReservation } from "./ReservationContext";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  // Added user prop
  const { range, resetRange } = useReservation();
  const { id, maxCapacity, regularPrice, discount } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate) + 1;
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  // Bind the data to the action
  // The first argument is 'this' (null), the second is our data object
  const createBookingWithData = createBooking.bind(null, bookingData);

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
      <form
        action={async (formData) => {
          await createBookingWithData(formData); // Wait for the server to finish
          resetRange(); // Then clear the calendar
        }}
        className="bg-primary-900 py-8 px-8 text-base flex gap-4 flex-col"
      >
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

        <div className="flex justify-end items-center gap-4 pt-2">
          {!range?.from || !range?.to ? (
            <p className="text-primary-300 text-xs italic">
              Start by selecting dates
            </p>
          ) : (
            <div>
              <SubmitButton pendingLabel="Reserving....">
                Reserve Now.
              </SubmitButton>
            </div> // Placeholder to keep button on right
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
