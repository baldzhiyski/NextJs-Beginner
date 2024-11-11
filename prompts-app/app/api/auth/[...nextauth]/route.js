import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  // Configuring the Google authentication provider
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // Modify the session callback to include user ID in the session
    async session({ session }) {
      // Find the user in the database by email
      const sessionUser = await User.findOne({ email: session.user.email });

      // Add MongoDB user ID to the session object
      session.user.id = sessionUser._id.toString();

      return session;
    },

    // SignIn callback to manage user sign-in process
    async signIn({ account, profile, user, credentials }) {
      try {
        // Establish a connection to the database
        await connectToDB();

        // Check if the user already exists in the database
        const userExists = await User.findOne({ email: profile.email });

        // If user doesn't exist, create a new user in the database
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true; // Allow sign-in
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false; // Deny sign-in on error
      }
    },
  },
});

// Exporting handler for both GET and POST requests
export { handler as GET, handler as POST };
