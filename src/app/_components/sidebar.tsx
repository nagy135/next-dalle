"use client";

import { Button } from "~/components/ui/button";
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
import { useState } from "react";

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
	const [open, setOpen] = useState(false);
	return (
		<Sheet open={open}>
			<SheetTrigger asChild>
				<Button onClick={() => setOpen(!open)}>
					<HamburgerMenuIcon />
				</Button>
			</SheetTrigger>
			<SheetContent side={"left"}>
				<SheetHeader>
					<SheetTitle></SheetTitle>
					<SheetDescription>
						<div className="flex-col gap-3">
							{links.map((link, i) => (
								<div key={`link-${i}`}>
									<Link className="text-lg text-black font-bold" href={link.href} >
										<Button onClick={() => setOpen(!open)} variant="ghost">
											<span className="pr-2">{link.icon}</span>	{link.text}
										</Button>
									</Link>
								</div>
							))}
						</div>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
