import MySQLdb
import json

def Sensors_thi(jsonData):
	json_Dict = json.loads(jsonData)
	Temp = json_Dict['Temperature']
	Hum = json_Dict['Humidity']
	Light = json_Dict['Light']
	status = json_Dict['status']
	db = MySQLdb.connect("localhost", "sensor3user", "123456", "sensor3")
	cursor = db.cursor()
	sql = """INSERT INTO sensor_thi(Temp, Hum, Light, Status, Time) VALUES(%s,%s,%s,"%s", now())""" %(Temp, Hum, Light,status)
	cursor.execute(sql)
	db.commit()
	print("Insert data successfully")
	db.close()
