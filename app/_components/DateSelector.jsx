"use client";

import { isWithinInterval } from "date-fns";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";

const defaultClassNames = getDefaultClassNames();

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function DateSelector() {
  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;
  const range = { from: null, to: null };

  // SETTINGS
  const minBookingLength = 1;
  const maxBookingLength = 23;
  console.log(defaultClassNames);
  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        mode="range"
        numberOfMonths={2}
        captionLayout="dropdown"
        disabled={{ before: new Date() }}
        startMonth={new Date()}
        min={minBookingLength + 1}
        max={maxBookingLength}
        classNames={{
          /* ROOT & FIXED SIZE */
          root: "rdp-root bg-primary-950 shadow-lg p-5 rounded-lg w-full relative",
          months: "flex gap-8 justify-center items-start",
          // 3. Fixed size prevents the container from jumping when month rows change
          month:
            "bg-primary-900 p-4 rounded-lg flex-1 min-w-[300px] min-h-[380px] flex flex-col relative",

          /* 1. DECORATED NAVIGATION */
          month_caption: "flex justify-center h-12 mb-4 relative items-center",
          // Fix: pointer-events-none lets clicks "fall through" to the dropdowns below
          nav: "absolute top-0 left-0 right-0 flex justify-between w-full px-2 z-10 pointer-events-none",
          button_previous: `
            pointer-events-auto flex items-center justify-center 
            w-8 h-8 rounded-full bg-primary-800 text-primary-400 
            hover:bg-amber-500 hover:text-primary-950 
            hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] 
            transition-all duration-300 cursor-pointer
          `,
          button_next: `
            pointer-events-auto flex items-center justify-center 
            w-8 h-8 rounded-full bg-primary-800 text-primary-400 
            hover:bg-amber-500 hover:text-primary-950 
            hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] 
            transition-all duration-300 cursor-pointer
          `,
          chevron: "fill-current w-5 h-5",

          /* 2 & 4. CENTERED & WORKING DROPDOWNS */
          caption_label: "hidden",
          dropdowns: "flex gap-2 justify-center items-center relative z-20",
          dropdown_root: "flex items-center",
          dropdown:
            "bg-primary-800 text-white border border-gray-700 rounded px-2 py-1 text-xs cursor-pointer outline-none focus:border-amber-500 hover:bg-primary-700 transition-colors",

          /* WEEKDAYS & DAYS */
          month_grid: "mx-auto",
          weekday: "text-gray-400 font-medium text-sm pb-2",
          day: "text-gray-200 hover:bg-primary-800 transition-colors rounded",
          day_button: "w-10 h-10 flex items-center justify-center",

          /* SELECTED STATES */
          today: "border border-amber-500 text-white font-bold",
          selected: "bg-amber-500 text-white",
          range_start: "bg-amber-500 text-white rounded-l-md",
          range_middle: "bg-amber-500/30 text-white",
          range_end: "bg-amber-500 text-white rounded-r-md",
          disabled:
            "text-gray-600 opacity-20 cursor-not-allowed pointer-events-none",
        }}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-18">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
