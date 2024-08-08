DROP TABLE `shadcn_themes_verificationToken`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_shadcn_themes_account_userId_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_shadcn_themes_session_userId_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_shadcn_themes_stars_userId_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_shadcn_themes_stars_themeId_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_shadcn_themes_themes_userId_isPublic_createdAt_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_shadcn_themes_themes_isPublic_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_shadcn_themes_themes_userId_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_shadcn_themes_themes_name_idx`;--> statement-breakpoint
ALTER TABLE `shadcn_themes_themes` ADD `stars_count` integer DEFAULT 0;--> statement-breakpoint
CREATE INDEX `stars_themeId_idx` ON `shadcn_themes_stars` (`themeId`);--> statement-breakpoint
CREATE INDEX `stars_userId_idx` ON `shadcn_themes_stars` (`userId`);--> statement-breakpoint
CREATE INDEX `themes_name_idx` ON `shadcn_themes_themes` (`name`);--> statement-breakpoint
CREATE INDEX `themes_userId_idx` ON `shadcn_themes_themes` (`userId`);--> statement-breakpoint
CREATE INDEX `themes_isPublic_idx` ON `shadcn_themes_themes` (`isPublic`);--> statement-breakpoint
CREATE INDEX `themes_userId_isPublic_createdAt_idx` ON `shadcn_themes_themes` (`userId`,`isPublic`,`created_at`);