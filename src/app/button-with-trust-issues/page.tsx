import type { Metadata } from "next";
import { AppNavbar } from "@/components/apps/AppNavbar";
import { AppFooter } from "@/components/apps/AppFooter";
import { ButtonWithTrustIssues } from "@/components/apps/ButtonWithTrustIssues";

export const metadata: Metadata = {
  title: "Button With Trust Issues",
  description: "A button that runs away when you try to click it.",
};

export default function ButtonWithTrustIssuesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main">
      <AppNavbar />
      <main className="flex-1">
        <ButtonWithTrustIssues />
      </main>
      <AppFooter />
    </div>
  );
}
