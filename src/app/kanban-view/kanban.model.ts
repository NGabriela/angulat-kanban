export interface Card{
  id:number;
  name:string;
}

export interface Stage{
  id:number;
  name:string;
  cards: Card[];
}