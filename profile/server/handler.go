package server

import (
	"demo/profile/api"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

// Handler defines the structure for a Handler instnace
type Handler struct {
	router     *mux.Router
	repository *Repository
}

// NewHandler creates a new instance for Handler
func NewHandler(repository *Repository) (*Handler, error) {
	handler := &Handler{
		repository: repository,
	}

	r := mux.NewRouter()
	r.HandleFunc("/", handler.HomeHandler).Methods("GET").Schemes("http")
	r.HandleFunc("/profiles", handler.ProfilesHandler).Methods("GET", "POST", "PUT").
		Schemes("http")
	http.Handle("/", r)
	handler.router = r

	return handler, nil
}

// HomeHandler defines a default HTTP request handler
func (h *Handler) HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello, World!\n"))
}

// ProfilesHandler defines an HTTP request handler for user profiles
func (h *Handler) ProfilesHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		handleGetProfiles(h.repository, w, r)
	case http.MethodPost:
		handlePostProfile(h.repository, w, r)
	case http.MethodPut:
		handlePutProfile(h.repository, w, r)
	default:
		w.Write([]byte("This operation is not supported\n"))
	}
}

func handleGetProfiles(repository *Repository, w http.ResponseWriter, r *http.Request) {
	profiles, err := repository.GetAllProfile()
	if err != nil {
		w.Write([]byte(err.Error()))
	} else {
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(profiles)
	}
}

func handlePostProfile(repository *Repository, w http.ResponseWriter, r *http.Request) {
	var request api.CreateProfileRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	profile := request.ToModel()
	repository.CreateProfile(&profile)
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(profile)
}

func handlePutProfile(repository *Repository, w http.ResponseWriter, r *http.Request) {
	var request api.UpdateProfileRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	profile := request.ToModel()
	repository.UpdateProfile(&profile)
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(profile)
}
