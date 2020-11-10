package model

import (
	"time"
)

// Profile defines the structure for a Profile instance
type Profile struct {
	ID          int       `gorm:"primaryKey;column:ID"`
	Name        string    `gorm:"column:Name"`
	Gender      string    `gorm:"column:Gender"`
	Dob         time.Time `gorm:"column:Dob"`
	Postcode    int       `gorm:"column:Postcode"`
	PhoneNumber string    `gorm:"column:PhoneNumber"`
}

// TableName defines the valid <schema name>.<table name> for gorm
func (Profile) TableName() string {
	return "demo.profile"
}
