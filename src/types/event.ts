import { Item } from '../types/item';
import { findOrCreateItem } from '../factory/itemFactory';

export interface Event {
  description: string;
  effect: (items: Item[], log: string[]) => void;
}

export const events: Event[] = [
  {
    description: 'You found some apples!',
    effect: (items, log) => {
      const appleCount = Math.floor(Math.random() * 3) + 1;
      findOrCreateItem(items, 'Apple', appleCount);
      log.push(`You found ${appleCount} apples.`);
    }
  },
  {
    description: 'You found a sword!',
    effect: (items, log) => {
      findOrCreateItem(items, 'Sword', 1);
      log.push('You found a sword.');
    }
  }
];
