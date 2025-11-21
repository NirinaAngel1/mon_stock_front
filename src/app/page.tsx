"use client";

import Image from "next/image";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function Home() {
  const features = [
    "Simplicité d'utilisation : prise en main rapide grâce à une interface intuitive.",
    "Contrôle total : suivi des stocks en temps réel, où que vous soyez.",
    "Gain de temps et d’argent : optimisation des commandes et réduction du gaspillage.",
    "Évolutivité : fonctionnalités adaptées à la croissance de votre entreprise.",
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 md:px-12">

      {/* HERO SECTION */}
      <section className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT TEXT SECTION */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center md:text-left leading-tight space-y-2">
            Optimisez Votre Stock,<br />
            <span className="text-primary dark:text-primary-light mb-3">Maximisez Votre Potentiel.</span>
          </h1>

          <h3 className="text-lg md:text-xl text-center md:text-left text-gray-600 dark:text-gray-300">
            La solution de gestion de stock intelligente, conçue pour les entreprises de toutes tailles.
          </h3>

          <p className="text-md leading-relaxed text-gray-700 dark:text-gray-300 text-center md:text-left">
            Que vous soyez une petite boutique en ligne, un commerçant indépendant ou une grande entreprise,
            gérez votre inventaire en toute sérénité. 
            Finies les ruptures imprévues et les surplus coûteux !
          </p>

          {/* CTA */}
          <div className="flex justify-center md:justify-start">
            <button className="bg-primary-light hover:bg-primary border-2 border-primary hover:border-primary-light text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium shadow-md transition">
              Découvrir l'application <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="w-full flex justify-center mt-30 md:mt-0">
          <Image
            src="/stock_1.png"
            alt="Dashboard illustration"
            width={400}
            height={300}
            className="rounded-xl shadow-lg object-contain bg-indigo-200 p-6"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-4xl w-full mt-20">
        <h2 className="text-3xl font-bold text-center mb-8">
          Pourquoi nous choisir ?
        </h2>

        <ul className="flex flex-col gap-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-lg text-gray-800 dark:text-gray-300">
              <CheckCircle className="text-primary-light hover:text-primary cursor-pointer flex-shrink-0 mt-1" size={22} />
              {feature}
            </li>
          ))}
        </ul>
      </section>

    </main>
  );
}
