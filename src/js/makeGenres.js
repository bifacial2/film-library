import text from '../partials/dictionary.json';
import { locale } from './localization';

locale.lang = localStorage.getItem('LOCALE');

export function makeGenres(numbers) {
  const genreName = genreId.filter(data => {
    for (let number of numbers) {
      if (data.id === number) {
        return data;
      }
    }
  });
  const genreNumbers = genreName.map(data => data.name);
  if (genreNumbers.length >= 3) {
    const prune = genreNumbers.slice(0, 2);
    const newGenres = [...prune, `${text[locale.lang].genreToMany}`];
    return newGenres.join(', ');
  } else {
    return genreNumbers.join(', ');
  }
}

const genreId = [
  { id: 28, name: `${text[locale.lang].genreAction}` },
  { id: 12, name: `${text[locale.lang].genreAdventure}` },
  { id: 16, name: `${text[locale.lang].genreAnimation}` },
  { id: 35, name: `${text[locale.lang].genreComedy}` },
  { id: 80, name: `${text[locale.lang].genreCrime}` },
  { id: 99, name: `${text[locale.lang].genreDocumentary}` },
  { id: 18, name: `${text[locale.lang].genreDrama}` },
  { id: 10751, name: `${text[locale.lang].genreFamily}` },
  { id: 14, name: `${text[locale.lang].genreFantasy}` },
  { id: 36, name: `${text[locale.lang].genreHistory}` },
  { id: 27, name: `${text[locale.lang].genreHorror}` },
  { id: 10402, name: `${text[locale.lang].genreMusic}` },
  { id: 9648, name: `${text[locale.lang].genreMystery}` },
  { id: 10749, name: `${text[locale.lang].genreRomance}` },
  { id: 878, name: `${text[locale.lang].genreScienceFiction}` },
  { id: 10770, name: `${text[locale.lang].genreTV}` },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

/* const genreId = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
]; */
