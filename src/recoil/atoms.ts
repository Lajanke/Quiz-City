import { atom } from 'recoil';

export const UsQuiz = atom<boolean>({
    key: 'CurrentQuiz',
    default: false,
});

export const Country = atom<string>({
    key: 'CurrentCountry',
    default: 'Australia',
});

export const Quantity = atom<number>({
    key: 'Quantity',
    default: 5,
});

export const Validated = atom<string[]>({
    key: 'Validated',
    default: [],
});