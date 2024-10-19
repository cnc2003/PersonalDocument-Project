package controllers

import (
	"document-backend/config"
	"document-backend/models"
	"document-backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Where("username = ? OR email = ?", user.Username, user.Email).First(&models.User{}).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Username or email already exists"})
		return
	}
	
	// Hash password before add to db
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	user.Password = string(hashedPassword)

	// Save user to the db
	if err := config.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"errorReg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully!"})
}

func Login(c *gin.Context) {
	var credential struct {
		User     string `json:"user"`
		Password string `json:"password"`
	}
	var user models.User

	// Bind JSON body to credential struct
	if err := c.ShouldBindJSON(&credential); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Search user by either username or email
	if err := config.DB.Where("username = ? OR email = ?", credential.User, credential.User).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentialsA"})
		return
	}

	// Check password is correctly
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(credential.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error":   "Unauthorized: Invalid password",
		})
		return
	}

	// Generate JWT token
	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}
