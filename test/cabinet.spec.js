const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Cabinet Endpoints', () => {
  let db;

  const {
    testUsers,
    testIngredients,
    testIngredientType,
    testRecipes,
    testFavorites,
  } = helpers.makeFixtures();
  const testUser = testUsers[0];
  const testIngredient = testIngredientType[0];

  before('make Knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });
  after('disconnect from db', () => db.destroy());
  before('cleanup tables', () => helpers.cleanTables(db));
  afterEach('cleanup tables', () => helpers.cleanTables(db));

  describe('GET /cabinet/:id', () => {
    beforeEach('Insert data', () =>
      helpers.seedOtherTables(
        db,
        testRecipes,
        testIngredients,
        testIngredientType,
        testUsers,
        testFavorites
      )
    );
    it('Responds 200 with ingredients', () => {
      const userId = testUser.id;
      const expectedIngredients = testIngredients.map((s) =>
        helpers.makeExpectedIngredients(s, testIngredientType)
      );
      return supertest(app)
        .get(`/cabinet/${userId}`)
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200, [expectedIngredients[1], expectedIngredients[0]]);
    });
  });
  describe('POST /cabinet/:id', () => {
    beforeEach('Insert data', () =>
      helpers.seedOtherTables(
        db,
        testRecipes,
        testIngredients,
        testIngredientType,
        testUsers,
        testFavorites
      )
    );
    it('Creates a ingredient card, responding 201', () => {
      const newIngredient = {
        ingredient_name: 'new ingredient',
        ingredient_id: 1,
        user_id: testUser.id,
      };
      const user_id = testUser.id;

      return supertest(app)
        .post(`/cabinet/${user_id}`)
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(newIngredient)
        .expect(201)
        .expect((res) => {
          expect(res.body).to.have.property('id');
          expect(res.body.ingredient_name).to.eql(newIngredient.ingredient_name);
          expect(res.body.ingredient_id).to.eql(newIngredient.ingredient_id);
          expect(res.body.user_id).to.eql(newIngredient.user_id);
        });
    });
    it('Responds 400 when Ingredient Name is missing', () => {
      const newIngredient = {
        ingredient_name: null,
        ingredient_id: 1,
        user_id: testUser.id,
      };
      const user_id = testUser.id;

      return supertest(app)
        .post(`/cabinet/${user_id}`)
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(newIngredient)
        .expect(400, { error: `Missing 'Ingredient Name' in request body` });
    });
  });
  describe('DELETE /cabinet/:id', () => {
    beforeEach('Insert data', () =>
      helpers.seedOtherTables(
        db,
        testRecipes,
        testIngredients,
        testIngredientType,
        testUsers,
        testFavorites
      )
    );
    it('Responds 204 when ingredient deleted', () => {
      const user_id = testUser.id;
      const ingredientToBeDeleted = { id: 1 };
      const ingredientList = testIngredients.map((s) =>
        helpers.makeExpectedIngredients(s, testIngredientType)
      );
      const expectedIngredientList = ingredientList.filter(
        (ingredient) => ingredient.id === ingredientToBeDeleted
      );
      return supertest(app)
        .delete(`/cabinet/${user_id}`)
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(ingredientToBeDeleted)
        .expect(204)
        .then((res) => {
          supertest(app)
            .get(`/cabinet/${user_id}`)
            .set('Authorization', helpers.makeAuthHeader(testUser))
            .expect(expectedIngredientList);
        });
    });
  });
});
