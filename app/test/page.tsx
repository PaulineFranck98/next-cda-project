'use client';

import { useState } from "react";

export default function TailwindCollapse() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10 max-w-xl mx-auto">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {open ? 'Fermer' : 'Ouvrir'}
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="bg-gray-200 p-4 mt-2 rounded">
          🎉 Ceci est un contenu animé avec Tailwind, sans shadcn.
        </div>
      </div>
    </div>
  );
}
