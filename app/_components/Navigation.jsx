import Image from "next/image";
import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const googleSession = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {googleSession?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <Image
                src={googleSession.user.image}
                alt="user profile image"
                width={32} // Add this (matches your h-8 class which is 32px)
                height={32} // Add this
                className="h-8 w-8 rounded-full" // Ensure width is also set in CSS
                referrerPolicy="no-referrer" // Recommended for Google images
              />
              <span> Profile </span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
