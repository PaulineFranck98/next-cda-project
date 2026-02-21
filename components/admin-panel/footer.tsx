import Link from "next/link";


export function Footer() {
	return (
		<div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="border-t border-gray-200 bg-gray-100 text-violet-700 py-6 mt-6">
				<div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-between gap-4 text-sm">
					<div className="flex items-center gap-2">
						<span className="font-semibold">ShareMyWay</span>
					</div>
					<nav className="flex flex-wrap items-center justify-center gap-4 text-violet-700" role="navigation">
						<Link href="#" className="hover:underline">CGU</Link>
						<Link href="#" className="hover:underline">Politique de confidentialité</Link>
						<Link href="#" className="hover:underline">Mentions légales</Link>
						<Link href="#" className="hover:underline">Contact</Link>
					</nav>
					<div className="text-gray-500 text-xs">
						© {new Date().getFullYear()} ShareMyWay — Tous droits réservés
					</div>
				</div>
			</div>
		</div>
	);
}
