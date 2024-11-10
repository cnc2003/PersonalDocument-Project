package config

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"github.com/joho/godotenv"
)

var DB *gorm.DB

// ConnectDatabase initializes the database connection.
func ConnectDatabase() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Retrieve the environment variables
	host, _ := os.LookupEnv("MYSQLHOST")
	port, _ := os.LookupEnv("MYSQLPORT")
	user, _ := os.LookupEnv("MYSQLUSER")
	password, _ := os.LookupEnv("MYSQLPASSWORD")
	dbname, _ := os.LookupEnv("MYSQLDATABASE")

	// Log the DSN string (for debugging only, be careful with sensitive info)
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		user, password, host, port, dbname)
	fmt.Println("Connecting with DSN:", dsn)

	// url := fmt.Sprintf("mysql://%s:%s@%s:%s/%s", user, password, host, port, dbname)
	
	// Try to connect to the database
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err) // Log the error message
	}
}
