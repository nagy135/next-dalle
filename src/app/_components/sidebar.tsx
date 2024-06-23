"use client";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "~/components/ui/sheet"
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const links = [
	{
		href: "/admin/items",
		text: "Items",
		icon: "📦",
	},
	{
		href: "/admin/categories",
		text: "Categories",
		icon: "🏷️",
	},
];

export default function Sidebar() {
	return (
		<Sheet>
			<SheetTrigger>
				<HamburgerMenuIcon />
			</SheetTrigger>
			<SheetContent side={"left"}>
				<SheetHeader>
					<SheetTitle></SheetTitle>
					<SheetDescription>
						<div className="flex-col gap-3">
							{links.map((link, i) => (
								<div key={`link-${i}`}>
									<SheetTrigger asChild>
										<Link className="text-lg text-black font-bold" href={link.href} >
											<span className="pr-2">{link.icon}</span>	{link.text}
										</Link>
									</SheetTrigger>
								</div>
							))}
						</div>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
