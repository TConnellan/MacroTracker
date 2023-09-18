


DROP TABLE IF EXISTS user_profile CASCADE;

CREATE TABLE IF NOT EXISTS user_profile (
   id INTEGER               PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR(20)     UNIQUE NOT NULL,
   salt CHAR(32)            NOT NULL,
   password_hash BYTEA      ,
   created_at TIMESTAMP     ,
   avatar INTEGER            
);



DROP TABLE IF EXISTS consumable CASCADE;
CREATE TABLE IF NOT EXISTS consumable (
   id INTEGER               PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   cons_name VARCHAR(50)    ,
   brand_name VARCHAR(50)   ,
   size DOUBLE PRECISION    ,
   units VARCHAR(10)        ,
   carbs DOUBLE PRECISION   ,
   fats DOUBLE PRECISION    ,
   proteins DOUBLE PRECISION
);

DROP TABLE IF EXISTS recipe CASCADE;

CREATE TABLE IF NOT EXISTS recipe (
   id INTEGER               PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   recipe_name VARCHAR(50)  ,
   creator_id INTEGER       ,
   created_at TIMESTAMP     ,
   last_edited_at TIMESTAMP ,
   notes TEXT
);

DROP TABLE IF EXISTS recipe_component CASCADE;

CREATE TABLE IF NOT EXISTS recipe_component (
   id INTEGER               PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   recipe_id INTEGER        NOT NULL,
   component_id INTEGER     NOT NULL,
   quantity DOUBLE PRECISION,   
   step_no INTEGER          ,
   step_description TEXT    
);

DROP TABLE IF EXISTS consumed CASCADE;

CREATE TABLE IF NOT EXISTS consumed (
   id INTEGER               PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   user_id INTEGER          NOT NULL,
   recipe_id INTEGER        ,
   quantity DOUBLE PRECISION,
   carbs DOUBLE PRECISION   ,
   fats DOUBLE PRECISION    ,
   proteins DOUBLE PRECISION,
   consumed_at TIMESTAMP    ,
   created_at TIMESTAMP     ,
   last_edited_at TIMESTAMP ,
   notes TEXT
);

DROP TABLE IF EXISTS favourite CASCADE;

CREATE TABLE IF NOT EXISTS favourite (
   id INTEGER               PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   user_id INTEGER          NOT NULL,
   recipe_id INTEGER        NOT NULL
);

ALTER TABLE recipe ADD CONSTRAINT fk_creator FOREIGN KEY (creator_id) REFERENCES user_profile(id);

ALTER TABLE recipe_component ADD CONSTRAINT fk_recipe FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE RESTRICT;
ALTER TABLE recipe_component ADD CONSTRAINT fk_component FOREIGN KEY (component_id) REFERENCES consumable(id) ON DELETE RESTRICT;

ALTER TABLE consumed ADD CONSTRAINT fk_consumer FOREIGN KEY (user_id) REFERENCES user_profile(id) ON DELETE CASCADE;
ALTER TABLE consumed ADD CONSTRAINT fk_recipe_consumed FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE SET NULL;

ALTER TABLE favourite ADD CONSTRAINT fk_user_fav FOREIGN KEY (user_id) REFERENCES user_profile(id) ON DELETE CASCADE;
ALTER TABLE favourite ADD CONSTRAINT fk_recipe_fav FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE;




CREATE INDEX idx_username ON user_profile (username);





