-- Custom SQL migration file, put you code below! --

-- Create a temporary view or table with row numbers
WITH numbered_users AS (
    SELECT id, email, ROW_NUMBER() OVER (
        PARTITION BY email 
        ORDER BY id
    ) as row_num
    FROM "user"
)
UPDATE "user"
SET email = CASE 
    WHEN (SELECT row_num FROM numbered_users WHERE numbered_users.id = "user".id) > 1
    THEN 
        SUBSTR(email, 1, INSTR(email,'@')-1) 
        || '_' 
        || (SELECT row_num FROM numbered_users WHERE numbered_users.id = "user".id) 
        || SUBSTR(email,INSTR(email, '@'))
    ELSE email
END;