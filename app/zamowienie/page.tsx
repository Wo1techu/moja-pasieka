import type { Metadata } from "next";
import { Checkout } from "@/components/checkout/Checkout";

export const metadata: Metadata = {
  title: "Zamówienie",
  description: "Złóż zamówienie na miód z pasieki MELLIS — dostawa, dane i płatność.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return <Checkout />;
}
