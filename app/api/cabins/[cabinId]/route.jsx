import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(_request, { params }) {
  const { cabinId } = await params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json({ message: "Cabin or Booked Dates not found!" });
  }
}

// export async function POST() {}
