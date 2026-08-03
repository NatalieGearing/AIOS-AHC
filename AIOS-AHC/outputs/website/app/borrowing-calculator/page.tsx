import { BorrowingCalculator } from "@/components/borrowing/BorrowingCalculator";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Borrowing Calculator",
  description:
    "Size the debt on a rooming accommodation build the way a lender does — the lowest of loan-to-cost, loan-to-value and interest-cover, with cashflow, yields and feasibility insights.",
});

export default function BorrowingCalculatorPage() {
  return <BorrowingCalculator />;
}
