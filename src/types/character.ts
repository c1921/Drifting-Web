export interface Character {
  id: string;  // 增加唯一标识符
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
}
