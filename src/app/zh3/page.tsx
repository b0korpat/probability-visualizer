import type { Metadata } from "next";
import { DistributionLesson } from "@/components/visualizer/DistributionLesson";

export const metadata: Metadata = {
  title: "3. ZH — Eloszlások | probability/lab",
  description: "Lapozható, vizuális magyar felkészítő a 3. ZH diszkrét és folytonos eloszlásaihoz.",
};

export default function ThirdExamPage() {
  return <DistributionLesson />;
}
