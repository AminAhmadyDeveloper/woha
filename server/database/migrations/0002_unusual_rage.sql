PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`github_id` integer,
	`hashed_password` text
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "username", "github_id", "hashed_password") SELECT "id", "username", "github_id", "hashed_password" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;