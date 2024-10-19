package models

import (
	"time"
)

type User struct {
	ID        int      `gorm:"primaryKey" json:"id"`
	Name      string    `gorm:"not null" json:"name"`
	Username  string    `gorm:"not null;unique" json:"username"`
	Email     string    `gorm:"not null;unique" json:"email"`
	Password  string    `json:"password"`
	CreatedOn time.Time `gorm:"autoCreateTime;column:createdOn" json:"createdOn"`
	UpdatedOn time.Time `gorm:"autoUpdateTime;column:updatedOn" json:"updatedOn"`
}