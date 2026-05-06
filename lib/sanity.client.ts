import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── Queries ────────────────────────────────────────────────────────────────

export async function getFeaturedProducts() {
  return client.fetch(
    `*[_type == "product" && featured == true && inStock == true] | order(_createdAt desc)[0...6] {
      _id, name, price, originalPrice, badge, description,
      image, "slug": slug.current,
      "category": category->name
    }`
  );
}

export async function getAllProducts() {
  return client.fetch(
    `*[_type == "product" && inStock == true] | order(_createdAt desc) {
      _id, name, price, originalPrice, badge, description,
      image, "slug": slug.current,
      "category": category->name
    }`
  );
}

export async function getProductBySlug(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id, name, price, originalPrice, badge, description,
      image, whatsappMessage,
      "category": category->name
    }`,
    { slug }
  );
}