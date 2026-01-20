"use client";

import { createContext, useContext, useState } from "react";

const initialState = { from: undefined, to: undefined };
const ReservationContext = createContext();

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");

  return context;
}

export { ReservationProvider, useReservation };
