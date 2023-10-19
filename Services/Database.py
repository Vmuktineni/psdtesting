from flask import jsonify
from numpy import insert
from sqlalchemy import create_engine
from sqlalchemy import select
#from sqlalchemy import filter, filter_by


#engine = create_engine('mssql+pyodbc://@' + DESKTOP-8FANH7R + '/' + BWorks + '?trusted_connection=yes&driver=ODBC+Driver+13+for+SQL+Server  driver=SQL Server Native Client 11.0')')

engine = create_engine('mssql+pyodbc://@' + 'VINEETHA\MSSQL' + '/' + 'Mechazone' + '?trusted_connection=yes & driver=ODBC Driver 17 for SQL Server')

#engine = create_engine('mssql+pyodbc://@' + 'DESKTOP-8FANH7R' + '/' + 'BWorks' + '?trusted_connection=yes&driver=SQL Server', use_setinputsizes=False)

from datetime import datetime
from sqlalchemy import ForeignKey,DateTime,Boolean
from sqlalchemy import String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy.orm import relationship
from sqlalchemy import Integer,Float
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Session

# qualify the base with _allow_unmapped_.  Can also be
# applied to classes directly if preferred
class Base:
    pass
    #_allow_unmapped_ = True


Base = declarative_base(cls=Base)

# existing mapping proceeds, Declarative will ignore any annotations
# which don't include ``Mapped[]``
class Cars(Base):
    __tablename__ = "cars"

    car_id: int = Column(Integer, primary_key=True)
    model: str = Column(String,nullable=False )
    price: float = Column(Float, nullable = False)
    year: int = Column(Integer, nullable = False)
    brand: str = Column(String,nullable=False)
   

class Bikes(Base):
    __tablename__ = "bikes"

    bike_id: int = Column(Integer, primary_key=True)
    model: str = Column(String,nullable=False )
    price: str = Column(Float, nullable = False)
    year :int = Column(Integer,nullable=False )

class Users(Base):
    __tablename__ = "Users"

    UserId: int = Column(Integer, primary_key=True)
    Name: str = Column(String,nullable=False )
    ContactId: int = Column(Integer, nullable = False)
    Email: str = Column(String, nullable = False)
    Address: str = Column(String, nullable = False)
    ZipCode: str = Column(String,nullable = False)
    UserName: str = Column(String, nullable = False)
    Password: str = Column(String, nullable = False)

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
        
def getAllCarsFrom_db():
    try:
        
        from sqlalchemy import text
        with Session(engine) as session:
            print("session")
            sql_statement = text("SELECT * FROM cars" )
            query = session.query(Cars).from_statement(sql_statement)
        
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
        return [{}]
    
def getBrands(req):
    try:
        with Session(engine) as session:
            query= session.query(Cars).filter(Cars.brand.like("%"+req['brand']+"%"))
            brandsResult = query.all()
            brands=[]
            for brand in brandsResult:
                brands.append(brand.brand)
            return brands
    except Exception as e:
        print(e)
        return []    
    
def getModelsByBrand(req):
    try:
        from sqlalchemy import text
        with Session(engine) as session:
            sql_statement = text("select * from cars where brand = :brand")
            query = session.query(Cars).from_statement(sql_statement)
            query = query.params(brand=req['brand'])
            modelsResult = query.all()
            models=[]
            for model in modelsResult:
                models.append(model.model)
            return models
    except Exception as e:
        print(e)
        return []
        


    
def getAllBikesFrom_db():
    try:
        
        from sqlalchemy import text
        with Session(engine) as session:
            print("session")
            sql_statement = text("SELECT * FROM bikes" )
            query = session.query(Bikes).from_statement(sql_statement)
            bikesresult = query.all()
            bikesList= []
            
            for bike in bikesresult:
                bikesList.append({
                "bike_id": Bikes.bike_id,
                "model" : Bikes.model,
                "year": Bikes.year,
                "price": Bikes.price,
                
            })
           
            return bikesList
    except Exception as e:
        print(e)
        return {}    