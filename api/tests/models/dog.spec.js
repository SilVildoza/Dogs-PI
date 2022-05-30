const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('New Dog', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });

      it('should throw an error if weight is null', (done) => {
        Dog.create({
          name:'Harry',
          height: '5 - 20',
          weight: null,
        })
        .then(() => data(new Error('Requires a valid property (weight).')))
        .catch(() => done());
      });
      it('should work when it is a valid weight', () => {
        Dog.create({
          weight: '3 - 8'
        });
      });
      it('should throw an error if height is null', (done) => {
        Dog.create({
          name: 'Harry',
          weight: '3 - 8',
          height: null,
        })
        .then(() => data(new Error('Requires a valid property (height).')))
        .catch(() => done());
      });
      it('should work when it is a valid height', () => {
        Dog.create({
          height: '5 - 20'
        });
      });
    });
  });
});
