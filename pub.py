import paho.mqtt.client as mqtt
import random, json
from datetime import datetime
from time import sleep

MQTT_Broker = "localhost"
MQTT_Port = 1883
Keep_Alive_Interval = 45
MQTT_Topic = "sensors"

def on_connect(client, userdata, rc):
	if rc != 0:
		pass
		print ("not connect to MQTT Broker")
	else:
		print ("connected to MQTT Broker: " + str(MQTT_Broker))

def on_publish(client, userdata, mid):
	pass

def on_dicconnect():
	if rc != 0:
		pass

mqttc = mqtt.Client()
mqttc.username_pw_set(username="hamqtt", password="haha")
mqttc.on_connect = on_connect
mqttc.on_dicconnect = on_dicconnect
mqttc.on_publish = on_publish
mqttc.connect(MQTT_Broker, MQTT_Port, Keep_Alive_Interval)

def publish_To_Topic(topic, message):
	mqttc.publish(topic, message)
	print("Published:" + str(message) + " " + "on MQTT Topic: " + str(topic))

def publish_Values_to_MQTT():
	Temp = int(random.uniform(10, 50))
	Hum = int(random.uniform(50, 100))
	Light = int(random.uniform(50, 200))

	if Temp < 20:
		status = 'low'
	elif Temp >30 and Temp <= 50:
		status = 'high'
	else:
		status = 'normal'

	Sensor_data = {}
	Sensor_data['Temperature'] = Temp
	#Sensor_data['timenow'] = (datetime.today().strftime("%d-%b-%Y %H:%M:%S"))
	Sensor_data['Humidity'] = Hum
	Sensor_data['Light'] = Light
	Sensor_data['status'] = status
	sensor_json_data = json.dumps(Sensor_data) #ma hoa chuoi thanh doi tuong python
	print("Publishing fake value: ")
	publish_To_Topic(MQTT_Topic, sensor_json_data)
	sleep(1)
while True:
	publish_Values_to_MQTT()
	sleep(1)	

