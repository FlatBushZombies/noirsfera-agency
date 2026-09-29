import type { Metadata } from "next"
import { Call } from "@/components/call"

export const metadata: Metadata = {
  title: "Book a call",
  description: "Book a 20-minute intro call with noirsfera.",
}

export default function Page() {
  return <Call />
}
