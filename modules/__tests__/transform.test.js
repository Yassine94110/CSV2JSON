const { transform } = require("../index");

const data = [
    {
        nom: 'cadoret',
        prenom: 'gael',
        age: '29',
        skills: 'php,javascript,nodejs'
    },
    {
        nom: 'dupond',
        prenom: 'bob',
        age: '42',
        skills: 'nodejs'
    },
    {
        nom: 'coeur de lion',
        prenom: 'richard',
        age: '864',
        skills: 'go,python,php'
    }
];

const expectedResult = [
    { nom: 'cadoret', prenom: 'gael', age: '29', skill: 'php' },
    { nom: 'cadoret', prenom: 'gael', age: '29', skill: 'javascript' },
    { nom: 'cadoret', prenom: 'gael', age: '29', skill: 'nodejs' },
    { nom: 'dupond', prenom: 'bob', age: '42', skill: 'nodejs' },
    { nom: 'coeur de lion', prenom: 'richard', age: '864', skill: 'go' },
    { nom: 'coeur de lion', prenom: 'richard', age: '864', skill: 'python' },
    { nom: 'coeur de lion', prenom: 'richard', age: '864', skill: 'php' },
];


describe("transform", () => {
    it("should transform properly the given object", () => {
        const result = transform(data);
        expect(result).toStrictEqual(expectedResult);
    })
})
