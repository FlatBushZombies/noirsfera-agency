import type { Metadata } from "next"
import { Portfolio } from "@/components/portfolio"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "10+ products shipped for founders and ourselves — noirsfera's client and in-house work.",
}

export default function Page() {
  return <Portfolio />
}
