export interface Character {
  id: string;
  name: string;
  gender: string;
  age: number;
  strength: number;
  agility: number;
  charisma: number;
  intelligence: number;
  walkingSpeed: number;
  ridingSpeed: number;
  isRiding: boolean;
  satiety: number;     // 饱食
  hydration: number;   // 饮水
  stamina: number;     // 体力
  mood: number;        // 心情
}
