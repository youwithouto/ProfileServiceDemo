package api

// Event defines the structure for a RabbitMQ Event instnace
type Event struct {
	Topic EventType
	ID    int
}

// EventType defines a type for the RabbitMQ event
type EventType string

const (
	// CreatedProfile indentifies a RabbitMQ event as a user profile has been created
	CreatedProfile EventType = "CreatedProfile"
	// UpdatedProfile indentifies a RabbitMQ event as a user profile has been update
	UpdatedProfile = "UpdatedProfile"
)

// GetCreatedProfileEvent takes a Profile ID and returns a CreatedProfile event instance
func GetCreatedProfileEvent(id int) *Event {
	return GetEvent(CreatedProfile, id)
}

// GetUpdatedProfileEvent takes a Profile ID and returns a UpdatedProfile event instance
func GetUpdatedProfileEvent(id int) *Event {
	return GetEvent(UpdatedProfile, id)
}

// GetEvent takes an EventType and a Profile ID and retruns an event instnace
func GetEvent(eventType EventType, id int) *Event {
	return &Event{
		Topic: eventType,
		ID:    id,
	}
}
