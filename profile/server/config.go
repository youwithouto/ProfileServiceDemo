package server

// Configuration defines the structure for a configuration instance
type Configuration struct {
	ServerPort int `envconfig:"SERVER_PORT" default:"8080"`

	DBHost     string `envconfig:"DB_HOST" default:"localhost"`
	DBPort     int    `envconfig:"DB_PORT" default:"5432"`
	DBUser     string `envconfig:"DB_USER" default:"you"`
	DBPassword string `envconfig:"DB_PASSWORD" default:"yoursecretpassword"`
	DBName     string `envconfig:"DB_NAME" default:"demo"`

	MQHost     string `envconfig:"MQ_HOST" default:"localhost"`
	MQPort     int    `envconfig:"MQ_PORT" default:"5672"`
	MQUser     string `envconfig:"MQ_USER" default:"guest"`
	MQPassword string `envconfig:"MQ_PASSWORD" default:"guest"`
}
