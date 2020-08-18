//const xss = require('xss')

const RecipesService = {
  getAllRecipes(db) {
    return db
      .select(
        'recipes.id',
        'recipes.recipe_name',
        'recipes.recipe_img',
        'recipes.recipe_ingredients',
        'recipes.recipe_prep',
        'ingredient_type.ingredient_cat')
      .from('recipes')
      .join(
        'ingredient_type',
        'recipes.ingredient_id',
        'ingredient_type.id'
      )
  },

  getRecipeByIngredient(db, type) {
    return db
      .select(
        'recipes.id',
        'recipes.recipe_name',
        'recipes.recipe_img',
        'recipes.recipe_ingredients',
        'recipes.recipe_prep',
        'ingredient_type.ingredient_cat')
      .from('recipes')
      .join(
        'ingredient_type',
        'recipes.ingredient_id',
        'ingredient_type.id'
      )
      .where('ingredient_cat', type)
  },

  getRecipeByName(db, name) {
    return db
      .select(
        'recipes.id',
        'recipes.recipe_name',
        'recipes.recipe_img',
        'recipes.recipe_ingredients',
        'recipes.recipe_prep',
        'ingredient_type.ingredient_cat'
        )
      .from('recipes')
      .join(
        'ingredient_type',
        'recipes.ingredient_id',
        'ingredient_type.id'
      )
      .where(
        db.raw(
          `LOWER(recipe_name) LIKE LOWER('%${name}%')`
        )
      )
  },

  getRecipeByIngredientAndName(db, name, type) {
    return db
      .select(
        'recipes.id',
        'recipes.recipe_name',
        'recipes.recipe_img',
        'recipes.recipe_ingredients',
        'recipes.recipe_prep',
        'ingredient_type.ingredient_cat')
      .from('recipes')
      .join(
        'ingredient_type',
        'recipes.ingredient_id',
        'ingredient_type.id'
      )
      .where(
        db.raw(`ingredient_cat = '${type}'
      and LOWER(recipe_name) like LOWER('%${name}%')`)
      )

  },

  getById(db, id) {
    return db
      .select('*')
      .from('recipes')
      .where('id', id)
      .first()
  },
  getUserRceipeById(db, user_id, id) {
    return db
      .select("*")
      .from("user_recipes")
      .where(
        db.raw(`user_recipes.user_id=${user_id}
      and user_recipes.id=${id}`)
      )
      .first();
  },

  postNewRecipe(db, newRecipe) {
    return db
      .insert(newRecipe)
      .into("user_recipes")
      .returning("*")
      .then(([recipe]) => recipe);
  },

  deleteUserRecipe(db, user_id, id) {
    return db("user_recipes")
      .where(
        db.raw(`user_id=${user_id}
        and id=${id}`)
      )
      .delete();
  },

  getUsermadeRecipesByUserId(db, user_id) {
    return db
      .select(
        "user_recipes.id",
        "user_recipes.recipe_name",
        "user_recipes.recipe_img",
        "user_recipes.recipe_ingredients",
        "recipe_prep",
        "ingredient_type.ingredient_cat"
      )
      .from("user_recipes")
      .join("ingredient_type", "user_recipes.ingredient_id", "ingredient_type.id")
      .where({ user_id });
  },
}

module.exports = RecipesService