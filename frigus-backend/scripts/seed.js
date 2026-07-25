const mongoose = require("mongoose");
const Product = require("../models/Product");
const Process = require("../models/Process");
const ProcessStep = require("../models/ProcessStep");

mongoose.connect("mongodb://localhost:27017/frigus-database");

const seedData = async () => {
  try {
    // 1. Create Process Steps
    const mixingSteps = await ProcessStep.create([
      { param: "Meat Weight", value: 50, unit: "kg" },
      { param: "Fat Weight", value: 5, unit: "kg" },
      { param: "Salt", value: 100, unit: "g" },
    ]);

    const fermentationSteps = await ProcessStep.create([
      { param: "Temperature Start", value: 25, unit: "°C" },
      { param: "Temperature End", value: 18, unit: "°C" },
      { param: "Duration", value: 48, unit: "hours" },
    ]);

    const smokingSteps = await ProcessStep.create([
      { param: "Smoke Intensity", value: "High", unit: "Level" },
      { param: "Duration", value: 12, unit: "hours" },
    ]);

    // 2. Create Processes (Procedures)
    const mixingProcess = await Process.create({
      name: "Mixing",
      description: "Combining ingredients",
      steps: mixingSteps.map((s) => s._id),
    });

    const fermentationProcess = await Process.create({
      name: "Fermentation",
      description: "Aging process",
      steps: fermentationSteps.map((s) => s._id),
    });

    const smokingProcess = await Process.create({
      name: "Smoking",
      description: "Applying smoke flavor",
      steps: smokingSteps.map((s) => s._id),
    });

    // 3. Create Products and link processes
    await Product.create([
      {
        name: "Linguiça de Carne Suína Defumada",
        processes: [mixingProcess._id, smokingProcess._id],
      },
      {
        name: "Bacon em Pedaços",
        processes: [mixingProcess._id, smokingProcess._id],
      },
    ]);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
