CREATE TABLE `aula` (
	`id` integer PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `conteudo` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`aulaId` integer NOT NULL,
	FOREIGN KEY (`aulaId`) REFERENCES `aula`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `products`;