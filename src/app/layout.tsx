import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = { title: "probability/lab — A pólós fiók", description: "Interaktív valószínűségszámítási vizualizáló" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="hu"><body>{children}</body></html>; }
