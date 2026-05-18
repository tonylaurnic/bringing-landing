import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bringing — Unisciti alla piattaforma",
  description:
    "Registra il tuo ristorante su Bringing o diventa driver. Inizia oggi.",
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "#fffbf7" }}>
      {/* Header */}
      <header className="px-6 py-5 border-b border-orange-100">
        <span className="text-2xl font-bold text-orange-500">Bringing</span>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-16 pb-10">
        <span className="inline-block bg-orange-100 text-orange-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          Piattaforma di food delivery 🚀
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight max-w-2xl">
          Porta il tuo business<br />
          <span className="text-orange-500">al livello successivo</span>
        </h1>
        <p className="mt-5 text-lg text-gray-500 max-w-lg leading-relaxed">
          Sei un ristorante che vuole crescere online, o cerchi un lavoro flessibile come driver?
          Sei nel posto giusto.
        </p>
      </section>

      {/* Cards */}
      <section className="flex flex-col sm:flex-row gap-6 justify-center px-6 pb-16 max-w-3xl mx-auto w-full">
        <Link
          href="/registrati/ristorante"
          className="group flex-1 flex flex-col items-center text-center gap-5 rounded-3xl bg-white border border-gray-100 shadow-sm p-8 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-orange-200"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-orange-50 text-4xl">
            🍕
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Hai un ristorante?</h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Raggiungi nuovi clienti, gestisci ordini online e fai crescere il tuo locale.
            </p>
          </div>
          <span className="mt-auto w-full rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition group-hover:bg-orange-600">
            Registra il ristorante →
          </span>
        </Link>

        <Link
          href="/registrati/driver"
          className="group flex-1 flex flex-col items-center text-center gap-5 rounded-3xl bg-white border border-gray-100 shadow-sm p-8 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-orange-200"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-orange-50 text-4xl">
            🛵
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Vuoi fare il driver?</h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Lavora con i tuoi orari, guadagna ogni consegna e gestisci tutto dal telefono.
            </p>
          </div>
          <span className="mt-auto w-full rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition group-hover:bg-orange-600">
            Diventa driver →
          </span>
        </Link>
      </section>

      {/* Social proof */}
      <section className="bg-white border-t border-gray-100 py-10 px-6">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-orange-500">200+</p>
            <p className="text-sm text-gray-500 mt-1">Ristoranti attivi</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-500">500+</p>
            <p className="text-sm text-gray-500 mt-1">Driver registrati</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-500">24h</p>
            <p className="text-sm text-gray-500 mt-1">Attivazione account</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Bringing · Tutti i diritti riservati
      </footer>
    </main>
  );
}
