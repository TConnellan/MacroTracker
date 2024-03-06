CREATE OR REPLACE PROCEDURE create_new_recipe(_recipe_name VARCHAR(50), _creator_id INT, _notes TEXT, _components JSONB)
LANGUAGE plpgsql
AS $$
    DECLARE
        _recipe_id INTEGER;
    BEGIN
        INSERT INTO recipe (recipe_name, creator_id, last_edited_at, notes) 
        VALUES (_recipe_name, _creator_id, current_timestamp, _notes)
        RETURNING id INTO _recipe_id;

        INSERT INTO recipe_component (recipe_id, component_id, quantity, step_no, step_description)
        SELECT _recipe_id, (_component->>'id')::INTEGER, (_component->>'quantity')::FLOAT8, (_component->>'step_no')::INTEGER, (_component->>'step_description')::TEXT
        FROM jsonb_array_elements(_components) AS _component;

        RETURN;
    END;
$$

