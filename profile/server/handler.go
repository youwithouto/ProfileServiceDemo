package server

import (
	"demo/profile/api"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

// Handler defines the structure for a Handler instnace
type Handler struct {
	router       *mux.Router
	repository   *Repository
	messageQueue *MessageQueue
}

// NewHandler creates a new instance for Handler
func NewHandler(repository *Repository, messageQueue *MessageQueue) (*Handler, error) {
	handler := &Handler{
		repository:   repository,
		messageQueue: messageQueue,
	}

	r := mux.NewRouter()
	r.HandleFunc("/", handler.HomeHandler).Methods("GET").Schemes("http")
	r.HandleFunc("/profiles", handler.GetProfilesHandler).Schemes("http").Methods("GET")
	r.HandleFunc("/profiles", handler.PostProfileHandler).Schemes("http").Methods("POST")
	r.HandleFunc("/profiles", handler.PutProfileHandler).Schemes("http").Methods("PUT")

	http.Handle("/", r)
	handler.router = r

	return handler, nil
}

// HomeHandler defines a default HTTP request handler
func (h *Handler) HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello, World!\n"))
}

// GetProfilesHandler defines an HTTP request handler for retriving user profiles
func (h *Handler) GetProfilesHandler(w http.ResponseWriter, r *http.Request) {
	profiles, err := h.repository.GetAllProfile()
	if err != nil {
		w.Write([]byte(err.Error()))
	} else {
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(profiles)
	}
}

// PostProfileHandler defines an HTTP request handler for inserting user profiles
func (h *Handler) PostProfileHandler(w http.ResponseWriter, r *http.Request) {
	var request api.CreateProfileRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	profile := request.ToModel()
	h.repository.CreateProfile(&profile)

	h.messageQueue.Publish(GetDefaultQueueName(), api.GetCreatedProfileEvent(profile.ID))

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(profile)
}

// PutProfileHandler defines an HTTP request handler for updating user profiles
func (h *Handler) PutProfileHandler(w http.ResponseWriter, r *http.Request) {
	var request api.UpdateProfileRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	profile := request.ToModel()
	h.repository.UpdateProfile(&profile)

	h.messageQueue.Publish(GetDefaultQueueName(), api.GetUpdatedProfileEvent(profile.ID))

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(profile)
}
