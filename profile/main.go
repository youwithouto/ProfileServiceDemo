package main

import (
	"demo/profile/server"
	"flag"
	"log"
	"os"
	"time"
)

func main() {
	var wait time.Duration
	flag.DurationVar(&wait, "graceful-timeout", time.Second*15, "the duration for which the server gracefully wait for existing connections to finish - e.g. 15s or 1m")
	flag.Parse()

	server, err := server.NewServer()
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
	server.Run()
}
