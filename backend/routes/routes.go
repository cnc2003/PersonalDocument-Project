package routes

import (
	"document-backend/controllers"
	"document-backend/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

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
