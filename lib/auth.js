import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

// One shared MongoClient (avoids opening a new connection on every hot reload)
const globalForMongo = globalThis;
const client = globalForMongo._fixmateMongoClient ?? new MongoClient(process.env.MONGODB_URI);
globalForMongo._fixmateMongoClient = client;
const db = client.db(process.env.DB_NAME || "fixmate");

const SIGNUP_ROLES = ["customer", "technician"];

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "customer", input: true },
      phone: { type: "string", required: false, input: true },
      area: { type: "string", required: false, input: true },
      bio: { type: "string", required: false, input: true },
    },
  },

  databaseHooks: {
    user: {
      create: {
        // Assignment rule: anything except customer/technician is saved as customer
        before: async (user) => ({
          data: {
            ...user,
            role: SIGNUP_ROLES.includes(user.role) ? user.role : "customer",
          },
        }),
      },
    },
  },

  hooks: {
    // Nobody can promote themselves through BetterAuth's own update endpoint
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/update-user" && ctx.body && "role" in ctx.body) {
        throw new APIError("BAD_REQUEST", { message: "Role cannot be changed here" });
      }
    }),
  },

  plugins: [
    jwt({
      jwt: {
        expirationTime: "1h",
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }),
      },
    }),
    nextCookies(), // keep this LAST
  ],

  trustedOrigins: [process.env.BETTER_AUTH_URL],
});