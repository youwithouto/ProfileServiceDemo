package main

import (
	"demo/profile/server"
	"flag"
	"log"
	"os"
	"time"

	"github.com/kelseyhightower/envconfig"
)

var configuration server.Configuration

func init() {
	err := envconfig.Process("profile", &configuration)
	if err != nil {
		log.Fatal(err.Error())
	}
}

func main() {
	var wait time.Duration
	flag.DurationVar(&wait, "graceful-timeout", time.Second*15, "the duration for which the server gracefully wait for existing connections to finish - e.g. 15s or 1m")
	flag.Parse()

	server, err := server.NewServer(&configuration)
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
	server.Run()
}
