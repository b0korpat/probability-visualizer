import type { Metadata } from "next";
import { MasterGuide } from "@/components/visualizer/MasterGuide";

export const metadata: Metadata = {
  title: "NAGY ZH1 — probability/lab",
  description: "Valószínűségszámítás az alapoktól: 16 feladat, 96 magyarázó lépés, minden szám eredete és a megoldással együtt épülő ábrák.",
};

export default function MasterPage() { return <MasterGuide />; }
