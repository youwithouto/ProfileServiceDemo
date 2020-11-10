package api

import (
	"demo/profile/model"
	"time"
)

// CreateProfileRequest defines the structure for a CreateProfileRequest instance
type CreateProfileRequest struct {
	Name        string    `json:"name"`
	Gender      string    `json:"gender"`
	Dob         time.Time `json:"dob"`
	Postcode    int       `json:"postcode"`
	PhoneNumber string    `json:"phoneNumber"`
}

// ToModel convert an API model to a domain model
func (cpr *CreateProfileRequest) ToModel() model.Profile {
	return model.Profile{
		Name:        cpr.Name,
		Gender:      cpr.Gender,
		Dob:         cpr.Dob,
		Postcode:    cpr.Postcode,
		PhoneNumber: cpr.PhoneNumber,
	}
}

// UpdateProfileRequest defines the structure for a UpdateProfileRequest instance
type UpdateProfileRequest struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Gender      string    `json:"gender"`
	Dob         time.Time `json:"dob"`
	Postcode    int       `json:"postcode"`
	PhoneNumber string    `json:"phoneNumber"`
}

// ToModel convert an API model to a domain model
func (upr *UpdateProfileRequest) ToModel() model.Profile {
	return model.Profile{
		ID:          upr.ID,
		Name:        upr.Name,
		Gender:      upr.Gender,
		Dob:         upr.Dob,
		Postcode:    upr.Postcode,
		PhoneNumber: upr.PhoneNumber,
	}
}
