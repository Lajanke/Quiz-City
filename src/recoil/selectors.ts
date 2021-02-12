import { selector } from 'recoil';
import { Validated } from './atoms';

export const CorrectAnswers = selector({
    key: 'CorrectAnswers',
    get: ({get}) => {
        const correct = get(Validated);
        return Array.from(new Set(correct)).length;
    }
})

