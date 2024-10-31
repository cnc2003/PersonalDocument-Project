package controllers

import (
	"document-backend/config"
	"document-backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetDocuments(c *gin.Context) {
	userID := c.GetInt("user_id")
	var documents []models.Document
	if err := config.DB.Where("user_id = ?", userID).Find(&documents).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch documents"})
		return
	}
	
	c.JSON(http.StatusOK, documents)
}

func GetDocumentByID(c *gin.Context) {
	userID := c.GetInt("user_id")
	documentId, _ := strconv.Atoi(c.Param("id"))
	var document models.Document
	if err := config.DB.Where("id = ? AND user_id = ?", documentId, userID).
		First(&document).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Document not found"})
		return
	}

	c.JSON(http.StatusOK, document)
}

func CreateDocument(c *gin.Context) {
	userID := c.GetInt("user_id")
	var document models.Document
	// Bind JSON data to the document struct
	if err := c.ShouldBindJSON(&document); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	document.UserID = userID
	if err := config.DB.Create(&document).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"errorC": err})
		return
	}

	// Return the created document
	c.JSON(http.StatusCreated, document)
}

func UpdateDocument(c *gin.Context) {
	userID := c.GetInt("user_id")
	documentID, _ := strconv.Atoi(c.Param("id")) // Get document ID from URL

	var document models.Document
	if err := config.DB.Where("id = ? AND user_id = ?", documentID, userID).First(&document).Error; err != nil {
		c.JSON(http.StatusFound, gin.H{"error": "Document not found"})
		return
	}

	if err := c.ShouldBindJSON(&document); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Save(&document).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update document"})
		return
	}
	c.JSON(http.StatusOK, document)
}

// func PatchDocumentContent(c *gin.Context) {
// 	userID := c.GetInt("user_id")
// 	documentID, _ := strconv.Atoi(c.Param("id"))

// 	var document models.Document
// 	if err := config.DB.Where("id = ? AND user_id = ?", documentID, userID).First(&document).Error; err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "Document not found"})
// 		return
// 	}

// 	var input struct {
// 		Content string `json:"content"`
// 	}
// 	if err := c.ShouldBindJSON(&input); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	document.Content = input.Content
// 	if err := config.DB.Save(&document).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update document content"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, document)
// }

func PatchDocumentContent(c *gin.Context) {
    userID := c.GetInt("user_id")
    documentID, _ := strconv.Atoi(c.Param("id"))

    var document models.Document
    if err := config.DB.Where("id = ? AND user_id = ?", documentID, userID).First(&document).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Document not found"})
        return
    }

    var input struct {
        Title   *string `json:"title"`
        Content *string `json:"content"`
    }
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if input.Title != nil {
        document.Title = *input.Title
    }
    if input.Content != nil {
        document.Content = *input.Content
    }

    if err := config.DB.Save(&document).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update document"})
        return
    }

    c.JSON(http.StatusOK, document)
}

func DeleteDocument(c *gin.Context) {
	userID := c.GetInt("user_id")
	documentID, _ := strconv.Atoi(c.Param("id"))

	if err := config.DB.Where("id = ? AND user_id = ?", documentID, userID).
		Delete(&models.Document{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete document"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Document deleted successfully"})
}
