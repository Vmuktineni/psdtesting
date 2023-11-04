from sqlalchemy import create_engine
#from sqlalchemy import filter, filter_by


#engine = create_engine('mssql+pyodbc://@' + 'VINEETHA\MSSQL' + '/' + 'Mechazone' + '?trusted_connection=yes & driver=ODBC Driver 17 for SQL Server')
#engine = create_engine('mssql+pyodbc://@' + 'SREEHARI\MSSQLSERVER01' + '/' + 'Mechazone' + '?trusted_connection=yes & driver=ODBC Driver 17 for SQL Server')
engine = create_engine('mssql+pyodbc://@' + 'DESKTOP-8FANH7R' + '/' + 'Mechazone' + '?trusted_connection=yes & driver=ODBC Driver 17 for SQL Server')

#engine = create_engine('mssql+pyodbc://@' + 'DESKTOP-E5BITMF' + '/' + 'Mechazone' + '?trusted_connection=yes & driver=SQL Server')
#engine = create_engine('mssql+pyodbc://@DESKTOP-E5BITMF/Mechazone?trusted_connection=yes&driver=SQL+Server')
#engine = create_engine('mssql+pyodbc://@' + 'HP' + '/' + 'Mechazone' + '?trusted_connection=yes & driver=ODBC Driver 17 for SQL Server')



from sqlalchemy import String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Integer,Float
from sqlalchemy.orm import Session

class Base:
    pass
    #_allow_unmapped_ = True


Base = declarative_base(cls=Base)
  

class bikes(Base):
    __tablename__ = "bikes"

    bike_id: int = Column(Integer, primary_key=True)
    model: str = Column(String,nullable=False )
    price: str = Column(Float, nullable = False)
    year :int = Column(Integer,nullable=False )

class cars(Base):
    __tablename__ = "cars"

    car_id: int = Column(Integer, primary_key=True)
    model: str = Column(String,nullable=False )
    price: float = Column(Float, nullable = False)
    year: int = Column(Integer, nullable = False)
    

class Users(Base):
    __tablename__ = "Users"

    UserId: int = Column(Integer, primary_key=True)
    Name: str = Column(String(255))
    ContactId: str = Column(String(10), nullable=False)
    Email: str = Column(String(255), nullable=False)
    Address: str = Column(String(255), nullable=False)
    ZipCode: str = Column(String(20), nullable=False)
    UserName: str = Column(String(255), nullable=False)
    Password: str = Column(String(255), nullable=False)
    
class Car_Spares(Base):
    __tablename__ = "Car_Spares"

    s_id: int = Column(Integer, primary_key=True)
    name: str = Column(String,nullable=False )
    price: float = Column(Float, nullable = False)
    warranty: int = Column(Integer, nullable = True)
    c_id: int = Column(Integer, nullable = False)  


class Bike_Spares(Base):
    __tablename__ = "Bike_Spares"

    s_id: int = Column(Integer, primary_key=True)
    name: str = Column(String,nullable=False )
    price: float = Column(Float, nullable = False)
    warranty: int = Column(Integer, nullable = True)
    c_id: int = Column(Integer, nullable = False)     
   


def register_db(req):
    from sqlalchemy import insert
    stmt = insert(Users).values(Name=req['Name'], ContactId=req['ContactId'],Email=req['Email'],Address=req['Address'],ZipCode=req['ZipCode'],UserName=req['UserName'],Password=req['Password'])
    compiled = stmt.compile()
    with engine.connect() as conn:
        result = conn.execute(stmt)
        conn.commit()
    return {"issuccess": True} 

def login_db(req):
    try:
        from sqlalchemy import text
        with Session(engine) as session:
            
            sql_statement = text("SELECT * FROM Users WHERE UserName = :userName and Password = :password" )
            query = session.query(Users).from_statement(sql_statement)
            query = query.params(userName=req['UserName'],password = req['Password'])

           
            result = query.first()
            response = {
                "userId": result.UserId,
                "name" : result.Name,
                "contactId": result.ContactId,
                "email": result.Email,
                "userName": result.UserName,
                "address": result.Address,
                "zipCode": result.ZipCode
            }
           
            return response
    except Exception as e:
        print(e)
        return {}        
        
def getAllBikesFrom_db():
    try:
        
        from sqlalchemy import text
        with Session(engine) as session:
            print("session")
            sql_statement = text("SELECT * FROM bikes" )
            query = session.query(bikes).from_statement(sql_statement)
            bikesresult = query.all()
            bikesList= []
            
            for bike in bikesresult:
                bikesList.append({
                "bike_id": bikes.bike_id,
                "model" : bikes.model,
                "year": bikes.year,
                "price": bikes.price,
                
            })
           
            return bikesList
    except Exception as e:
        print(e)
        return {}   

def getAllCarsFrom_db():
    try:
        
        from sqlalchemy import text
        with Session(engine) as session:
            print("session")
            sql_statement = text("SELECT * FROM cars" )
            query = session.query(cars).from_statement(sql_statement)
        
            carsResult = query.all()
            carsList = []
            for car in carsResult:
                carsList.append({
                    "car_id": car.car_id,
                    "model" : car.model,
                    "year": car.year,
                    "price": car.price,
                })
                
           
            return carsList

    except Exception as e:
        print(e)


     
        return{}

    
def getAllSparesForCars(req):
    try:
        from sqlalchemy import text
        with Session(engine) as session:
            sql_statement = text("SELECT * FROM Car_Spares where car_id=:carId" )
            query = session.query(Car_Spares).from_statement(sql_statement)
            query = query.params(carId=req['carId'])
            sparesResult = query.all()
            spares = []
            for spare in sparesResult:
                spares.append({
                    "s_id": spare.s_id,
                    "name": spare.name,
                    "price": spare.price,
                    "warranty": spare.warranty
                })

            return spares
    except Exception as e:
        print(e)

        return [{}]
    
def getAllSparesForBikes(req):
    try:
        from sqlalchemy import text
        with Session(engine) as session:
            sql_statement = text("SELECT * FROM Bike_Spares where bike_id=:bikeId" )
            query = session.query(Bike_Spares).from_statement(sql_statement)
            query = query.params(bikeId=req['bikeId'])
            sparesResult = query.all()
            spares = []
            for spare in sparesResult:
                spares.append({
                    "s_id": spare.s_id,
                    "name": spare.name,
                    "price": spare.price,
                    "warranty": spare.warranty
                })

            return spares
    except Exception as e:
        print(e)
        return [{}]


