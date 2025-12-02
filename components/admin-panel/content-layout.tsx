import { Navbar } from "@/components/admin-panel/navbar";
import { useUser } from "@clerk/nextjs";

interface ContentLayoutProps {
	title: string;
	children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
	const { user } = useUser();
	const isAdmin = user?.publicMetadata?.role === "admin";
	return (
		<div>
			<Navbar title={title} isAdmin={isAdmin} />
			<div className=" pt-5 pb-8 px-4 sm:px-8">{children}</div>
		</div>
	);
}
