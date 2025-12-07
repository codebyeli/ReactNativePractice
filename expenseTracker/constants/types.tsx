export type Entry = {
  id: number;
  type?: Type;
  amount: number;
  name: string;
  category?: Category;
  description?: string;
};

export type Category = {
  id: number;
  type?: Type;
  budget: number;
  name: string;
  description?: string;
};

export type Budget = {
  amount: number;
  isOverBudget: boolean;
};


export type Type = 'income' | 'expense'