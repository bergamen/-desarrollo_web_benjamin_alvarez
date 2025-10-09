from sqlalchemy import create_engine, Column, Integer, BigInteger, String, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
import json

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

# --- Models ---


class Adoption(Base):
    __tablename__ = 'adoptions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    region = Column(String(50))
    comuna = Column(String(50),nullable=False)
    sector = Column(String(100),nullable=True)
    nombre = Column(String(200),nullable=False)
    email = Column(String(100),nullable=False)
    telefono = Column(String(15),nullable = True)
    otro = Column(String(255),nullable=True)
    tipo = Column(String(5),nullable=False)
    fecha_ingreso = Column(String(50),nullable=False)
    fecha_entrega = Column(String(50),nullable=False)
    cantidad = Column(Integer,nullable=False)
    edad = Column(Integer,nullable=False)
    medida = Column(String(10),nullable=False)



# --- Database Functions ---

def get_adoptions(page):
    session = SessionLocal()
    adops = session.query(Adoption).offset(page*5).all()
    session.close()
    return adops

def get_ultimos():
    session = SessionLocal()
    adops = session.query(Adoption).all()
    session.close()
    return adops

def create_adoption(region,comuna,sector,nombre,email,telefono,contacto,otro,tipo,fechaEntrega,fechaPublicacion,cantidad,edad,medida,fotos):
    session = SessionLocal()
    new_adop = Adoption(region=region,comuna=comuna,sector=sector,nombre=nombre,email=email,telefono=telefono,contacto=contacto,otro=otro,tipo=tipo,fechaEntrega=fechaEntrega,fechaPublicacion=fechaPublicacion,cantidad=cantidad,edad=edad,medida=medida,fotos=fotos)
    session.add(new_adop)
    session.commit()
    session.close()

