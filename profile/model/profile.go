package model

import (
	"time"
)

// Profile defines the structure for a Profile instance
type Profile struct {
	ID          int       `gorm:"primaryKey;column:ID" json:"id"`
	Name        string    `gorm:"column:Name" json:"name"`
	Gender      string    `gorm:"column:Gender" json:"gender"`
	Dob         time.Time `gorm:"column:Dob" json:"dob"`
	Postcode    int       `gorm:"column:Postcode" json:"postcode"`
	PhoneNumber string    `gorm:"column:PhoneNumber" json:"phoneNumber"`
}

// TableName defines the valid <schema name>.<table name> for gorm
func (Profile) TableName() string {
	return "demo.profile"
}
