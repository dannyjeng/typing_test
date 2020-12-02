import faker from 'faker';

const generate = (count = 10) => {
    return new Array(count)
        .fill()
        .map(() => faker.random.word())
        .join(' ');
};

export default generate;
