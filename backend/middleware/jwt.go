package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// AuthMiddleware checks for the presence of a valid JWT token
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the token from the Authorization header
		tokenString := c.GetHeader("Authorization")

		// Ensure token is provided and in the correct format
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "JWT token is missing"})
			c.Abort()
			return
		}

		// Split the token string to extract the token part
		parts := strings.Split(tokenString, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization format"})
			c.Abort()
			return
		}
		tokenString = parts[1] // Take the token part only
		// Parse the token
		secretKey := []byte(os.Getenv("JWT_SECRET"))
		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
			// Ensure the token's signing method is valid
			if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, http.ErrNotSupported
			}
			return secretKey, nil
		})

		// Check for token validation errors
		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// Store user ID or other claims in the context if needed
		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			if userID, exists := claims["user_id"]; exists {
				c.Set("user_id", int(userID.(float64))) // Store userID in context
			}
			if username, exists := claims["username"]; exists {
				c.Set("username", username.(string)) // Store userID in context
			}
		}
		
		c.Next() // Proceed to the next handler
	}
}
