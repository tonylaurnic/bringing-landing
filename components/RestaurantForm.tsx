"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Inserisci il nome del ristorante"),
  email: z.string().email("Inserisci un'email valida"),
  phone: z.string().min(8, "Inserisci un numero di telefono"),
  city: z.string().min(2, "Inserisci la città"),
  address: z.string().min(5, "Inserisci l'indirizzo completo"),
  cuisine: z.string().min(2, "Inserisci il tipo di cucina"),
});

type FormData = z.infer<typeof schema>;

export default function RestaurantForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    try {
      await addDoc(collection(db, "restaurant_registrations"), {
        ...data,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch {
      setError("Qualcosa è andato storto. Riprova tra qualche minuto.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-6 gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
          🎉
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Richiesta ricevuta!</h2>
          <p className="mt-2 text-gray-500 text-sm leading-relaxed">
            Abbiamo ricevuto la tua richiesta. Ti contatteremo entro 24 ore per completare la configurazione del ristorante.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field label="Nome del ristorante" error={errors.name?.message}>
        <input {...register("name")} placeholder="Es. Pizzeria Da Mario" />
      </Field>

      <Field label="Email di contatto" error={errors.email?.message}>
        <input {...register("email")} type="email" placeholder="info@ristorante.it" />
      </Field>

      <Field label="Numero di telefono" error={errors.phone?.message}>
        <input {...register("phone")} type="tel" placeholder="+39 333 000 0000" />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Città" error={errors.city?.message}>
          <input {...register("city")} placeholder="Roma" />
        </Field>
        <Field label="Tipo di cucina" error={errors.cuisine?.message}>
          <input {...register("cuisine")} placeholder="Italiana, Pizza, Sushi…" />
        </Field>
      </div>

      <Field label="Indirizzo" error={errors.address?.message}>
        <input {...register("address")} placeholder="Via Roma 1, Roma" />
      </Field>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-orange-500 py-3.5 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50 text-sm"
      >
        {isSubmitting ? "Invio in corso…" : "Registra il ristorante →"}
      </button>

      <p className="text-xs text-center text-gray-400">
        Registrazione gratuita · Nessun impegno
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...(children.props)}
        className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-orange-300 focus:border-orange-400 ${
          error ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
