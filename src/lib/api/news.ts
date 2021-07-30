import moment from 'moment';

import { NewsAuthor, NewsCategory, NewsResponseType, NewsType } from "../../redux/types/entities";

export const getCategories = async (): Promise<NewsCategory[]> => {
  return [
    { name: "Категория 1", id: 1 },
    { name: "Категория 2", id: 2 },
    { name: "Категория 3", id: 3 },
  ];
};
export const getAuthors = async (): Promise<NewsAuthor[]> => {
  return [
    { name: "Автор 1", id: 1 },
    { name: "Автор 2", id: 2 },
    { name: "Автор 3", id: 3 },
  ];
};

export const getNews = async (selectedAuthor: number, paginationActive: number, selectedCategory: number, sort: string): Promise<NewsResponseType> => {
  console.log(selectedAuthor, paginationActive, selectedCategory, sort)
  return {
    count: 100,
    data: [
   {
     title: 'Новость 1',
     text: 'Супер нововсть 1',
     category: { name: "Спорт", id: 1 },
     author: { name: "Автор 1", id: 1 },
     date: moment('2020-02-08 09:30')
   },
   {
     title: 'Новость 2',
     text: 'Супер нововсть 1',
     category: { name: "Спорт", id: 1 },
     author: { name: "Автор 1", id: 1 },
     date: moment('2020-02-09 09:30')
   },
   {
     title: 'Новость 3',
     text: 'Супер нововсть 1',
     category: { name: "Спорт", id: 1 },
     author: { name: "Автор 1", id: 1 },
     date: moment('2020-02-10 09:30')
   },
   {
     title: 'Новость 4',
     text: 'Супер нововсть 1',
     category: { name: "Спорт", id: 1 },
     author: { name: "Автор 1", id: 1 },
     date: moment('2020-02-11 09:30')
   },
   {
     title: 'Новость 5',
     text: 'Супер нововсть 1',
     category: { name: "Спорт", id: 1 },
     author: { name: "Автор 1", id: 1 },
     date: moment('2020-02-12 09:30')
   },
   {
     title: 'Новость 6',
     text: 'Супер нововсть 1',
     category: { name: "Спорт", id: 1 },
     author: { name: "Автор 1", id: 1 },
     date: moment('2020-02-13 09:30')
   },
   {
     title: 'Новость 7',
     text: 'Супер нововсть 1',
     category: { name: "Спорт", id: 1 },
     author: { name: "Автор 1", id: 1 },
     date: moment('2020-02-14 09:30')
    },
   {
     title: 'Новость 8',
     text: 'Супер нововсть 1',
     category: { name: "Спорт", id: 1 },
     author: { name: "Автор 1", id: 1 },
     date: moment('2020-02-15 09:30')
   },
   {
     title: 'Новость 9',
     text: 'Супер нововсть 1',
     category: { name: "Спорт", id: 1 },
     author: { name: "Автор 1", id: 1 },
     date: moment('2020-02-16 09:30')
   },
   {
     title: 'Новость 10',
     text: 'Супер нововсть 1',
     category: { name: "Спорт", id: 1 },
     author: { name: "Автор 1", id: 1 },
     date: moment('2020-02-17 09:30')
   },
   {
     title: 'Новость 11',
     text: 'Супер нововсть 1',
     category: { name: "Спорт", id: 1 },
     author: { name: "Автор 1", id: 1 },
     date: moment('2020-02-18 09:30')
   },
   {
     title: 'Новость 12',
     text: 'Супер нововсть 1',
     category: { name: "Спорт", id: 1 },
     author: { name: "Автор 1", id: 1 },
     date: moment('2020-02-19 09:30')
   },
  ]
}
};


const newsApi = {
    getCategories,
    getNews,
    getAuthors
};

export default newsApi;
