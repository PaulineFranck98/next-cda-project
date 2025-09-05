"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface DangerZoneProps {
  locationId: string;
}

const DangerZone = ({ locationId }: DangerZoneProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Confirmer la suppression de l'établissement ?")) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/location/${locationId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/dashboard/location");
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch (error) {
      alert("Erreur serveur." +error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-red-500 rounded-lg py-6 px-8 shadow mb-8 flex flex-col bg-red-50">
      <h2 className="text-xl font-semibold mb-6 text-red-600">Zone de danger</h2>
      <div className="mt-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 cursor-pointer transition-all ease-in-out duration-300"
          disabled={loading}
        >
          {loading ? "Suppression..." : "Supprimer l'établissement"}
        </button>
      </div>
    </div>
  );
};

export default DangerZone;