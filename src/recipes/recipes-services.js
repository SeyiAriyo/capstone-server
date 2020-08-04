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
          'recipeType.recipeType_cat')
        .from('recipes')
        .join(
          'recipeType',
          'recipes.recipeType_id',
          'recipeType.id'
        )
    },
  
    getRecipeByRecipeType(db, type) {
      return db
        .select(
          'recipes.id',
          'recipes.recipe_name',
          'recipes.recipe_img',
          'recipes.recipe_ingredients',
          'recipes.recipe_prep',
          'recipeType.recipeType_cat')
        .from('recipes')
        .join(
          'recipeType',
          'recipes.recipeType_id',
          'recipeType.id'
        )
        .where('recipeType_cat', type)
    },
  
    getRecipeByName(db, name) {
      return db
        .select(
          'recipes.id',
          'recipes.recipe_name',
          'recipes.recipe_img',
          'recipes.recipe_ingredients',
          'recipes.recipe_prep',
          'recipeType.recipeType_cat'
          )
        .from('recipes')
        .join(
          'recipeType',
          'recipes.recipeType_id',
          'recipeType.id'
        )
        .where(
          db.raw(
            `LOWER(recipe_name) LIKE LOWER('%${name}%')`
          )
        )
    },
  
    getRecipeByRecipeTypeAndName(db, name, type) {
      return db
        .select(
          'recipes.id',
          'recipes.recipe_name',
          'recipes.recipe_img',
          'recipes.recipe_ingredients',
          'recipes.recipe_prep',
          'recipeType.recipeType_cat')
        .from('recipes')
        .join(
          'recipeType',
          'recipes.recipeType_id',
          'recipeType.id'
        )
        .where(
          db.raw(`recipeType_cat = '${type}'
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