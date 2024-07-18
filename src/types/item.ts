// 基础物品接口
export interface Item {
  name: string;
  weight: number;
  value: number;
  quantity: number;
}

// 食物接口，继承自 Item
export interface Food extends Item {
  nutrition: number;
  hydration: number;
  taste: number;
}

// 武器接口，继承自 Item
export interface Weapon extends Item {
  attackPower: number;
}

// 盾牌接口，继承自 Item
export interface Shield extends Item {
  defense: number;
}
