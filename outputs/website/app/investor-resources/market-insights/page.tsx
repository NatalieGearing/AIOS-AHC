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
    <div className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.pagehead}>
          <div className={styles.brand}>
            Market Insights <span>· SEQ Housing</span>
          </div>
          <div className={styles.updated}>Updated August 2026</div>
        </header>

        <section className={styles.hero}>
          <svg
            className={styles.heroSvg}
            viewBox="0 0 1200 240"
            preserveAspectRatio="xMidYMax slice"
            role="img"
            aria-label="Illustration of a South East Queensland dusk skyline of homes with lit windows."
          >
            <defs>
              <linearGradient id="mi-sky" x1="0" y1="0" x2="0" y2="1">
                <stop className={styles.sTop} offset="0" />
                <stop className={styles.sHor} offset="1" />
              </linearGradient>
              <radialGradient id="mi-sun" cx="0.5" cy="0.5" r="0.5">
                <stop className={styles.sSun} offset="0" stopOpacity="0.9" />
                <stop className={styles.sSun} offset="1" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect x="0" y="0" width="1200" height="240" fill="url(#mi-sky)" />
            <circle cx="905" cy="205" r="130" fill="url(#mi-sun)" />
            <circle className={styles.sunCore} cx="905" cy="205" r="34" opacity="0.55" />

            <polygon
              className={styles.far}
              opacity="0.9"
              points="0,240 0,212 60,212 90,188 120,212 200,212 240,192 280,212 360,212 400,190 440,212 540,212 580,194 620,212 720,212 760,188 800,212 900,212 940,192 980,212 1080,212 1120,190 1160,212 1200,212 1200,240"
            />

            <g className={styles.mid}>
              <polygon points="40,240 40,178 90,150 140,178 140,240" />
              <polygon points="150,240 150,190 195,168 240,190 240,240" />
              <polygon points="300,240 300,175 355,145 410,175 410,240" />
              <polygon points="450,240 450,185 505,160 560,185 560,240" />
              <polygon points="600,240 600,178 650,152 700,178 700,240" />
              <polygon points="720,240 720,188 770,162 820,188 820,240" />
              <polygon points="880,240 880,176 940,148 1000,176 1000,240" />
              <polygon points="1040,240 1040,186 1095,160 1150,186 1150,240" />
            </g>

            <g className={styles.near}>
              <polygon points="0,240 0,168 55,132 110,168 110,240" />
              <polygon points="120,240 120,150 180,112 240,150 240,240" />
              <polygon points="250,240 250,172 300,140 350,172 350,240" />
              <polygon points="380,240 380,158 445,120 510,158 510,240" />
              <polygon points="520,240 520,175 565,145 610,175 610,240" />
              <polygon points="630,240 630,150 695,110 760,150 760,240" />
              <polygon points="780,240 780,170 835,138 890,170 890,240" />
              <polygon points="910,240 910,158 970,122 1030,158 1030,240" />
              <polygon points="1050,240 1050,172 1105,142 1160,172 1160,240" />
            </g>

            <g className={styles.roof}>
              <polygon points="120,150 180,112 240,150" />
              <polygon points="630,150 695,110 760,150" />
            </g>

            <g>
              <rect className={styles.heroWin} x="30" y="190" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="70" y="190" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="150" y="172" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="180" y="172" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="210" y="172" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="165" y="205" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="285" y="192" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="318" y="192" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="405" y="180" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="440" y="180" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="475" y="180" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="440" y="208" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="558" y="192" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="655" y="172" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="690" y="172" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="725" y="172" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="690" y="205" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="815" y="190" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="850" y="190" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="945" y="182" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="980" y="182" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="1085" y="192" width="11" height="15" rx="1.5" />
              <rect className={styles.heroWin} x="1118" y="192" width="11" height="15" rx="1.5" />
            </g>
          </svg>

          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Market Insights · South East Queensland</p>
            <h1>Current market insights</h1>
            <p>
              Plain-English commentary on the data, rules and planning changes shaping
              affordable and shared housing across SEQ. We report the finding and what
              it means for how the market operates — and{" "}
              <strong>leave the buy signal to you</strong>.
            </p>
          </div>
        </section>

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
  );
}
