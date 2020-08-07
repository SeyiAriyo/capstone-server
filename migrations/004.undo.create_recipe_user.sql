alter table ingredients
  drop column if exists user_id;

drop table if exists recipe_user;