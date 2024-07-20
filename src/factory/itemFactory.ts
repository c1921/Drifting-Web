import { Item, Food, Weapon, Shield } from '../types/item';

// 示例物品数据
const foodItems = [
  { name: 'Apple', weight: 1, value: 5, nutrition: 5, hydration: 3, taste: 7 },
  { name: 'Blueberry', weight: 1, value: 6, nutrition: 6, hydration: 4, taste: 8 },
  { name: 'Bread', weight: 2, value: 10, nutrition: 8, hydration: 1, taste: 6 }
];

const weaponItems = [
  { name: 'Sword', weight: 10, value: 50, attackPower: 25 },
  { name: 'Hammer', weight: 15, value: 75, attackPower: 35 },
  { name: 'Axe', weight: 12, value: 60, attackPower: 30 }
];

const shieldItems = [
  { name: 'Wooden Shield', weight: 10, value: 20, defense: 10 },
  { name: 'Iron Shield', weight: 15, value: 40, defense: 20 },
  { name: 'Steel Shield', weight: 20, value: 60, defense: 30 }
];

const allItems = [
  ...foodItems.map(item => ({ ...item, type: 'food' })),
  ...weaponItems.map(item => ({ ...item, type: 'weapon' })),
  ...shieldItems.map(item => ({ ...item, type: 'shield' }))
];

export const itemFactory = (name: string, quantity: number): Item => {
  const item = allItems.find(item => item.name === name);
  if (!item) throw new Error('Item not found');

  switch (item.type) {
    case 'food':
      return { ...item, quantity } as Food;
    case 'weapon':
      return { ...item, quantity } as Weapon;
    case 'shield':
      return { ...item, quantity } as Shield;
    default:
      throw new Error('Unknown item type');
  }
};
