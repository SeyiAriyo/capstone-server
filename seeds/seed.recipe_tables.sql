begin;

truncate
  recipes,
  ingredients,
  ingredient_type,
  recipe_user,
  favorites
  restart identity cascade;

insert into recipe_user (user_name, nickname, password)
values
  ('user1', 'user1', '$2a$10$6CulGUuKcN5UqENKc2t6eOoE3.ssfIbOf6FAk1pTV3M25M43498oy'),
  ('dunder', 'Mr. Mifflin', '$2a$10$ABvyr5cFtOpsxp7ZAaQDLOLsqBwdpz.woWKMriY1iZIvCFgOa8tNe'),
  ('f.bar', 'Foo', '$2a$10$q3V1xT0aWm1S7MxsPCo8mewHw79bB/q/aUC.2N5UhHMfd9ZBHccQa');

  insert into ingredient_type (ingredient_cat)
  values
    ('Vegan'),
    ('Vegetarian'),
    ('Omnivorous');
    

insert into ingredients (ingredient_name, ingredient_id, user_id)
values
  ('eggs', 3, 1),
  ('bacon', 3, 1),
  ('celery', 1, 2),
  ('water', 1, 2),
  ('beef', 3, 3),
  ('honey', 2, 3),
  ('chicken', 3, 2),
  ('onion', 1, 1);

insert into recipes (recipe_name, recipe_img, recipe_ingredients, recipe_prep, ingredient_id, tags)
values
  ('Honey Mustard Potato Salad', '', '2 lbs. small red potatoes cut in half,4 slices of bacon,2 tbsp red wine vinegar,1 tsp Dijon mustard,2 tsp honey,2 cloves garlic minced,1/2 teaspoon sea salt,1/4 teaspoon fresh ground pepper,1/3 cup olive oil,1/4 cup fresh Italian parsley torn',
 'Preheat oven to 375 degrees. Lay bacon on cookie sheet and bake for 7 minutes. Flip and bake for another 7 minutes or until crispy. Move bacon to paper towels. Using same cookie sheet with bacon grease on it. Lay potatoes cut side down. Bake for 15 minutes. Flip and bake for another 15 minutes. Combine vinegar, Dijon mustard, honey, garlic, salt and pepper. Whisk in olive oil slowly to combine. Coarsely chop bacon. Gently toss potatoes with bacon, dressing and parsley.',
  3, null),

  ('Ham and potato soup', '', '3 1/2 cups peeled and diced potatoes,1/3 cup diced celery,1/3 cup finely chopped onion,3/4 cup diced cooked ham,3 1/4 cups water,2 tablespoons chicken bouillon granules,1/2 teaspoon salt to taste,1 teaspoon ground white or black pepper to taste,5 tablespoons butter,5 tablespoons all-purpose flour, 2 cups milk',
  'Combine the potatoes, celery, onion, ham and water in a stockpot. Bring to a boil, then cook over medium heat until potatoes are tender, about 10 to 15 minutes. Stir in the chicken bouillon, salt and pepper. In a separate saucepan, melt butter over medium-low heat. Whisk in flour with a fork, and cook, stirring constantly until thick, about 1 minute. Slowly stir in milk as not to allow lumps to form until all of the milk has been added. Continue stirring over medium-low heat until thick, 4 to 5 minutes. Stir the milk mixture into the stockpot, and cook soup until heated through. Serve immediately.',
    3, null),

  ('Buckwheat and Beef Pilaf', '', '1/3 cup olive oil,8 Tbsp unsalted butter,1 large onion diced,1 to 1 1/4 lbs beef trimmed of extra fat and cut into 1/2″ to 3/4″ thick pieces,3 large carrots julienned,2.5 cups buckwheat groats (aka grechka),4 1/4 cups cold filtered water + 1 cup hot water,2 tsp salt and 1/4 tsp black pepper ,1 tsp cumin spice to taste,1 full head of unpeeled garlic',
  'Set a large heavy-bottomed stock pot or dutch oven (ours is 5 1/2 Qt) over medium/high heat and add 1/3 cup olive oil and 4 Tbsp butter. Add onion and sauté, stirring occasionally until softened (about 5 min). Add cubed beef and sauté 5 min, turning once (beef will not be fully cooked). Add julienned (click here to see the handy slicer we use) carrots and stir another minute.Add 4 1/4 cups cold water and season with 1 tsp cumin, 2 tsp salt and 1/4 tsp pepper or to taste. Bring to a boil then reduce heat to a low simmer, cover and cook 1 hour (you should hear the faint simmer when your lid is on). Meanwhile (about 10 min before your timer is up), heat a large non-stick skillet over medium/high heat and melt in 4 Tbsp butter. Add 2 1/2 cups buckwheat and toast until golden, stirring often (3-5 min). Pour buckwheat into the pot in an even layer and gently pour enough hot water to cover buckwheat 1/2″ above the level of the buckwheat (I added 1 cup hot water). Cut (using a sharp knife) garlic head in half and place over the top of buckwheat, cut-side-down, pushing down into the buckwheat slightly. Cook uncovered over medium heat until most of the liquid boils out (10 min). Poke 8-10 holes through the buckwheat to allow steam to escape to the surface, then cover with lid, reduce heat to the lowest setting and let pot sit another 30 minutes. Remove garlic and stir everything gently to combine. P.S. The garlic cloves are perfectly edible – you can squeeze them easily out of their skins and serve them in the pilaf if you wish.',
    3, null),

  ('Honey Lime Chicken Thighs', '', '4 tablespoons lime juice freshly squeezed,2 tablespoons honey,1 tablespoon soy sauce,7 chicken thighs,1/2 teaspoon salt,2 tablespoon olive oil,2 green onions chopped,1 lime sliced (for garnish only)',
  'In a small bowl combine lime juice, honey, soy sauce. Salt the chicken thighs with 1/2 teaspoon of salt (or more) thoroughly, all over, including under the skin. In 12-inch skillet, heat olive oil over medium-high heat. Add chicken thighs, skin side down, and cook for about 5 minutes until the chicken skin side gets nicely browned (make sure to get really nice brown, not just pale brown - it makes a difference in presentation). Turn chicken, so that skins sides are up and add lime-honey mixture to the skillet. Reduce heat to low; cover and cook 14 to 18 minutes longer or until done (chicken should register 180 degrees F on instant thermometer). While cooking, covered, chicken thighs will release their own juices, as well. Transfer chicken to plates. Drizzle chicken with pan juices. Top with chopped green onions and serve with lime slices.',
    3, null),

  ('Lemon Garlic Orzo With Asparagus', '', '1 lb. asparagus,1 cup orzo pasta (uncooked),1 large lemon (& optional zest),1-2 cloves garlic (I like 2),1-2 green onions,3 Tbsp. fresh parsley (more to taste),Salt/pepper to taste',
    'Cook orzo: in a medium saucepan, bring 2 cups water to a boil. (You can opt for vegetable broth to add more flavor.) Add orzo, stir well, then reduce heat and simmer for about 10 minutes or until tender. Drain. Meanwhile, make the dressing: mince garlic and juice 1 large lemon, yielding about 1/4 cup lemon juice. (Zest a bit of lemon peel first if desired – I use a microplane grater/zester.) Place lemon juice and garlic in a small bowl, and set aside. Prepare asparagus: trim off woody ends, rinse, and cook as desired until just tender.* (See notes below for cooking options.) When cooked, cut asparagus into 1-inch pieces. Roughly chop parsley, stems removed. Slice green onions. In a medium bowl, add all ingredients and pour lemon-garlic dressing on top. Toss to combine and salt/pepper to taste if desired.',
    1, null),

  ('French Lentil Stew', '', '1/2 cup raw cashews or 1/4 cup plus 2 tablespoons (90 mL) raw sunflower seeds (125 mL),2 cups water (500 mL),2 tablespoons extra-virgin olive oil use broth for oil free (30 mL),1 large yellow or sweet onion diced, or 2 leeks cleaned and thinly sliced (about 2 cups/500 mL),4 large cloves garlic minced (2 tablespoons/ 30 mL minced),1 to 1 1/2 teaspoons fine sea salt plus a couple pinches (5 to 7 mL),2 medium carrots diced (1 heaping cup/275 mL),2 stalks celery diced (3/4 cup/175 mL),2 teaspoons ground cumin,1 1/2 teaspoons dried thyme (7 mL),1 teaspoon ground turmeric (5 mL),1 can of diced tomatoes, with juices (14-ounce/398 mL),3/4 cup uncooked French green lentils picked over and rinsed (175 mL),4 cups veggie broth,3 cups stemmed and chopped Swiss chard or kale leaves (750 mL),Freshly ground black pepper,1 to 2 teaspoons white wine vinegar',
    'Put the cashews in a bowl and cover with a couple of inches of water. Soak for 1 to 2 hours or overnight. (For a quick-soak method, cover with boiling water and soak for 30 to 60 minutes.) Drain and rinse. Transfer the cashews to a high-speed blender along with 1/2 cup (125 mL) of the water. Blend on high until super smooth and creamy in texture. Set the cashew cream aside. In a large Dutch oven, heat the oil (or use broth for oil free) over medium heat. Stir in the onion, garlic, and a couple pinches of salt, and sauté until the onion is softened, 4 to 6 minutes. Stir in the carrots and celery, and cook for another few minutes or so. Stir in the cumin, thyme, and turmeric until combined. Add the diced tomatoes with their juices, lentils, broth, and remaining water. Increase the heat to high and bring to a low boil. Reduce the heat to medium and simmer, uncovered, for 30 to 35 minutes, until the lentils are tender. Stir in the cashew cream and chard. Add salt, pepper, and vinegar to taste. (The vinegar’s role is to add a little bit of brightness to the soup; add a bit at a time and keep tasting, as it can quickly overwhelm.) Cook for a couple of minutes over low-medium heat, until the chard is wilted, and then serve. This stew will keep in an airtight container in the fridge for up to 5 days, or you can freeze it for 1 to 2 months (always let it cool completely before storing). The stew will thicken after sitting in the fridge; you can thin it out with a bit of broth when you reheat it, if desired, or simply serve it thick with some crusty bread.',
    1, null),

  ('Balsamic Dijon Roasted Root Vegetables', '', '2 c. sweet potatoes cubed into 1" pieces,2 c. baby carrots,1 large red onion chopped,1 Tbsp. olive oil,2 Tbsp. balsamic vinegar,2 tsp. honey,1 Tbsp. dijon mustard,1/4 tsp. salt',
  'Preheat oven to 400°. In a large bowl, whisk together the oil, balsamic, honey, dijon and salt. Toss with the chopped vegetables and arrange on a baking sheet. Bake at 400° for 40-50 minutes. Serve immediately.',
    1, null),

  ('Crunchy Thai Peanut & Quinoa Salad', '', 'Salad,3/4 cup uncooked quinoa or millet,1 1/2 cups water,2 cups shredded purple cabbage,1 cup grated carrot,1 cup thinly sliced snow peas or sugar snap peas,1/2 cup chopped cilantro,1/4 cup thinly sliced green onion,1/4 cup chopped roasted and salted peanuts for garnish,Peanut sauce,1/4 cup smooth peanut butter,3 tablespoons reduced-sodium tamari or soy sauce,1 tablespoon maple syrup or honey,1 tablespoon rice vinegar,1 teaspoon toasted sesame oil,1 teaspoon grated fresh ginger (I love ginger so I used 2 teaspoons),1/2 lime, juiced (about 1 ½ tablespoons),Pinch of red pepper flakes',
    'Cook the quinoa: First, rinse the quinoa in a fine mesh colander under running water. In a medium-sized pot, combine the rinsed quinoa and 1 1/2 cups water. Bring the mixture to a gentle boil over medium heat, then reduce the heat to medium-low and gently simmer the quinoa until it has absorbed all of the water. Remove the quinoa from heat, cover the pot and let it rest for 5 minutes. Uncover the pot and fluff the quinoa with a fork. Set it aside to cool. (Here’s how to cook millet.) Meanwhile, make the peanut sauce: Whisk together the peanut butter and tamari until smooth (if this is difficult, microwave the mixture for up to 30 seconds to loosen it up). Add the remaining ingredients and whisk until smooth. If the mixture seems too thick to toss into the salad, whisk in a bit of water to loosen it up (I didn’t need to do this). In a large serving bowl, combine the cooked quinoa, shredded cabbage, carrot, snow peas, cilantro and green onion. Toss to combine, then pour in the peanut sauce. Toss again until everything it lightly coated in sauce. Taste, and if it doesn’t taste quite amazing yet, add a pinch of salt and toss again. Divide into individual bowls and garnish with peanuts. This salad keeps well, covered and refrigerated, for about 4 days. If you don’t want your chopped peanuts to get soggy, store them separately from the rest and garnish just before serving.',
    1, null),

  ('Spinach and Mushroom Fettuccine Alfredo', '', '10 ounces dried porcini mushrooms,10 ounces dried chanterelle mushrooms,1 1/2 cups nondairy milk,1/2 pound fettuccine,7 ounces silken tofu,1/4 cup nutritional yeast flakes,1/8 cup vegan parmesan,2-3 tablespoons vegan butter,salt and pepper, to taste,2 cloves garlic minced,1 cup spinach chiffonade cut,1/4 cup basil chopped,1/4 cup parsley, chopped',
  'Soak the mushrooms in the milk for 30 minutes. Strain the mushrooms and reserve the milk. Slice the mushrooms thinly. Cook the pasta according to package directions, until slightly underdone, and drain. Reserve 1/2 cup pasta water. In a food processor, blend the tofu, reserved milk, nutritional yeast flakes, and parmesan. In a medium pan on medium heat, melt butter with salt. Saute mushrooms and garlic until tender. Add the spinach and basil to the pan until they are wilted. Next, add the tofu mixture, parsley, and pasta water to the pan. Cook low until it starts to thicken. Toss with fettuccine noodles. Serve with cheezy garlic bread.',
    2, null),

  ('Steak and Stout Pie', '', '2 tablespoons olive oil,1 onion, chopped,2 cloves garlic minced,2 cups cremini mushrooms sliced,1 pound seitan chunks,1/4 cup flour + 2 tablespoons flour divided,salt and pepper,1-1/2 cups potatoes diced,1/2 cup carrots chopped,thyme and rosemary,1 tablespoon vegan worcestershire sauce,1 (12-ounce) bottle Stout beer,2 pie shells,1 cup vegetable broth,nondairy milk',
  'Heat olive oil in 2-quart saucepan. Add onion and cook until almost translucent. Add garlic and mushrooms. Dust seitan with 1/4 cup flour and add to pan. Season with salt and pepper and cook for 5 minutes. Add potatoes, carrots, thyme, rosemary, worcestershire sauce, and beer. Cover, lower heat, and simmer for 15 minutes. Preheat oven to 400 degrees Fahrenheit. Bake one pie crust for 10 minutes. Remove from oven. In a bowl, mix vegetable broth with 2 tablespoons of flour. Add broth to vegetables. Cook for 1 to 2 minutes. Pour mixture into precooked bottom crust. Place top crust over and trim, seal, and vent. Brush with nondairy milk. Bake for 30 to 40 minutes until golden brown. Enjoy!',
    2, null),

  ('Smoky Baked Veggie Kabobs', '', 'Marinade:,1/4 cup olive oil,1/4 cup white cooking wine,2 tablespoons Bragg liquid aminos (or soy sauce),1/2 teaspoon liquid smoke,1 1/2 teaspoons dried dill weed,2 large cloves garlic minced,Vegetables:,1 medium red bell pepper chopped,1 medium yellow bell pepper chopped,1 medium yellow summer squash chopped,1 medium zucchini chopped,1/4-1/2 medium red onion chopped  (use sparingly as they can be strong),1 (8 ounce) package sliced button mushrooms,1 (14 ounce) package extra firm tofu drained pressed and chopped,salt and pepper',
  'In a large bowl, combine marinade ingredients, stirring until combined. Add all vegetables and tofu to the bowl with marinade and carefully stir to coat. Cover and place in the refrigerator, allowing to marinate 8 hours, or overnight. Preheat oven to broil. Thread the marinated vegetables onto metal skewers. Place skewers on a jellyroll pan and bake for 15-20 minutes, or until vegetables are cooked through and begin to blacken on the edges. Remove from oven and allow to cool before serving. Season to taste with salt and pepper.',
    2, null),

  ('Orange-Spiced Baklava', '', 'Sauce of Bliss:,1/2 cup water,1/2 cup agave nectar,1/4 cup organic white sugar,2 whole cinnamon sticks,3 whole cardamom pods,3 whole cloves,1/2 teaspoon vanilla extract,1/2 teaspoon minced orange zest,1/2 teaspoon fresh lemon juice,1/16 teaspoon sea salt,Filling:,1/2 cup (2 1/4 ounces) walnuts,1 teaspoon ground cinnamon,1 tablespoon organic sugar,1/8 teaspoon sea salt,Phyllo:,1/2 pound phyllo dough thawed,6-8 tablespoons non-hydrogenated margarine',
  'Place all of the sauce ingredients in a small pan, stir well, and bring to a boil over medium heat. Reduce the heat to low and simmer gently (uncovered) for 15 minutes, stirring occasionally. Set aside. Once cooled, remove the cinnamon sticks, cardamom pods, and cloves. To prepare the filling, chop the walnuts in a food processor until very coarsely ground. Alternatively, you can place them in a sealed plastic bag and smoosh them with a rolling pin or mallet. Mix with the cinnamon, sugar, and salt and set aside. Preheat the oven to 350° F. Melt the margarine. Divide the phyllo into 2 portions. Set 1 of the portions aside, covered with a lightly damp towel. Using a pastry brush, coat the bottom and sides of a 9x9" pan with some of the melted margarine. Place 1 sheet phyllo (from the uncovered stack) on the bottom of the pan and brush it lightly with margarine. If your phyllo doesn’t fit the size of the pan, simply cut it or overlap it a bit; you can even things out as you go. Continue layering 1 piece phyllo at a time, brushing each piece lightly with margarine, until you have used up the first portion of the phyllo. Top evenly with the nut mixture. Uncover the second portion of the phyllo and use it up in the same manner as you did before. Keep placing single layers of phyllo on top of each other, brushing each lightly with margarine. When you’ve used up the last of the phyllo, bring on the knife. You’re about to cut the phyllo into individual pieces, very carefully. Begin by cutting diagonal lines (with a 1 1/2" space in between each cut) across the whole pan. If it helps, you can hold onto the top layer of phyllo with your other hand as you make your cuts all the way through to the bottom of the pan. Next, make cuts (again with a 1 1/2" space in between) that are horizontal across the pan. Short story long, you want diamond-shaped baklava. Next, pour about 1/2 the sauce evenly over the top of the phyllo. Bake for about 20-30 minutes, or until very nicely golden browned. Once the phyllo just starts to brown (after about 15 minutes), you will want to check it often, as it can burn easily. Remove from the oven. Pour the remaining sauce evenly over the top of the baklava. This may seem like a lot of sauce, but the longer the baklava sits, the less saucy and sweet it becomes. Enjoy.',
    2, null);

  insert into favorites (recipe_id, user_id)
  values
  (3, 1),
  (1, 2),
  (1, 1),
  (4, 3);

  commit;