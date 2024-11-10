package main

import (
	"document-backend/config"
	"document-backend/routes"
	// "log"

	// "github.com/joho/godotenv"
)

func main() {
	// if err := godotenv.Load(); err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	config.ConnectDatabase()
	// config.Migrate()

	router := routes.SetupRouter()
	router.Run(":8080")
}
