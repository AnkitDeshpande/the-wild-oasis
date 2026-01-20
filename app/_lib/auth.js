import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    //
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // check if user exist and if true authorize the protected route
    authorized({ auth }) {
      return !!auth?.user;
    },

    //after sign in login
    async signIn({ user }) {
      try {
        // 1. Check if the guest already exists in your database
        const existingGuest = await getGuest(user.email);

        // 2. If the guest doesn't exist, create a new record
        if (!existingGuest) {
          await createGuest({
            email: user.email,
            fullName: user.name,
            nationalID: null,
            nationality: null,
            countryFlag: null,
          });
        }

        // 3. Return true to allow the sign-in to proceed
        return true;
      } catch (error) {
        console.error("Error during sign-in callback:", error);
        return false; // Return false to deny access if database operation fails
      }
    },

    async session({ session }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },

  pages: {
    // telling next.js that this is the login page and redirect the protected route here
    // dont use default logn page
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
