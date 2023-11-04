from flask import Flask
from flask import Flask, request
from flask import jsonify


from Database import getAllBikesFrom_db, getAllCarsFrom_db, login_db, register_db,getAllSparesForCars,getAllSparesForBikes

from Database import getAllBikesFrom_db, getAllCarsFrom_db, login_db, register_db,getAllSparesForCars
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/register', methods=['POST'])
def register_user():
    req = request.get_json()
    print(req)
    res = register_db(req)
    return jsonify(res)

@app.route('/login',methods = ['POST'])
def login():
    req = request.get_json()
    print(req)
    res = login_db(req)
    return jsonify(res)


@app.route('/bike',methods = ['get'])
def bikes():
    
    res = getAllBikesFrom_db()
    return jsonify(res)

@app.route('/car',methods = ['get'])
def cars():

    res = getAllCarsFrom_db()
    return jsonify(res)


@app.route('/getCarSpares',methods = ['post'])
def carspares():
    req = request.get_json()
    res = getAllSparesForCars(req)
    return jsonify(res)



@app.route('/getBikeSpares',methods = ['post'])
def bikespares():
    req = request.get_json()
    res = getAllSparesForBikes(req)
    return jsonify(res)



if __name__ == '__main__':
    app.run()


