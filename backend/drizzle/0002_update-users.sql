-- Custom SQL migration file, put you code below! --
UPDATE "user" SET `email` = 'user0@example.com', `password` = 'abc123', `created_at` = strftime('%s') * 1000;