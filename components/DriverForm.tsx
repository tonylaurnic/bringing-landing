"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Inserisci il tuo nome completo"),
  email: z.string().email("Inserisci un'email valida"),
  phone: z.string().min(8, "Inserisci un numero di telefono"),
  city: z.string().min(2, "Inserisci la città"),
  vehicle: z.enum(["bici", "scooter", "auto"], {
    error: "Seleziona un veicolo",
  }),
});

type FormData = z.infer<typeof schema>;

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-orange-300 focus:border-orange-400 ${
    hasError ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
  }`;

export default function DriverForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    try {
      await addDoc(collection(db, "driver_registrations"), {
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
          <h2 className="text-xl font-bold text-gray-900">Candidatura inviata!</h2>
          <p className="mt-2 text-gray-500 text-sm leading-relaxed">
            Abbiamo ricevuto la tua candidatura. Ti contatteremo entro 24 ore per attivare il tuo account driver.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Nome completo</label>
        <input
          {...register("name")}
          placeholder="Mario Rossi"
          className={inputClass(!!errors.name)}
        />
        {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="mario@email.com"
          className={inputClass(!!errors.email)}
        />
        {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Numero di telefono</label>
        <input
          {...register("phone")}
          type="tel"
          placeholder="+39 333 000 0000"
          className={inputClass(!!errors.phone)}
        />
        {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Città</label>
          <input
            {...register("city")}
            placeholder="Roma"
            className={inputClass(!!errors.city)}
          />
          {errors.city && <p className="mt-1.5 text-xs text-red-500">{errors.city.message}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Veicolo</label>
          <select
            {...register("vehicle")}
            className={inputClass(!!errors.vehicle)}
          >
            <option value="">Seleziona…</option>
            <option value="bici">🚲 Bicicletta</option>
            <option value="scooter">🛵 Scooter / Moto</option>
            <option value="auto">🚗 Auto</option>
          </select>
          {errors.vehicle && <p className="mt-1.5 text-xs text-red-500">{errors.vehicle.message}</p>}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-orange-500 py-3.5 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50 text-sm"
      >
        {isSubmitting ? "Invio in corso…" : "Invia candidatura →"}
      </button>

      <p className="text-xs text-center text-gray-400">
        Gratuito · Attivazione in 24 ore
      </p>
    </form>
  );
}
