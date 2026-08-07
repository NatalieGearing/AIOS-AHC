import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import styles from "./market-insights.module.css";

export const metadata = buildMetadata({
  title: "Current Market Insights",
  description:
    "Market data and insights for property investors, from Affordable House Corp.",
});

export default function MarketInsightsPage() {
  return (
    <div>
      <div className="relative min-h-[600px]">
        <Image
          src="/images/market-insights-hero.png"
          alt="Property market data charts, a magnifying glass and wooden house models on financial spreadsheets"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 to-brand-navy/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-6 py-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Market Insights · South East Queensland
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Current market insights
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white">
              Plain-English commentary on the data, rules and planning changes shaping
              affordable and shared housing across SEQ. We report the finding and what
              it means for how the market operates — and{" "}
              <strong>leave the buy signal to you</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.page}>
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Latest</p>

        <Link
          className={styles.card}
          href="/investor-resources/market-insights/national-housing-shortfall-seq"
          aria-label="Read: National housing shortfall widens"
        >
          <article className={styles.featured}>
            <div className={styles.featuredStrip} />
            <div className={styles.featuredBody}>
              <div className={styles.toprow}>
                <span className={styles.kicker}>Featured</span>
                <span className={`${styles.tag} ${styles.nhsac}`}>NHSAC</span>
                <span className={styles.metaDate}>5 Aug 2026</span>
              </div>
              <h2>
                National housing shortfall widens: what the latest supply data means
                for SEQ
              </h2>
              <p className={styles.dek}>
                Australia&apos;s independent housing adviser forecasts a
                262,000-dwelling shortfall against the 1.2 million-home National
                Housing Accord target — a gap that keeps rents high and vacancy tight
                across South East Queensland&apos;s growth corridors.
              </p>
              <div className={styles.footrow}>
                <span className={`${styles.tag} ${styles.nhsac}`}>Supply &amp; affordability</span>
                <span className={styles.readmore}>
                  Read the full insight <span className={styles.arrow}>&rarr;</span>
                </span>
              </div>
            </div>
          </article>
        </Link>

        <p className={styles.eyebrow}>Earlier insights</p>

        <div className={styles.grid}>
          <a className={`${styles.card} ${styles.soon}`} href="#" aria-label="Coming soon">
            <article className={`${styles.mini} ${styles.isSoon}`}>
              <div className={styles.toprow}>
                <span className={`${styles.tag} ${styles.rta}`}>RTA</span>
                <span className={styles.soonFlag}>In preparation</span>
              </div>
              <h3>Rooming accommodation rule changes: what operators need to know</h3>
              <p>
                A plain-English read of the latest Residential Tenancies Authority
                updates affecting rooming accommodation and how they change day-to-day
                compliance.
              </p>
              <div className={styles.footrow}>
                <span className={styles.soonFlag}>Coming soon</span>
              </div>
            </article>
          </a>

          <a className={`${styles.card} ${styles.soon}`} href="#" aria-label="Coming soon">
            <article className={`${styles.mini} ${styles.isSoon}`}>
              <div className={styles.toprow}>
                <span className={`${styles.tag} ${styles.council}`}>Council</span>
                <span className={styles.soonFlag}>In preparation</span>
              </div>
              <h3>Dual occupancy &amp; subdivision: reading the SEQ planning schemes</h3>
              <p>
                How Moreton Bay, Ipswich, Logan and Sunshine Coast are treating
                secondary dwellings and subdivision — and where the policy is heading.
              </p>
              <div className={styles.footrow}>
                <span className={styles.soonFlag}>Coming soon</span>
              </div>
            </article>
          </a>

          <a className={`${styles.card} ${styles.soon}`} href="#" aria-label="Coming soon">
            <article className={`${styles.mini} ${styles.isSoon}`}>
              <div className={styles.toprow}>
                <span className={`${styles.tag} ${styles.abs}`}>ABS</span>
                <span className={styles.soonFlag}>In preparation</span>
              </div>
              <h3>Where SEQ is growing fastest: population and dwelling data</h3>
              <p>
                The latest ABS and Queensland Treasury figures on population growth
                and dwelling approvals across the region&apos;s key corridors.
              </p>
              <div className={styles.footrow}>
                <span className={styles.soonFlag}>Coming soon</span>
              </div>
            </article>
          </a>

          <a className={`${styles.card} ${styles.soon}`} href="#" aria-label="Coming soon">
            <article className={`${styles.mini} ${styles.isSoon}`}>
              <div className={styles.toprow}>
                <span className={`${styles.tag} ${styles.council}`}>Council</span>
                <span className={styles.soonFlag}>In preparation</span>
              </div>
              <h3>Approvals in a tight market: why compliant stock wins</h3>
              <p>
                A closer look at how properly approved, well-managed accommodation is
                absorbing demand the standard housing pipeline isn&apos;t meeting.
              </p>
              <div className={styles.footrow}>
                <span className={styles.soonFlag}>Coming soon</span>
              </div>
            </article>
          </a>
        </div>

        <p className={styles.footnote}>
          Market Insights summarises publicly available data from independent and
          government sources. It is general information about market conditions and
          is not financial, investment or property advice. Figures are current as at
          the date of publication and may change.
        </p>
      </div>
      </div>
    </div>
  );
}
