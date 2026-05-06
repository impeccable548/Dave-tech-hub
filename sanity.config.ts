import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { productSchema } from "./sanity/schemas/product";
import { categorySchema } from "./sanity/schemas/category";

export default defineConfig({
  name: "dave-tech-hub",
  title: "Dave Tech Hub — Admin Portal",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [
    structureTool(),
  ],
  schema: {
    types: [productSchema, categorySchema],
  },
  basePath: "/admin",
});