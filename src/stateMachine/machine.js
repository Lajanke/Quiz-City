import { Machine } from 'xstate';

export const quizMachine = Machine({
  id: 'quiz type',
  initial: 'city',
  states: {
    city: {
      on: {CHANGE: 'us'}
    },
    us: {
      on: {CHANGE: 'city'}
    },
  },
});