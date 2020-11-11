package server

import (
	"demo/profile/model"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Repository defines the structure for a database repository instance
type Repository struct {
	db            *gorm.DB
	configuration *Configuration
}

// NewRepository creates a new instance of Repository
func NewRepository(configuration *Configuration) (*Repository, error) {
	// "host=localhost user=you password=yoursecretpassword dbname=demo port=5432 sslmode=disable"
	connectionString := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%d sslmode=disable",
		configuration.DBHost, configuration.DBUser, configuration.DBPassword, configuration.DBName, configuration.DBPort)
	db, err := gorm.Open(postgres.Open(connectionString), &gorm.Config{})

	if err != nil {
		return nil, err
	}

	repository := &Repository{db: db}
	return repository, nil
}

// Terminate terminates the existing DB connection
func (r *Repository) Terminate() error {
	sqlDB, err := r.db.DB()
	if err != nil {
		return err
	}
	return sqlDB.Close()
}

// CreateProfile takes a Profile instances and persists it to DB
func (r *Repository) CreateProfile(p *model.Profile) (*model.Profile, error) {
	result := r.db.Create(p)
	if result.Error != nil {
		return nil, result.Error
	}
	return p, nil
}

// UpdateProfile takes a Profile instance and updates an existing Profile instance
func (r *Repository) UpdateProfile(p *model.Profile) (*model.Profile, error) {
	result := r.db.Model(p).Updates(map[string]interface{}{
		"Name":        p.Name,
		"Gender":      p.Gender,
		"Dob":         p.Dob,
		"Postcode":    p.Postcode,
		"PhoneNumber": p.PhoneNumber,
	})
	if result.Error != nil {
		return nil, result.Error
	}
	return p, nil
}

// GetAllProfile returns all available Profiles in DB
func (r *Repository) GetAllProfile() (*[]model.Profile, error) {
	profiles := []model.Profile{}
	result := r.db.Order("\"ID\"").Find(&profiles)
	if result.Error != nil {
		return &profiles, result.Error
	}
	return &profiles, nil
}
