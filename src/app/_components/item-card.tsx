import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import type { ItemEntity } from '~/server/db/schema';

const ItemCard = ({ item }: { item: ItemEntity }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{item.name}</CardTitle>
				<CardDescription>{item.createdAt.toISOString()}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>img</p>
			</CardContent>
		</Card>
	);
};

export default ItemCard;
