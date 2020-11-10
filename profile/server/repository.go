package server

import (
	"demo/profile/model"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Repository defines the structure for a database repository instance
type Repository struct {
	db *gorm.DB
}

// NewRepository creates a new instance of Repository
func NewRepository() (*Repository, error) {
	dsn := "host=localhost user=you password=yoursecretpassword dbname=demo port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		return nil, err
	}

	repository := &Repository{db: db}
	return repository, nil
}

// CreateProfile takes a Profile instances and persists it to DB
func (r *Repository) CreateProfile(p *model.Profile) (*model.Profile, error) {
	r.db.Create(p)
	return p, nil
}

// UpdateProfile takes a Profile instance and updates an existing Profile instance
func (r *Repository) UpdateProfile(p *model.Profile) (*model.Profile, error) {
	r.db.Model(p).Updates(map[string]interface{}{
		"Name":        p.Name,
		"Gender":      p.Gender,
		"Dob":         p.Dob,
		"Postcode":    p.Postcode,
		"PhoneNumber": p.PhoneNumber,
	})
	return p, nil
}

// GetAllProfile returns all available Profiles in DB
func (r *Repository) GetAllProfile() (*[]model.Profile, error) {
	profiles := []model.Profile{}
	result := r.db.Find(&profiles)
	if result.Error != nil {
		return &profiles, result.Error
	}
	return &profiles, nil
}
