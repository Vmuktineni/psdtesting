import pytest
from Api import app
from Database import (
    register_db,
    login_db,
    getAllBikesFrom_db,
    getAllSparesForBikes
)

@pytest.fixture
def client():
    app.config['TESTING'] = True
    client = app.test_client()

    yield client
    

def test_login_invalid_credentials(client):
    response = client.post('/login', json={'UserName': 'invaliduser', 'Password': 'invalidpassword'})
    assert response.status_code == 200
    assert 'userId' not in response.json
    
def test_register_user(client):
    user_data = {
        "Name": "Test User",
        "ContactId": "1234567890",
        "Email": "test@gmail.com",
        "Address": "123 Test St",
        "ZipCode": "12345",
        "UserName": "testuser",
        "Password": "testpassword"
    }
    response = client.post('/register', json=user_data)
    assert response.status_code == 200
    assert response.json['issuccess'] is True

def test_get_bike_spares():
    with app.test_client() as client:
        response = client.post('/getBikeSpares', json={'bikeId': 1})
        assert response.status_code == 200

def test_get_bikes():
    with app.test_client() as client:
        response = client.get('/bike')
        assert response.status_code == 200   

