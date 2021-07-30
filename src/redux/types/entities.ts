export type timestamp = number;

export type AppRecord = {
  loading: boolean;
  authorized: boolean;
  lastRoute?: {
    path: string;
    activeUntil: timestamp;
  };
};

export type NewsCategory = {
  name: string
  id: number
}
export type NewsAuthor = {
  name: string
  id: number
}

export type NewsType ={
  title: string
  date: moment.Moment
  text: string
  category: NewsCategory
  author: NewsAuthor
}

export type NewsResponseType = {
  data: NewsType[],
  count: number
}


