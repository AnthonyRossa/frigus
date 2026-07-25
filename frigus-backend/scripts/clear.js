const mongoose = require("mongoose");

async function clearDatabase() {
  try {
    // 1. Connect and WAIT for the connection
    await mongoose.connect("mongodb://localhost:27017/frigus-database");

    console.log("✅ Connected to MongoDB");

    // 2. Now it is safe to access the database object
    const db = mongoose.connection.db;
    const collections = ["processsteps", "processes", "products", "batches"];

    console.log("🗑️  Dropping collections...");

    for (const collectionName of collections) {
      // Check if collection exists
      const collectionsExist = await db
        .listCollections({ name: collectionName })
        .toArray();

      if (collectionsExist.length > 0) {
        await db.dropCollection(collectionName);
        console.log(`✅ Dropped: ${collectionName}`);
      } else {
        console.log(`⚪ Skipped (not found): ${collectionName}`);
      }
    }

    console.log("✅ Database cleared successfully!");

    // 3. Close connection
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    await mongoose.disconnect().catch(() => {}); // Try to disconnect even on error
    process.exit(1);
  }
}

clearDatabase();
