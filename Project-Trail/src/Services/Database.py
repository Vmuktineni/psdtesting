from flask import jsonify
from numpy import insert
from sqlalchemy import Enum, LargeBinary, and_, create_engine, update
from sqlalchemy import select
import base64
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
from sqlalchemy import insert
from sqlalchemy import text





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
    image: str = Column(LargeBinary,nullable=True)

class Car_Spares(Base):
    __tablename__ = "Car_Spares"

    s_id: int = Column(Integer, primary_key=True)
    name: str = Column(String,nullable=False )
    price: float = Column(Float, nullable = False)
    warranty: int = Column(Integer, nullable = True)
    car_id: int = Column(Integer, nullable = False)  

class Bike_Spares(Base):
    __tablename__ = "Bike_Spares"

    s_id: int = Column(Integer, primary_key=True)
    name: str = Column(String,nullable=False )
    price: float = Column(Float, nullable = False)
    warranty: int = Column(Integer, nullable = True)
    c_id: int = Column(Integer, nullable = False)     
   

class Bikes(Base):
    __tablename__ = "bikes"

    bike_id: int = Column(Integer, primary_key=True)
    model: str = Column(String,nullable=False )
    price: str = Column(Float, nullable = False)
    year :int = Column(Integer,nullable=False )
    brand: str = Column(String,nullable=False)



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


class CartItems(Base): #D
    __tablename__ = "CartItems"

    cart_item_id: int = Column(Integer, primary_key=True)
    user_id: int = Column(Integer, nullable=False)
    s_id: int =  Column(Integer, nullable=False)

class BikeCartItems(Base):#d
    __tablename__ = "BikeCartItems"

    cart_item_id: int = Column(Integer, primary_key=True)
    user_id: int = Column(Integer, nullable=False)
    s_id: int =  Column(Integer, nullable=False)

class ShoppingCart(Base): #V
    __tablename__ = "shopping_cart_table"

    Cart_id: int = Column(Integer,primary_key=True)
    user_id: int = Column(Integer,nullable=False)
    price: int = Column(Integer,nullable=False)
    discount_percent: int = Column(Integer,nullable=False)
    amount: int = Column(Integer,nullable=False)
    delivery_type_options = ['Home', 'Store']
    delivery_type: str = Column(Enum(*delivery_type_options), nullable=False)
    status: str = Column(String, nullable=False)
    date_created: str = Column(String,nullable=False)

def update_delivery_type(req_data): #v
    try:
        cart_id = req_data.get('cart_id')
        user_id = req_data.get('user_id')
        delivery_type = req_data.get('delivery_type')

        if cart_id is None or user_id is None or delivery_type is None:
            return {"issuccess": False, "message": "Missing required parameters"}

        if delivery_type not in ShoppingCart.delivery_type_options:
            return {"issuccess": False, "message": "Invalid delivery_type"}

        smt = update(ShoppingCart).where(and_(ShoppingCart.Cart_id == cart_id, ShoppingCart.user_id == user_id)).values(
            delivery_type=delivery_type
        )
        smt.compile()

        with Session(engine) as conn:
            result = conn.execute(smt)
            conn.commit()

        return {"issuccess": True, "message": "Delivery type updated successfully"}

    except Exception as e:
        print(f"Failed to update delivery type: {str(e)}")
        return {"issuccess": False, "message": str(e)}   
     

def prepareShoppingCart(req):#v

    try:
        cartItems= getCartItems(req) 
        sparePartInfo = getSparePartAmount(cartItems)
        price = sparePartInfo.get('totalPrice')
        discount = 10
        amount = price-(price*discount)/100
        smt = insert(ShoppingCart).values(user_id=req['user_id'], price= price,discount_percent= discount,amount=amount,status='created')
        smt.compile()
        with engine.connect() as conn:
            result = conn.execute(smt)
            conn.commit()
        shoppingCart = {
            'amount': amount,
            'discount': (price*discount)/100,
            'price': price,
            'sparesInfo': sparePartInfo.get('spareParts')

        }
        return {"issuccess": True, 'shoppingCart':shoppingCart}
    except Exception as e:
        print(f"Failed to prepare shopping cart: {str(e)}")
        return {"issuccess": False, "message": str(e)} 
    
    
def getCartItems(req):#V
    try:
        with Session(engine) as session:
            sql_statement = text("SELECT * FROM CartItems where user_id=:user_id " )
            query = session.query(CartItems).from_statement(sql_statement)
            query = query.params(user_id=req['user_id'])
            cartResult = query.all()
            cartItems = []
            for item in cartResult:
                cartItems.append(item.s_id)
            return cartItems
    except Exception as e:
        print(e)
        return []
    
def getSparePartAmount(s_ids):#V
    try:
        with Session(engine) as session:
            query = session.query(Car_Spares).filter(Car_Spares.s_id.in_(s_ids))
            parts = query.all()
            price = 0
            spareParts = []
            for part in parts:
                price += part.price
                spareParts.append({
                    "name": part.name,
                    "price": part.price,
                    "warranty": part.warranty
                })
            return {'totalPrice':price,'spareParts':spareParts}
    except Exception as e:
        print(e)
        return 0
        



def addBike_item_to_cart(req):#D
    from sqlalchemy import insert
    try:
        stmt = insert(BikeCartItems).values(user_id=req['user_id'], s_id=req['s_id'])
        stmt.compile()
        with engine.connect() as conn:
            result = conn.execute(stmt)
            conn.commit()
        return {"issuccess": True}
    except Exception as e:
        print(f"Failed to add item to cart: {str(e)}")
        return {"issuccess": False, "message": str(e)}        
    

def addCar_item_to_cart(req):#D
    from sqlalchemy import insert
    try:
        stmt = insert(CartItems).values(user_id=req['user_id'], s_id=req['s_id'])
        stmt.compile()
        with engine.connect() as conn:
            result = conn.execute(stmt)
            conn.commit()
        return {"issuccess": True}
    except Exception as e:
        print(f"Failed to add item to cart: {str(e)}")
        return {"issuccess": False, "message": str(e)}
    


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
            sql_statement = text("SELECT * FROM cars" )
            query = session.query(Cars).from_statement(sql_statement)
        
            carsResult = query.all()
            carsList = []
            for car in carsResult:
                image_data = car.image
                base64_image = ""
                if image_data:
                    base64_image = base64.b64encode(image_data).decode('utf-8')
                carsList.append({
                    "car_id": car.car_id,
                    "model" : car.model,
                    "year": car.year,
                    "price": car.price,
                    "image": base64_image,
                    "brand": car.brand
                })
            return []
    except Exception as e:
        print(e)
        return [{}]
    
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
    

def getBikeBrands(req):
    try:
        with Session(engine) as session:
            query= session.query(Bikes).filter(Bikes.brand.like("%"+req['brand']+"%"))
            brandsResult = query.all()
            brands=[]
            for brand in brandsResult:
                brands.append(brand.brand)
            return brands
    except Exception as e:
        print(e)
        return []  
    
def getBikeModelsByBrand(req):
    try:
        from sqlalchemy import text
        with Session(engine) as session:
            sql_statement = text("select * from bikes where brand = :brand")
            query = session.query(Bikes).from_statement(sql_statement)
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


def getBrandModelCarParts(req):
    try:
        from sqlalchemy import text
        with Session(engine) as session:
            sql_statement = text("SELECT * FROM Car_Spares where car_id  in  (select car_id  from cars WHERE brand = :brand AND model = :model)")
            query = session.query(Car_Spares).from_statement(sql_statement)
            query = query.params(brand=req['brand'], model=req['model'])
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

def getBrandModelBikeParts(req):
    try:
        from sqlalchemy import text
        with Session(engine) as session:
            sql_statement = text("SELECT * FROM Bike_Spares where bike_id  in  (select bike_id  from bikes WHERE brand = :brand AND model = :model)")
            query = session.query(Bike_Spares).from_statement(sql_statement)
            query = query.params(brand=req['brand'], model=req['model'])
            sparesResult = query.all()
            bikeSpares = []
            for spare in sparesResult:
                bikeSpares.append({
                    "s_id": spare.s_id,
                    "name": spare.name,
                    "price": spare.price,
                    "warranty": spare.warranty
                })

            return bikeSpares
    except Exception as e:
        print(e)
        return [{}]
