package main

import (
	"encoding/json"
	"net/http"
	"strings"
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
	RobotSlowChannels   []string `json:"robotslowchannels"`
	SystemReactionTime  int      `json:"systemreactiontime"`
	RobotStopTime       int      `json:"robotstoptime"`
	MaxRobotSpeed       int      `json:"maxrobotspeed"`
	DetectionError      int      `json:"detectionerror"`
	RobotPositionError  int      `json:"robotpositionerror"`
}

type RobotConfigs struct {
	Model              string
	IP                 string
	Port               int
	SafetyStopChannels []string
	SafetySlowChannels []string
}

type SensorConfigs struct {
	IP      string
	Port    int
	Integer int
	Model   string
}

type SeperationDistConfig struct {
	SystemReactionTime int
	RobotStopTime      int
	MaxRobotSpeed      int
	DetectionError     int
	RobotPositionError int
}

type Params struct {
	Robotconfigs         []RobotConfigs
	Sensorconfigs        []SensorConfigs
	Seperationdistconfig SeperationDistConfig
	PrimaryIP            string
	SecondaryIP          string
	SecondaryPort        string
	PrimaryPort          int
	SceneConfigOnly      bool
}

func SaveConfigs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	var configs Configs
	json.NewDecoder(r.Body).Decode(&configs)

	json.NewEncoder(w).Encode("Works...")

	var robotconfigs []RobotConfigs
	robotconfig := RobotConfigs{
		Model:              configs.SelectedOptionRobot,
		IP:                 strings.Join(configs.RobotIP, "."),
		Port:               configs.RobotPort,
		SafetyStopChannels: configs.RobotStopChannels,
		SafetySlowChannels: configs.RobotSlowChannels,
	}
	robotconfigs = append(robotconfigs, robotconfig)

	var sensorconfigs []SensorConfigs
	sensorconfig := SensorConfigs{
		IP:      strings.Join(configs.SensorIP, "."),
		Port:    configs.SensorPort,
		Integer: -1,
		Model:   configs.SelectedOption,
	}
	sensorconfigs = append(sensorconfigs, sensorconfig)

	seperationdistconfig := SeperationDistConfig{
		SystemReactionTime: configs.SystemReactionTime,
		RobotStopTime:      configs.RobotStopTime,
		MaxRobotSpeed:      configs.MaxRobotSpeed,
		DetectionError:     configs.DetectionError,
		RobotPositionError: configs.RobotPositionError,
	}

}

// Remember in the frontend you asked for the path as well, when integrating put that as well.
