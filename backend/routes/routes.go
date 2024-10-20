package routes

import (
	"document-backend/controllers"
	"document-backend/middleware"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost"}, // Allow React frontend origin
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))


	router.POST("/register", controllers.Register)
	router.POST("/login", controllers.Login)

	// Protected routes (only accessible with valid JWT)
	documentRoutes := router.Group("/documents")
	documentRoutes.Use(middleware.AuthMiddleware())
	{
		documentRoutes.POST("/", controllers.CreateDocument)
		documentRoutes.GET("/", controllers.GetDocuments)
		documentRoutes.GET("/:id", controllers.GetDocumentByID)
		documentRoutes.PUT("/:id", controllers.UpdateDocument)
		documentRoutes.DELETE("/:id", controllers.DeleteDocument)
	}

	return router
}