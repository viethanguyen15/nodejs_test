import MySQLdb as mysql
db = mysql.connect("localhost", "sensor3user", "123456", "sensor3")
cursor = db.cursor()
sql = """ CREATE TABLE sensor_thi(
		  sensor_id INT(10) PRIMARY KEY AUTO_INCREMENT,
		  Temp INT(3) NOT NULL,
		  Hum INT(3) NOT NULL,
		  Light INT(3) NOT NULL,
		  Status VARCHAR(50) NOT NULL,
		  Time datetime NOT NULL	
		)"""

cursor.execute(sql)
db.close()
