import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import TextExpander from "./TextExpander";

const Cabin = ({ cabin }) => {
  const { name, maxCapacity, image, description } = cabin;
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-12 md:gap-20 border border-primary-800 py-6 px-6 md:px-10 mb-24">
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <div className="relative h-full md:scale-[1.15] md:-translate-x-3">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
            src={image}
            alt={`Cabin ${name}`}
            loading="eager"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div>
        <div className="overflow-hidden">
          <h3 className="text-accent-100 font-black text-5xl md:text-7xl mb-5 bg-primary-950 p-6 pb-1 md:w-[150%]">
            Cabin {name}
          </h3>
        </div>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>

          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Himalayas</span> (India)
            </span>
          </li>

          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cabin;
