-- migrate:up
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) PRIMARY KEY,
  `username` VARCHAR(26) NOT NULL,
  `email` VARCHAR(36) NOT NULL,
  `phone_number` VARCHAR(36) NOT NULL,
  `password` VARCHAR(26) NOT NULL,
  `role` ENUM('user', 'admin') NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL 
);

-- migrate:down
DROP TABLE `users`;
