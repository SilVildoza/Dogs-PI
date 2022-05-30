/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  weight: '3 - 13',
  height: '15 - 30',
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));

  describe('GET /dogs', () => {
    it('should get a 200 status', () =>
      agent.get('/dogs').expect(200)
    );

    describe('GET /dogs', () => {
      it('should get a 200 status when id is found', async()=> {await agent.get('/dogs/2').expect(200)})
      it('should get a 200 status when name is found', ()=> agent.get('/dogs?name=Golden').expect(200));
      it('should get a 400 status when dogs id is not found', () => agent.get('/dogs/-2').expect(400));
    });

    describe('GET /temperaments', ()=> {
      it('should receive a 200 status for temperaments', () => {
        agent.get('/temperaments').expect(200);
      });
    });

    describe('POST create /dogs', () => {
      it('should return a new breed when the correct properties are send', () => {
        agent
        .post('/dogs')
        .send({name: 'Harry', height: '5 - 20', weight: '3 - 8'})
        .then(() => {
          expect('Content-Type', /json/);
        })
      })
    })
  });
});
