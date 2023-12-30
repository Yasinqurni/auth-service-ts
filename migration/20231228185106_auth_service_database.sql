-- migrate:up
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) PRIMARY KEY UNIQUE,
  `username` VARCHAR(26) NOT NULL,
  `email` VARCHAR(36) NOT NULL UNIQUE,
  `phone_number` VARCHAR(36) NOT NULL UNIQUE,
  `password` VARCHAR(226) NOT NULL,
  `role` ENUM('user', 'admin') DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL 
);

-- migrate:down
DROP TABLE `users`;
