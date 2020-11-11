package api

import (
	"demo/profile/model"
	"fmt"
	"strings"
	"time"

	"gopkg.in/go-playground/validator.v9"
)

// CreateProfileRequest defines the structure for a CreateProfileRequest instance
type CreateProfileRequest struct {
	Name        string    `json:"name" validate:"required,min=5"`
	Gender      string    `json:"gender" validate:"required,oneof=f m"`
	Dob         time.Time `json:"dob" validate:"required"`
	Postcode    int       `json:"postcode" validate:"required,min=1000,max=9999"`
	PhoneNumber string    `json:"phoneNumber" validate:"required,min=10,max=15"`
}

// Validate validates the fields of a CreateProfileRequest instance
func (cpr *CreateProfileRequest) Validate() error {
	v := validator.New()
	err := v.Struct(cpr)
	if err != nil {
		var invalidFields []string
		for _, e := range err.(validator.ValidationErrors) {
			invalidFields = append(invalidFields, e.Field())
		}
		return fmt.Errorf("%s %s", strings.Join(invalidFields, ","), "are not valid")
	}
	return nil
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
	ID          int       `json:"id" validate:"required,min=1"`
	Name        string    `json:"name" validate:"required,min=5"`
	Gender      string    `json:"gender" validate:"required,oneof=f m"`
	Dob         time.Time `json:"dob" validate:"required"`
	Postcode    int       `json:"postcode" validate:"required,min=1000,max=9999"`
	PhoneNumber string    `json:"phoneNumber" validate:"required,min=10,max=15"`
}

// Validate validates the fields of a UpdateProfileRequest instance
func (upr *UpdateProfileRequest) Validate() error {
	v := validator.New()
	err := v.Struct(upr)
	if err != nil {
		var invalidFields []string
		for _, e := range err.(validator.ValidationErrors) {
			invalidFields = append(invalidFields, e.Field())
		}
		return fmt.Errorf("%s %s", strings.Join(invalidFields, ","), "are not valid")
	}
	return nil
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
