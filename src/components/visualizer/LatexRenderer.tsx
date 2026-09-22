"use client";

import { useMemo } from "react";
import katex from "katex";

interface LatexRendererProps { math: string; className?: string; }

export function LatexRenderer({ math, className = "" }: LatexRendererProps) {
  const html = useMemo(() => katex.renderToString(math, { displayMode: true, throwOnError: false }), [math]);
  return <div className={`latex-renderer ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
