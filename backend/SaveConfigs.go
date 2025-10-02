package main

import (
	"encoding/json"
	"net/http"
)

type Configs struct {
	SelectedOption      string   `json:"selectedoption"`
	SelectedOptionRobot string   `json:"selectedoptionrobot"`
	PrimaryIP           []string `json:"primaryip"`
	PrimaryPort         int      `json:"primaryport"`
	IncludeSceneConfig  bool     `json:"includesceneconfig"`
	SecondaryIP         []string `json:"secondaryip"`
	Interface           string   `json:"interface"`
	SensorIP            []string `json:"sensorip"`
	SensorPort          int      `json:"sensorport"`
	RobotIP             []string `json:"robotip"`
	RobotPort           int      `json:"robotport"`
	RobotStopChannels   []string `json:"robotstopchannels"`
	SystemReactionTime  int      `json:"systemreactiontime"`
	RobotStopTime       int      `json:"robotstoptime"`
	MaxRobotSpeed       int      `json:"maxrobotspeed"`
	DetectionError      int      `json:"detectionerror"`
	RobotPositionError  int      `json:"robotpositionerror"`
}

func SaveConfigs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	var configs Configs
	json.NewDecoder(r.Body).Decode(&configs)

	json.NewEncoder(w).Encode("Works...")
}
