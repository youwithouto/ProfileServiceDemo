package server

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"
)

// Server defines the structure for a demo server instance
type Server struct {
	handler      *Handler
	repository   *Repository
	messageQueue *MessageQueue
}

// NewServer creates a new instance of server
func NewServer() (*Server, error) {
	repository, err := NewRepository()
	if err != nil {
		return nil, err
	}

	messageQueue, err := NewMessageQueue()
	if err != nil {
		return nil, err
	}

	handler, err := NewHandler(repository, messageQueue)
	if err != nil {
		return nil, err
	}

	return &Server{
		handler:      handler,
		repository:   repository,
		messageQueue: messageQueue,
	}, nil
}

// Run starts a new Server instance
func (s *Server) Run() {
	srv := &http.Server{
		Addr: "0.0.0.0:8080",
		// Good practice to set timeouts to avoid Slowloris attacks.
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 60,
		Handler:      s.handler.router,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil {
			log.Println(err)
		}
	}()

	c := make(chan os.Signal, 1)

	// We'll accept graceful shutdowns when quit via SIGINT (Ctrl+C)
	// SIGKILL, SIGQUIT or SIGTERM (Ctrl+/) will not be caught.
	signal.Notify(c, os.Interrupt)

	<-c

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()

	srv.Shutdown(ctx)
	s.terminate()

	log.Println("Server shutting down")
	os.Exit(0)
}

func (s *Server) terminate() error {
	err := s.messageQueue.Terminate()
	if err != nil {
		return err
	}
	return s.repository.Terminate()
}
