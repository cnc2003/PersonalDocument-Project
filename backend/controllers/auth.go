package controllers

import (
	"document-backend/config"
	"document-backend/models"
	"document-backend/utils"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
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
		Username        *string `json:"username"`
		Email           *string `json:"new_email"`
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
	// Compare the provided password with the stored hash
	if newUser.Username == nil {
		var passA = []byte(user.Password)
		var passB = []byte(newUser.ConfirmPassword)
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(newUser.ConfirmPassword)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error":        "Incorrect password",
				"old_password": string(passA),
				"new_password": string(passB),
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
