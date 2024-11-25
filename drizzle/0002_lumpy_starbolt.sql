CREATE TABLE `frequencia` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`ausente` integer,
	`aulaId` integer NOT NULL,
	FOREIGN KEY (`aulaId`) REFERENCES `aula`(`id`) ON UPDATE no action ON DELETE no action
);
