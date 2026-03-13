import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation for Business | Custom AI Solutions Toronto — DOTxLabs",
  description:
    "Custom AI automation for Toronto and GTA businesses. Chatbots, workflow automation, and intelligent systems that save time and scale operations.",
  alternates: {
    canonical: "/services/ai-automation",
  },
};

export default function AIAutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
