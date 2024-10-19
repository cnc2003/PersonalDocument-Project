package models

import (
	"time"
)

type Document struct {
	ID        int      `gorm:"primaryKey" json:"id"`
	UserID    int      `gorm:"not null" json:"user_id"`
	Title     string    `gorm:"not null" json:"title"`
	Content   string    `json:"content"`
	CreatedOn time.Time `gorm:"autoCreateTime;column:createdOn" json:"createdOn"`
	UpdatedOn time.Time `gorm:"autoUpdateTime;column:updatedOn" json:"updatedOn"`
	Privacy   string    `gorm:"not null" json:"privacy"`
}
