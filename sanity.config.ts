import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { productSchema } from "./sanity/schemas/product";
import { categorySchema } from "./sanity/schemas/category";

export default defineConfig({
  name: "dave-tech-hub",
  title: "Dave Tech Hub — Admin Portal",

  // ✅ Replace these with your actual Sanity project values
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: [productSchema, categorySchema],
  },

  basePath: "/admin",
});