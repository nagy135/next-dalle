import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import type { ItemWithCategoryEntity } from '~/server/db/schema';

const ItemCard = ({ item }: { item: ItemWithCategoryEntity }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{item.name}</CardTitle>
				<CardDescription>{item.createdAt.toISOString()}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>category: {item.category?.name ?? 'unknown'}</p>
			</CardContent>
		</Card>
	);
};

export default ItemCard;
