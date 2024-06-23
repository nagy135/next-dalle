"use client";

import Link from "next/link";
import { forwardRef } from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "~/components/ui/navigation-menu"
import { cn } from "~/lib/utils";
import { CategoryWithChildrenEntity } from "~/server/db/schema";

type NavigationProps = {
	categories: CategoryWithChildrenEntity[];
};

export default function Navigation({ categories }: NavigationProps) {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{categories.map((category, i) => (
					<NavigationMenuItem key={`navigation-menu-item-${i}`}>
						<NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
								{category.children?.map((child) => (
									<ListItem
										key={child.id}
										title={child.name}
										href={`/category/${child.id}`}
									>
										{child.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}

const ListItem = forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = "ListItem"
