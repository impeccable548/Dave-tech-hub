"use client";

import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle, Star } from "lucide-react";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  description?: string;
  image: any;
  category?: string;
  whatsappMessage?: string;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const WHATSAPP_NUMBER = "2347070440191"; // international format

function buildWhatsAppURL(product: Product): string {
  const message =
    product.whatsappMessage ||
    `Hi Dave Tech Hub! I'm interested in *${product.name}* (₦${product.price.toLocaleString()}). Please provide more details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const imageUrl = product.image
    ? urlFor(product.image).width(600).height(600).fit("crop").url()
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "linear-gradient(145deg, rgba(212,175,55,0.06) 0%, rgba(10,10,10,0.95) 100%)",
        border: "1px solid rgba(212,175,55,0.25)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
      }}
    >
      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.2)",
        }}
      />

      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-20 px-2 py-1 rounded-md text-xs font-mono font-bold tracking-widest uppercase"
          style={{ background: "rgba(212,175,55,0.9)", color: "#000" }}>
          {product.badge}
        </div>
      )}

      {/* Discount */}
      {discount && (
        <div className="absolute top-3 right-3 z-20 px-2 py-1 rounded-md text-xs font-bold"
          style={{ background: "rgba(220,38,38,0.85)", color: "#fff" }}>
          -{discount}%
        </div>
      )}

      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-noir-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: "rgba(212,175,55,0.05)" }}>
            <ShoppingCart size={48} style={{ color: "rgba(212,175,55,0.3)" }} />
          </div>
        )}
        {/* Overlay shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, transparent 40%, rgba(212,175,55,0.08) 60%, transparent 80%)",
          }} />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {product.category && (
          <p className="text-xs tracking-widest uppercase font-mono"
            style={{ color: "rgba(212,175,55,0.6)" }}>
            {product.category}
          </p>
        )}

        <h3 className="font-display font-semibold text-base leading-snug text-white line-clamp-2">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-xs leading-relaxed line-clamp-2"
            style={{ color: "rgba(255,255,255,0.5)" }}>
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold font-display"
            style={{ color: "#D4AF37" }}>
            ₦{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm line-through"
              style={{ color: "rgba(255,255,255,0.3)" }}>
              ₦{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stars placeholder */}
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill="rgba(212,175,55,0.8)" style={{ color: "rgba(212,175,55,0.8)" }} />
          ))}
        </div>

        {/* CTA */}
        <a
          href={buildWhatsAppURL(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 mt-1"
          style={{
            background: "linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)",
            color: "#000",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 24px rgba(212,175,55,0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          <MessageCircle size={16} />
          Buy Now via WhatsApp
        </a>
      </div>
    </motion.div>
  );
}