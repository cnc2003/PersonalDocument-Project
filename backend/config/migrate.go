package config

import (
	"document-backend/models"
)

// Migrate runs the database migrations.
func Migrate() {
	DB.AutoMigrate(&models.User{}, &models.Document{})
}