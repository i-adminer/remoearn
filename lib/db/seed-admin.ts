import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { resolve } from "path";
import { getDb } from "../mongodb";
import { Collections, Admin } from "./mongodb-schema";

// Load .env.local first, then .env
config({ path: resolve(process.cwd(), ".env.local") });
config();

export async function seedAdmin() {
  const db = await getDb();
  const adminsCollection = db.collection<Admin>(Collections.ADMIN);

  const email = process.env.ADMIN_EMAIL || "admin@remoearn.com";
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || "changeme123";

  // Check if admin already exists
  const existingAdmin = await adminsCollection.findOne({ email });

  if (existingAdmin) {
    console.log("Admin already exists");
    return existingAdmin;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(initialPassword, 10);

  // Create admin
  const admin: Admin = {
    email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await adminsCollection.insertOne(admin);
  console.log("Admin created successfully:", result.insertedId);

  return { ...admin, _id: result.insertedId };
}

// Run seed if called directly
if (require.main === module) {
  seedAdmin()
    .then(() => {
      console.log("Seeding completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}
