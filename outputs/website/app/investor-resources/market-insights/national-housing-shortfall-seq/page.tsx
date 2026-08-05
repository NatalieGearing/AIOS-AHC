import { buildMetadata } from "@/lib/seo";
import styles from "./article.module.css";

export const metadata = buildMetadata({
  title: "National Housing Shortfall Widens",
  description:
    "What the latest NHSAC supply data means for South East Queensland, from Affordable House Corp.",
});

export default function NationalHousingShortfallSeqPage() {
  return (
    <div className={styles.page}>
      <article className={styles.sheet}>
        <header className={styles.band}>
          <div className={styles.masthead}>
            <div className={styles.brand}>
              Market Insights <span>· SEQ Housing</span>
            </div>
            <div className={styles.dateline}>August 2026</div>
          </div>
          <h1>
            National housing shortfall widens: what the latest supply data means
            for SEQ
          </h1>
          <p className={styles.standfirst}>
            Australia&apos;s independent housing adviser has confirmed the country is
            on track to fall well short of its national building target — a gap that
            continues to shape rental conditions across{" "}
            <strong>South East Queensland</strong>.
          </p>
        </header>

        <section className={styles.band}>
          <h2>What&rsquo;s changed</h2>
          <p>
            The <strong>National Housing Supply and Affordability Council (NHSAC)</strong>{" "}
            — the statutory body established under the{" "}
            <em>National Housing Supply and Affordability Council Act 2023</em> to
            give the federal government independent advice on housing supply — has
            released its latest assessment of the housing system.
          </p>

          <div
            className={styles.figure}
            role="group"
            aria-label="Housing Accord scorecard, five years to 30 June 2029"
          >
            <p className={styles.figureTitle}>
              The Housing Accord scorecard · 5 years to 30 June 2029
            </p>

            <div className={styles.stats}>
              <div className={`${styles.stat} ${styles.build}`}>
                <span className={styles.num}>938k</span>
                <span className={styles.lab}>
                  <b>Dwellings forecast</b>new homes built nationally
                </span>
              </div>
              <div className={`${styles.stat} ${styles.gap}`}>
                <span className={styles.num}>262k</span>
                <span className={styles.lab}>
                  <b>Shortfall</b>against the 1.2m target
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.num}>
                  0<span style={{ fontSize: ".55em", color: "var(--slate-soft)" }}> / 8</span>
                </span>
                <span className={styles.lab}>
                  <b>States on track</b>none meet their population share
                </span>
              </div>
            </div>

            <div className={styles.barWrap}>
              <div className={styles.barScale}>
                <span>0</span>
                <span className={styles.target}>1.2m — National Housing Accord target</span>
              </div>
              <div
                className={styles.bar}
                role="img"
                aria-label="Of the 1.2 million home target, 938,000 are forecast to be built, leaving a 262,000 shortfall."
              >
                <div className={styles.segBuild}>
                  <span className={styles.segLab}>938,000 forecast</span>
                </div>
                <div className={styles.segGap} />
              </div>
              <div className={styles.barLegend}>
                <span>
                  <i className={`${styles.swatch} ${styles.build}`} /> Forecast to be
                  built (78%)
                </span>
                <span>
                  <i className={`${styles.swatch} ${styles.gap}`} /> Shortfall —
                  262,000 (22%)
                </span>
              </div>
            </div>

            <p className={styles.figNote}>
              Source: National Housing Supply and Affordability Council, State of the
              Housing System. Figures are the Council&rsquo;s forecasts for the five
              years to 30 June 2029.
            </p>
          </div>

          <p style={{ marginTop: "1.6rem" }}>
            The Council points to persistent constraints on new supply — labour
            shortages, elevated material and financing costs, and complex planning
            systems — while noting some of these pressures are beginning to ease.
          </p>
        </section>

        <section className={styles.band}>
          <h2>What it means on the ground</h2>
          <p>
            For South East Queensland, the practical takeaway is continuity rather
            than change. A national undersupply of this scale keeps upward pressure
            on rents and keeps vacancy rates tight, particularly in growth corridors
            where population is rising fastest. It also reinforces the role of
            well-located, compliant, affordable accommodation — from secondary
            dwellings to purpose-built shared housing — in absorbing demand that the
            standard detached-housing pipeline isn&rsquo;t meeting.
          </p>
          <p>
            For anyone operating in this space, the supply gap is a reminder that
            compliance and quality matter <strong>more, not less</strong>, in a tight
            market: demand tends to find the stock that&rsquo;s properly approved,
            well-managed and genuinely affordable to run.
          </p>
        </section>

        <section className={styles.band}>
          <h2>Read it yourself</h2>
          <div className={styles.source}>
            <div className={styles.mark} aria-hidden="true">§</div>
            <p>
              The full report and the Council&rsquo;s quarterly progress tracking
              against the Housing Accord are published on the NHSAC website:{" "}
              <a href="https://nhsac.gov.au" target="_blank" rel="noopener noreferrer">
                nhsac.gov.au
              </a>
            </p>
          </div>
        </section>

        <footer className={`${styles.band} ${styles.fine}`}>
          <p>
            This article summarises publicly available data from the National
            Housing Supply and Affordability Council. It is general information
            about market conditions and is not financial, investment or property
            advice.
          </p>
          <p>Figures are current as at the date of publication and may change.</p>
        </footer>
      </article>
    </div>
  );
}
