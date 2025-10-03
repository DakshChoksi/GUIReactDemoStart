package main

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"net/http"
	"os"
	"strconv"
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

type PCIPS struct {
	XMLName                  xml.Name `xml:"PC_IPs"`
	Primary                  string   `xml:"primary,attr"`
	Secondary                string   `xml:"secondary,attr"`
	Secondary_port_interface string   `xml:"secondary_port_interface"`
	PrimaryPort              string   `xml:"primary_port"`
	SceneConfigOnly          bool     `xml:"scene_config_only"`
}

type Sensor struct {
	XMLName    xml.Name `xml:"sensor"`
	IP         string   `xml:"ip"`
	Port       string   `xml:"port"`
	SensorNode string   `xml:"sn"`
	Model      string   `xml:"model"`
}

type Sensors struct {
	XMLName xml.Name `xml:"Sensors"`
	Sensor  Sensor   `xml:"sensor"`
}

type Robot struct {
	XMLName            xml.Name `xml:"robot"`
	RobotModel         string   `xml:"robot_model,attr"`
	IP                 string   `xml:"ip,attr"`
	Port               string   `xml:"port,attr"`
	SafetyStopChannels []string `xml:"safety_stop_channels,attr"`
	SafetySlowChannels []string `xml:"safety_slow_channels,attr"`
}

type Robots struct {
	XMLName xml.Name `xml:"Robots"`
	Robot   Robot    `xml:"robot"`
}

type SeperationdistconfigXML struct {
	XMLName            xml.Name `xml:"seperation_dist_config"`
	SystemReactionTime int      `xml:"system_reaction_time,attr"`
	RobotStopTime      int      `xml:"robot_stop_time,attr"`
	MaxRobotSpeed      int      `xml:"max_robot_speed,attr"`
	DetectionError     int      `xml:"detection_error,attr"`
	RobotPositionError int      `xml:"robot_position_error,attr"`
}

type Root struct {
	XMLName                 xml.Name                `xml:"root"`
	Pcips                   PCIPS                   `xml:"PC_IPs"`
	Sensors                 Sensors                 `xml:"Sensors"`
	Robots                  Robots                  `xml:"Robots"`
	SeperationdistconfigxML SeperationdistconfigXML `xml:"seperation_dist_config"`
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

	var params = Params{
		Robotconfigs:         robotconfigs,
		Sensorconfigs:        sensorconfigs,
		Seperationdistconfig: seperationdistconfig,
		PrimaryIP:            strings.Join(configs.PrimaryIP, "."),
		SecondaryIP:          strings.Join(configs.SecondaryIP, "."),
		SecondaryPort:        configs.Interface,
		PrimaryPort:          configs.PrimaryPort,
		SceneConfigOnly:      configs.IncludeSceneConfig,
	}

	pcips := PCIPS{
		Primary:                  params.PrimaryIP,
		Secondary:                params.SecondaryIP,
		Secondary_port_interface: params.SecondaryPort,
		PrimaryPort:              strconv.Itoa(params.PrimaryPort),
		SceneConfigOnly:          params.SceneConfigOnly,
	}

	sensor := Sensor{
		IP:         params.Sensorconfigs[0].IP,
		Port:       strconv.Itoa(params.Sensorconfigs[0].Port),
		SensorNode: strconv.Itoa(params.Sensorconfigs[0].Integer),
		Model:      params.Sensorconfigs[0].Model,
	}

	sensors := Sensors{
		Sensor: sensor,
	}

	robot := Robot{
		RobotModel:         params.Robotconfigs[0].Model,
		IP:                 params.Robotconfigs[0].IP,
		Port:               strconv.Itoa(params.Robotconfigs[0].Port),
		SafetyStopChannels: params.Robotconfigs[0].SafetyStopChannels,
		SafetySlowChannels: params.Robotconfigs[0].SafetySlowChannels,
	}

	robots := Robots{
		Robot: robot,
	}

	seperation_dist_config := SeperationdistconfigXML{
		SystemReactionTime: params.Seperationdistconfig.SystemReactionTime,
		RobotStopTime:      params.Seperationdistconfig.RobotStopTime,
		MaxRobotSpeed:      params.Seperationdistconfig.MaxRobotSpeed,
		DetectionError:     params.Seperationdistconfig.DetectionError,
		RobotPositionError: params.Seperationdistconfig.RobotPositionError,
	}

	root := Root{
		Pcips:                   pcips,
		Sensors:                 sensors,
		Robots:                  robots,
		SeperationdistconfigxML: seperation_dist_config,
	}

	file, err := os.Create("config.xml")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	Encoder := xml.NewEncoder(file)
	Encoder.Indent("", " ")
	err = Encoder.Encode(root)
	if err != nil {
		panic(err)
	}
	fmt.Println("File created and filled successfully")

}

// Remember in the frontend you asked for the path as well, when integrating put that as well.
