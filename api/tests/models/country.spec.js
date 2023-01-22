const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });
    it('should throw an error if id is null', (done) => {
      Country.create({})
        .then(() => done(new Error('It requires a valid id')))
        .catch(() => done());
    }, 10000);
    it('should work when its a valid id', () => {
      Country.create({ id: 'ARG' });
    }, 10000);
    it('should throw an error if flag is null', (done) => {
      Country.create({})
        .then(() => done(new Error('It requires a valid flag')))
        .catch(() => done());
    }, 10000);
    it('should work when its a valid flag', () => {
      Country.create({ flag: 'https://restcountries.eu/data/arg.svg' });
    }
    , 10000);
  });
});

describe('Country routes', () => {
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200));
  });
  it('should get 200', () =>
    agent.get('/countries?name=Argentina').expect(200));
});
