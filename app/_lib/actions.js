"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";

export const updateProfile = async (formData) => {
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const idRegex = /^[a-zA-Z0-9]{6,12}$/;

  // Validate the National ID
  if (!idRegex.test(nationalID)) {
    throw new Error(
      "Please provide a valid National ID (6-12 alphanumeric characters).",
    );
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
};

export const deleteReservation = async (bookingId) => {
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  if (!bookingId) throw new Error("No booking ID provided");

  const guestBookings = await getBookings(session.user.guestId);
  const ids = guestBookings.map((booking) => booking.id);

  if (!ids.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
};

export const updateBooking = async (formData) => {
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  const bookingId = Number(formData.get("bookingId"));

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
};

// 1. bookingData comes from .bind()
// 2. formData comes from the <form> inputs
export const createBooking = async (bookingData, formData) => {
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  const newBooking = {
    // These come from the bound object (bookingData)
    startDate: bookingData.startDate,
    endDate: bookingData.endDate,
    numNights: bookingData.numNights,
    cabinPrice: bookingData.cabinPrice,
    cabinId: bookingData.cabinId,
    totalPrice: bookingData.cabinPrice,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000) || "",
    extrasPrice: 0,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
};

export const signInAction = async () => {
  await signIn("google", { redirectTo: "/account" });
};

export const signOutAction = async () => {
  await signOut({ redirectTo: "/" });
};
