"use client";
import styles from "./../style";

import {
  USDTBalanceFetcher,
  Navbar,
  Hero,
  Footer,
  CTA,
  Clients,
  Testimonials,
} from "../components";
export default function Home() {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <USDTBalanceFetcher />
          <Testimonials /> <Clients /> <CTA /> <Footer />
        </div>
      </div>
    </div>
  );
}
