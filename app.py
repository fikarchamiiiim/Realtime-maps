from flask import Flask, render_template, Response
from pykafka import KafkaClient
import subprocess
import threading
from time import sleep

from pykafka.protocol import message
import utils
from datetime import datetime
import json

# zookeeper = threading.Thread(target=subprocess.call, args=(["zookeeper-server-start.bat", "C:/Development/kafka_2.13-2.8.0/config/zookeeper.properties"],), daemon=True)
# kafka_server = threading.Thread(target=subprocess.call, args=(["kafka-server-start.bat", "C:/Development/kafka_2.13-2.8.0/config/server.properties"],), daemon=True)

# zookeeper.start()
# kafka_server.start()

def get_kafka_client():
    return KafkaClient(hosts='127.0.0.1:9092')

app = Flask(__name__)

@app.route('/')
def index():
    return(render_template('index.html'))

#Consumer API
@app.route('/topic/<topicname>')
def get_messages(topicname):
    input_file = open('./data/bus1.json')
    json_obj = json.load(input_file)
    coordinates = json_obj["features"][0]["geometry"]["coordinates"]

    data = {}
    data['busline'] = "00001"
    def events():
        i = 0
        while True:
            data["key"] = f"{data['busline']}_{i}_{utils.generate_uuid4()}"
            data["timestamp"] = str(datetime.utcnow())
            data["latitude"] = coordinates[i][1]
            data["longitude"] = coordinates[i][0]
            message = json.dumps(data)

            yield 'data:{0}\n\n'.format(message)
            if i == len(coordinates)-1:
                i = 0
            else:
                i += 1
            sleep(0.01)

    return Response(events(), mimetype="text/event-stream")

if __name__ == '__main__':
    app.run(debug=True, port=5001, host="192.168.88.105")
