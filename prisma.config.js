import { defineConfig } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  migrate: {
    datasourceUrl: process.env.DATABASE_URL,
  },
});
