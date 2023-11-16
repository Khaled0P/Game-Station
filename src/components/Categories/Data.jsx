import { nanoid } from 'nanoid';
import {
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  subDays,
  startOfYear,
  endOfYear,
} from 'date-fns';
import Star from '../../assets/star.svg?react';
import Fire from '../../assets/fire.svg?react';
import Skip from '../../assets/skip.svg?react';
import Cup from '../../assets/cup.svg?react';
import Crown from '../../assets/crown.svg?react';
import Windows from '../../assets/windows.svg?react';
import Playstation from '../../assets/playstation.svg?react';
import Xbox from '../../assets/xbox.svg?react';
import Nintendo from '../../assets/nintendo.svg?react';
import Action from '../../assets/action.svg?react';
import Strategy from '../../assets/strategy.svg?react';
import RPG from '../../assets/RPG.svg?react';
import Shooter from '../../assets/shooter.svg?react';
import Adventure from '../../assets/adventure.svg?react';
import Puzzle from '../../assets/puzzle.svg?react';
import Racing from '../../assets/racing.svg?react';
import Sports from '../../assets/sports.svg?react';

//dates
const currentDate = new Date();

const datesToFormat = [
  currentDate,
  startOfWeek(currentDate, { weekStartsOn: 1 }),
  endOfWeek(currentDate, { weekStartsOn: 1 }),
  startOfYear(currentDate),
  endOfYear(currentDate),
  subDays(currentDate, 30),
  addDays(endOfWeek(currentDate, { weekStartsOn: 1 }), 7),
];
const formattedDates = datesToFormat.map((date) => format(date, 'yyyy-MM-dd'));

const [
  today,
  startOfWeekDate,
  endOfWeekDate,
  startOfYearDate,
  endOfYearDate,
  thirtyDaysAgo,
  endOfNextWeekDate,
] = formattedDates;

export const releases = {
  filter: '&dates',
  content: [
    {
      id: nanoid(),
      name: 'Last 30 days',
      value: `${thirtyDaysAgo},${today}`,
      icon: <Star />,
    },
    {
      id: nanoid(),
      name: 'This week',
      value: `${startOfWeekDate},${endOfWeekDate}`,
      icon: <Fire />,
    },
    {
      id: nanoid(),
      name: 'Next week',
      value: `${endOfWeekDate},${endOfNextWeekDate}`, //removed until Error handling is implemented
      icon: <Skip />,
    },
  ],
};

export const top_games = {
  filter: 'metacritic=100',
  content: [
    {
      id: nanoid(),
      name: 'All time top',
      value: '',
      icon: <Crown />,
    },
    {
      id: nanoid(),
      name: 'Best of the year',
      value: `&dates=${startOfYearDate},${endOfYearDate}`,
      icon: <Cup />,
    },
  ],
};

export const platforms = {
  filter: '&parent_platforms',
  content: [
    {
      id: nanoid(),
      name: 'PC',
      value: '1',
      icon: <Windows />,
    },

    {
      id: nanoid(),
      name: 'PlayStation',
      value: '2',
      icon: <Playstation />,
    },
    {
      id: nanoid(),
      name: 'Xbox',
      value: '3',
      icon: <Xbox />,
    },
    {
      id: nanoid(),
      name: 'Nintendo',
      value: '7',
      icon: <Nintendo />,
    },
  ],
};

export const genres = {
  filter: 'genres',
  content: [
    { id: nanoid(), name: 'action', icon: <Action /> },
    { id: nanoid(), name: 'strategy', icon: <Strategy /> },
    { id: nanoid(), name: 'RPG', value: '5', icon: <RPG /> },
    { id: nanoid(), name: 'shooter', icon: <Shooter /> },
    { id: nanoid(), name: 'adventure', icon: <Adventure /> },
    { id: nanoid(), name: 'puzzle', icon: <Puzzle /> },
    { id: nanoid(), name: 'racing', icon: <Racing /> },
    { id: nanoid(), name: 'sports', icon: <Sports /> },
  ],
};
