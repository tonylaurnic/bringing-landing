import type { Metadata } from "next";
import Link from "next/link";
import DriverForm from "@/components/DriverForm";

export const metadata: Metadata = {
  title: "Diventa driver — Bringing",
  description:
    "Lavora come driver su Bringing. Orari flessibili, pagamenti settimanali. Candidati ora.",
};

export default function DriverRegisterPage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "#fffbf7" }}>
      <header className="px-6 py-5 border-b border-orange-100">
        <Link href="/" className="text-2xl font-bold text-orange-500">Bringing</Link>
      </header>

      <div className="flex flex-col items-center px-6 py-14 flex-1">
        <div className="w-full max-w-lg">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 mb-6">
            ← Torna alla home
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🛵</span>
            <h1 className="text-3xl font-bold text-gray-900">Diventa driver</h1>
          </div>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Lavora con i tuoi orari e guadagna ad ogni consegna. Ti attiviamo entro <strong className="text-gray-700">24 ore</strong> dalla candidatura.
          </p>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <DriverForm />
          </div>
        </div>
      </div>
    </main>
  );
}
