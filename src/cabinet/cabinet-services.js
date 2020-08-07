const xss = require('xss')

const CabinetService = {
  getAllIngredientsInCabinet(db, id) {
    return db
      .select(
        'ingredients.id',
        'ingredients.ingredient_name',
        'ingredients.user_id',
        'ingredients.ingredient_id',
        'ingredient_type.ingredient_cat'
      )
      .from('ingredients')
      .join(
        'ingredient_type',
        'ingredients.ingredient_id',
        'ingredient_type.id'
        )
      .where('user_id', id)
  },

  addIngredient(db, newIngredient) {
    return db
      .insert(newIngredient)
      .into('ingredients')
      .returning('*')
      .then(([ingredient]) => ingredient)
  },

  deleteIngredient(db, ingredient_id) {
    return db('ingredients')
      .where('id', ingredient_id)
      .delete()
  },

  serializeIngredient(ingredient) {
    return {
      id: ingredient.id,
      ingredient_name: xss(ingredient.ingredient_name),
      ingredient_id: ingredient.ingredient_id,
      ingredient_img: ingredient.ingredient_img || null,
      user_id: ingredient.user_id
    }
  }
}

module.exports = CabinetService