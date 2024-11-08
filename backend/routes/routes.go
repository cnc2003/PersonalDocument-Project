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

	// CORS middleware configuration
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost"}, // Allow React frontend origin
		AllowMethods:     []string{"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	api := router.Group("/api")
	{
		api.POST("/register", controllers.Register)
		api.POST("/login", controllers.Login)

		// Protected routes (only accessible with valid JWT)
		documentRoutes := api.Group("/documents")
		documentRoutes.Use(middleware.AuthMiddleware())
		{
			documentRoutes.POST("", controllers.CreateDocument)
			documentRoutes.GET("", controllers.GetDocuments)
			documentRoutes.GET("/:id", controllers.GetDocumentByID)
			documentRoutes.PATCH("/:id", controllers.PatchDocumentContent)
			documentRoutes.PUT("/:id", controllers.UpdateDocument)
			documentRoutes.DELETE("/:id", controllers.DeleteDocument)
		}

		userRoutes := api.Group("/users")
		userRoutes.Use(middleware.AuthMiddleware())
		{
			userRoutes.PATCH("", controllers.UpdateUser)
			userRoutes.DELETE("", controllers.DeleteUser)
		}
	}

	return router
}
