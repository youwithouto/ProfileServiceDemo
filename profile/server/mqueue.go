package server

import (
	"demo/profile/api"
	"encoding/json"

	"github.com/streadway/amqp"
)

// MessageQueue defines the structure of a MessageQueue instance
type MessageQueue struct {
	connection *amqp.Connection
	channel    *amqp.Channel
}

// NewMessageQueue creates a new instance for NewMessageQueue
func NewMessageQueue() (*MessageQueue, error) {
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		return nil, err
	}

	ch, err := conn.Channel()
	if err != nil {
		return nil, err
	}

	return &MessageQueue{
		connection: conn,
		channel:    ch,
	}, nil
}

// Terminate terminates the connection to the RabbitMQ instance
func (mq *MessageQueue) Terminate() error {
	mq.channel.Close()
	mq.connection.Close()
	return nil
}

// Publish sends a message to a RabbitMQ instance
func (mq *MessageQueue) Publish(queueName string, event *api.Event) error {
	queue, err := mq.queueDeclare(queueName)
	if err != nil {
		return err
	}
	bytes, err := json.Marshal(event)
	err = mq.channel.Publish("", queue.Name, false, false, amqp.Publishing{
		ContentType: "application/json",
		Body:        bytes,
	})
	return err
}

func (mq *MessageQueue) queueDeclare(queueName string) (*amqp.Queue, error) {
	queue, err := mq.channel.QueueDeclare(
		"hello", // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)
	if err != nil {
		return nil, err
	}
	return &queue, nil
}

// GetDefaultQueueName returns the default queue name
func GetDefaultQueueName() string {
	return "demo"
}
