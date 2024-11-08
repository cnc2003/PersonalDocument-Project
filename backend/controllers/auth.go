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
	var newUser struct {
		Username        *string `json:"username" gorm:"size:50"`
		Email           *string `json:"new_email" gorm:"size:50"`
		ConfirmPassword string  `json:"password"`
		NewPassword     *string `json:"new_password"`
	}

	// Get user from token
	userID, _ := c.Get("user_id")
	if err := config.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Bind JSON body to newUser struct
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate lengths
	if newUser.Username != nil && len(*newUser.Username) > 50 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username exceeds 50 characters"})
		return
	}
	if len(newUser.ConfirmPassword) > 50 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password exceeds 50 characters"})
		return
	}
	if newUser.NewPassword != nil && len(*newUser.NewPassword) > 50 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "New password exceeds 50 characters"})
		return
	}

	// Compare the provided password with the stored hash
	if newUser.ConfirmPassword != "" {
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(newUser.ConfirmPassword)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Incorrect password",
			})
			return
		}
	}

	// Update user fields if provided
	if newUser.Username != nil {
		user.Username = *newUser.Username
	}
	if newUser.Email != nil {
		user.Email = *newUser.Email
	}
	if newUser.NewPassword != nil {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(*newUser.NewPassword), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
		}
		user.Password = string(hashedPassword)
	}

	// Save the updated user to the database
	if err := config.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"user_id":  user.ID,
		"name":     user.Name,
		"username": user.Username,
		"email":    user.Email,
	})
}

func DeleteUser(c *gin.Context) {
	var user models.User
	// Get user from token
	userID, _ := c.Get("user_id")
	if err := config.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if err := config.DB.Delete(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	c.JSON(http.StatusOK, user)
}
