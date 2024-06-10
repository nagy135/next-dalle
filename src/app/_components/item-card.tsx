import React from 'react';
import { Card } from '~/components/ui/card';
import type { ItemEntity } from '~/server/db/schema';

const ItemCard = ({ item }: { item: ItemEntity }) => {
	return (
		<Card>
			<h2>{item.name}</h2>
		</Card>
	);
};

export default ItemCard;
