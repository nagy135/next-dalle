"use client";

import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "~/components/ui/navigation-menu"
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

									<li>
										<NavigationMenuLink asChild>
											<Link
												className={"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"}
												href={`/category/${child.id}`}
											>
												<div className="text-sm font-medium leading-none">{child.name}</div>
												<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
													{child.description}
												</p>
											</Link>
										</NavigationMenuLink>
									</li>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
