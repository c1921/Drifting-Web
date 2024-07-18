import { Item, Food, Weapon, Shield, ItemType } from '../types/item';

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

export const itemFactory = (type: ItemType, quantity: number): Item => {
  let item: Item;
  switch (type) {
    case 'food':
      const foodItem = foodItems[Math.floor(Math.random() * foodItems.length)];
      item = { ...foodItem, quantity } as Food;
      break;
    case 'weapon':
      const weaponItem = weaponItems[Math.floor(Math.random() * weaponItems.length)];
      item = { ...weaponItem, quantity } as Weapon;
      break;
    case 'shield':
      const shieldItem = shieldItems[Math.floor(Math.random() * shieldItems.length)];
      item = { ...shieldItem, quantity } as Shield;
      break;
    default:
      throw new Error('Unknown item type');
  }
  return item;
};
