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

	// Generate JWT token
	token, err := utils.GenerateToken(user.ID, user.Name, user.Username, user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{"type": "REGS", "token": token})
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
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user " + credential.User + " not found"})
		return
	}

	// Check password is correctly
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(credential.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Incorret password",
		})
		return
	}

	// Generate JWT token
	token, err := utils.GenerateToken(user.ID, user.Name, user.Username, user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{"type": "LOGIN", "token": token})
}

func UpdateUser(c *gin.Context) {
	var user models.User

	// Get user from token
	userID, _ := c.Get("user_id")
	if err := config.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	var newUser struct {
		Username *string `json:"username"`
		Email    *string `json:"email"`
		Password *string `json:"password"`
		// ImageURL *string `json:"imageUrl"`
	}
	// Bind JSON body to newUser struct
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update user fields
	if newUser.Username != nil {
		user.Username = *newUser.Username
	}
	if newUser.Email != nil {
		user.Email = *newUser.Email
	}
	// if newUser.ImageURL != nil {
	// 	user.ImageURL = *newUser.ImageURL
	// }

	if newUser.Password != nil {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(*newUser.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
		}
		user.Password = string(hashedPassword)
	}

	// Save the updated user back to the database
	if err := config.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	// Return the updated user
	c.JSON(http.StatusOK, gin.H{"user": user})
}
