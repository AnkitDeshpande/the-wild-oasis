import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

const Reservation = async ({ cabin }) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const googleSession = await auth();

  return (
    <div className="grid grid-cols-[2fr_2fr] gap-8 border border-primary-800 p-8 rounded-lg">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {googleSession?.user ? (
        <ReservationForm cabin={cabin} user={googleSession.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
