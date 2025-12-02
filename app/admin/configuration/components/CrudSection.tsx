"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash, CheckCheck } from "lucide-react";

type CrudSectionProps = {
	title: string;
	apiUrl: string;
	field: string;
};

type CrudItem = {
	id: string;
	[key: string]: string | number | boolean | null;
};

export default function CrudSection({ title, apiUrl, field }: CrudSectionProps) {
	const [items, setItems] = useState<CrudItem[]>([]);
	const [newValue, setNewValue] = useState("");

	const [editingId, setEditingId] = useState<string | null>(null);
	const [editValue, setEditValue] = useState("");

	async function fetchItems() {
		const res = await fetch(apiUrl);
		if (res.ok) setItems(await res.json());
	}

	useEffect(() => {
		fetchItems();
	}, []);

	async function handleAdd() {
		if (!newValue.trim()) return;
		await fetch(apiUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ [field]: newValue }),
		});
		setNewValue("");
		fetchItems();
	}

	function handleEdit(item: CrudItem) {
		setEditingId(item.id);
		setEditValue(String(item[field] ?? ""));
	}

	async function handleUpdate(id: string) {
		if (!editValue.trim()) return;
		await fetch(`${apiUrl}/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ [field]: editValue }),
		});
		setEditingId(null);
		setEditValue("");
		fetchItems();
	}

	async function handleDelete(id: string) {
		await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
		fetchItems();
	}

	return (
		<div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
			<h2 className="text-lg font-semibold mb-4">{title}</h2>
			<div className="flex items-center gap-2 mb-4">
				<input
					value={newValue}
					onChange={(e) => setNewValue(e.target.value)}
					placeholder={`Ajouter un ${title.toLowerCase()}`}
					className="border px-3 py-2 rounded w-full"
				/>
				<button
					onClick={handleAdd}
					className="bg-violet-600 text-white px-3 py-2 rounded hover:bg-violet-700"
				>
					<Plus size={18} />
				</button>
			</div>
			<table className="w-full border-collapse">
				<thead>
					<tr className="text-left border-b">
						<th className="py-2 px-3">Nom</th>
						<th className="py-2 px-3 text-right"></th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr
							key={item.id}
							className="border-b hover:bg-gray-50 transition-colors"
						>
							<td className="py-2 px-3">
								{editingId === item.id ? (
									<input
										value={editValue}
										onChange={(e) => setEditValue(e.target.value)}
										onKeyDown={(e) => e.key === "Enter" && handleUpdate(item.id)}
										className="border px-2 py-1 rounded w-full"
										autoFocus
									/>
								) : (
									item[field]
								)}
							</td>
							<td className="py-2 px-3 text-right space-x-2">
								{editingId === item.id ? (
									<>
										<button
											onClick={() => handleUpdate(item.id)}
											className="text-green-600 hover:text-green-800"
											title="Enregistrer"
										>
											<CheckCheck size={16} />
										</button>
										<button
											onClick={() => {
												setEditingId(null);
												setEditValue("");
											}}
											className="text-gray-500 hover:text-gray-700"
											title="Annuler"
										>
											✖
										</button>
									</>
								) : (
									<>
										<button
											onClick={() => handleEdit(item)}
											className="text-violet-700 hover:text-violet-900"
											title="Modifier"
										>
											<Pencil size={16} />
										</button>
										<button
											onClick={() => handleDelete(item.id)}
											className="text-red-600 hover:text-red-800"
											title="Supprimer"
										>
											<Trash size={16} />
										</button>
									</>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
