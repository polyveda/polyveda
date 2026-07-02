import { Hero } from "@/components/sections/Hero";
import { KineticFlow } from "@/components/ui/KineticFlow";
import { ScrollSyncedText } from "@/components/sections/ScrollSyncedText";
import { ScrollZoomReveal } from "@/components/sections/ScrollZoomReveal";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { ProductsShowcase } from "@/components/sections/ProductsShowcase";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <KineticFlow />
      <ScrollSyncedText />
      <ScrollZoomReveal />
      <ProblemSolution />
      <IndustryGrid />
      <ProductsShowcase />
      

    </div>
  );
}
