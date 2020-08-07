const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user1',
      password: 'testPassword1',
      nickname: 'TU1',
    },
    {
      id: 2,
      user_name: 'test-user2',
      password: 'testPassword2',
      nickname: 'TU2',
    },
    {
      id: 3,
      user_name: 'test-user3',
      password: 'testPassword3',
      nickname: 'TU3',
    },
  ];
}

function makeIngredientsArray(users, ingredientType) {
  return [
    {
      id: 1,
      ingredient_name: 'Test Ingredient 1',
      ingredient_id: ingredientType[2].id,
      user_id: users[0].id,
    },
    {
      id: 2,
      ingredient_name: 'Test Ingredient 2',
      ingredient_id: ingredientType[2].id,
      user_id: users[0].id,
    },
    {
      id: 3,
      ingredient_name: 'Test Ingredient 3',
      ingredient_id: ingredientType[0].id,
      user_id: users[1].id,
    },
    {
      id: 4,
      ingredient_name: 'Test Ingredient 4',
      ingredient_id: ingredientType[1].id,
      user_id: users[1].id,
    },
    {
      id: 5,
      ingredient_name: 'Test Ingredient 5',
      ingredient_id: ingredientType[0].id,
      user_id: users[2].id,
    },
  ];
}

function makeIngredientTypeArray() {
  return [
    {
      id: 1,
      ingredient_cat: 'firstIngredient',
    },
    {
      id: 2,
      ingredient_cat: 'secondIngredient',
    },
    {
      id: 3,
      ingredient_cat: 'thirdIngredient',
    },
  ];
}

function makeFavoritesArray(users, recipes) {
  return [
    {
      id: 1,
      recipe_id: recipes[0].id,
      user_id: users[0].id,
    },
    {
      id: 2,
      recipe_id: recipes[1].id,
      user_id: users[0].id,
    },
    {
      id: 3,
      recipe_id: recipes[2].id,
      user_id: users[2].id,
    },
    {
      id: 4,
      recipe_id: recipes[1].id,
      user_id: users[1].id,
    },
  ];
}

function makeRecipesArray(ingredientType) {
  return [
    {
      id: 1,
      recipe_name: 'First Test Recipe',
      recipe_img: 'img',
      recipe_ingredients: 'test ingredient1,test ingredient2',
      recipe_prep: 'make the test, test it',
      ingredient_id: ingredientType[2].id,
      tags: null,
    },
    {
      id: 2,
      recipe_name: 'Second Test Recipe',
      recipe_img: 'img',
      recipe_ingredients: 'test ingredient1,test ingredient2',
      recipe_prep: 'make the test, test it',
      ingredient_id: ingredientType[0].id,
      tags: null,
    },
    {
      id: 3,
      recipe_name: 'Third Test Recipe',
      recipe_img: 'img',
      recipe_ingredients: 'test ingredient1,test ingredient2',
      recipe_prep: 'make the test, test it',
      ingredient_id: ingredientType[1].id,
      tags: null,
    },
  ];
}

function makeFixtures() {
  const testUsers = makeUsersArray();
  const testIngredientType = makeIngredientTypeArray();
  const testIngredients = makeIngredientsArray(testUsers, testIngredientType);
  const testRecipes = makeRecipesArray(testIngredientType);
  const testFavorites = makeFavoritesArray(testUsers, testRecipes);

  return { testUsers, testIngredientType, testIngredients, testRecipes, testFavorites };
}

function makeExpectedRecipes(ingredient_type, recipes) {
  const ingredient_cat = ingredient_type.find((type) => type.id === recipes.ingredient_id);

  return {
    id: recipes.id,
    recipe_name: recipes.recipe_name,
    recipe_img: recipes.recipe_img,
    recipe_ingredients: recipes.recipe_ingredients,
    recipe_prep: recipes.recipe_prep,
    ingredient_cat: ingredient_cat.ingredient_cat,
  };
}

function makeExpectedIngredients(ingredient, ingredient_type) {
  const ingredient_cat = ingredient_type.find((type) => type.id === ingredient.ingredient_id);

  return {
    id: ingredient.id,
    ingredient_name: ingredient.ingredient_name,
    ingredient_cat: ingredient_cat.ingredient_cat,
    user_id: ingredient.user_id,
    ingredient_id: ingredient.ingredient_id,
  };
}

function makeExpectedFavorites(favorite, recipes) {
  const recipe = recipes.find((r) => r.id === favorite.recipe_id);
  const recipeName = recipe.recipe_name;
  const ingredient_id = recipe.ingredient_id;
  return {
    favorite_id: favorite.id,
    id: favorite.recipe_id,
    user_id: favorite.user_id,
    recipe_name: recipeName,
    ingredient_id,
  };
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      recipes,
      ingredients,
      ingredient_type,
      recipe_user,
      favorites
      restart identity cascade`
  );
}

function seedUsersTable(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db
    .into('recipe_user')
    .insert(preppedUsers)
    .then(() =>
      db.raw(`SELECT setval('recipe_user_id_seq', ?)`, [
        users[users.length - 1].id,
      ])
    );
}

function seedOtherTables(db, recipes, ingredients, ingredientType, users, favorites) {
  return db.transaction(async (trx) => {
    await seedUsersTable(trx, users);
    await trx.into('ingredient_type').insert(ingredientType);
    await trx.raw(`SELECT setval('ingredient_type_id_seq', ?)`, [
      ingredientType[ingredientType.length - 1].id,
    ]);
    await trx.into('ingredients').insert(ingredients);
    await trx.raw(`SELECT setval('ingredients_id_seq', ?)`, [
      ingredients[ingredients.length - 1].id,
    ]);
    await trx.into('recipes').insert(recipes);
    await trx.raw(`SELECT setval('recipes_id_seq', ?)`, [
      recipes[recipes.length - 1].id,
    ]);
    await trx.into('favorites').insert(favorites);
    await trx.raw(`SELECT setval('favorites_id_seq', ?)`, [
      favorites[favorites.length - 1].id,
    ]);
  });
}

function seedMaliciousSpiirt(db, users, ingredient) {
  return seedUsersTable(db, users).then(() =>
    db.into('ingredients').insert(ingredient)
  );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  });
  return `bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeIngredientsArray,
  makeIngredientTypeArray,
  makeRecipesArray,
  makeFavoritesArray,
  makeAuthHeader,
  makeFixtures,
  makeExpectedRecipes,
  makeExpectedIngredients,
  makeExpectedFavorites,

  cleanTables,
  seedUsersTable,
  seedOtherTables,
  seedMaliciousSpiirt,
};
