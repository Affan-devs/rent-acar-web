import { groq } from "next-sanity";

export const allProducts = groq`*[_type == "product"]`;
export const fourProducts = groq`*[_type == "product"] | order(_createdAt desc) [0...4]`;