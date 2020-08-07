const express = require('express')
const CabinetService = require('./cabinet-services')
const { requireAuth } = require('../middleware/jwt-auth')
const ingredientsRouter = express.Router()
const bodyParser = express.json()

ingredientsRouter
  .route('/:user_id')
  .all(requireAuth)
  .get((req, res, next)=>{
    const { user_id } = req.params
    CabinetService.getAllIngredientsInCabinet(req.app.get('db'), user_id)
    .then(ingredients => {
      res
        .status(200)
        .json(ingredients)
    })
    .catch(next)
  })
  .post(bodyParser, (req, res, next)=>{
    const { user_id, ingredient_name, ingredient_id } = req.body
    const newIngredient = { ingredient_name, ingredient_id, user_id }

    if(ingredient_name == null)
      return res.status(400).json({ error: `Missing 'Ingredient Name' in request body`})
    
    CabinetService.addIngredient(
      req.app.get('db'),
      newIngredient
    )
      .then(ingredient => {
        res
          .status(201)
          .json(CabinetService.serializeIngredient(ingredient))
      })
      .catch(next)
  })
  .delete(bodyParser, (req, res, next) => {
    //const { user_id } = req.params
    const { id } = req.body

    CabinetService.deleteIngredient(
      req.app.get('db'),
      id
    )
      .then(()=>{
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = ingredientsRouter