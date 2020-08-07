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
  }
}

module.exports = RecipesService