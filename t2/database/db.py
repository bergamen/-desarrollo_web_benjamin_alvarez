from sqlalchemy import create_engine, Column, Integer, String, ForeignKey,DateTime,Enum,TIMESTAMP
from sqlalchemy import func,cast,select
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
import json
import enum

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()


class Tipo(enum.Enum):
    gato = "gato"
    perro = "perro"
class Medida(enum.Enum):
    m = "m"
    a = "a"

class Contactos(enum.Enum):
    whatsapp = "whatsapp"
    telegram = "telegram"
    instagram = "instagram"
    X = "X"
    tiktok = "tiktok"
    otra = "otra"


# --- Models ---

class Region(Base):
    __tablename__ = "region"

    id = Column(Integer,primary_key=True,autoincrement=True)
    nombre = Column(String(200),nullable=False)
    Comunas = relationship("Comuna", back_populates="region", cascade="all, delete")

class Comuna(Base):
    __tablename__ = "comuna"

    id = Column(Integer,primary_key=True,autoincrement=True)
    nombre = Column(String(200),nullable=False)
    region_id = Column(Integer,ForeignKey("region.id"),nullable=False)

    region = relationship("Region")
    Avisos = relationship("AvisoAdopcion", back_populates="comuna", cascade="all, delete")

class AvisoAdopcion(Base):
    __tablename__ = "aviso_adopcion"
    id = Column(Integer,primary_key=True,autoincrement=True)
    fecha_ingreso = Column(DateTime,nullable=False)
    comuna_id = Column(Integer,ForeignKey("comuna.id"),nullable = False)
    sector = Column(String(100),nullable=True)
    nombre = Column(String(200),nullable=False)
    email = Column(String(100),nullable=False)
    celular = Column(String(15),nullable=True)
    tipo = Column(Enum(Tipo),nullable=False)
    cantidad = Column(Integer,nullable=False)
    edad = Column(Integer,nullable=False)
    unidad_medida = Column(Enum(Medida),nullable=False)
    fecha_entrega = Column(DateTime,nullable=False)
    descripcion = Column(String(500),nullable=True)

    comuna = relationship("Comuna")
    fotos = relationship("Foto", back_populates="aviso", cascade="all, delete")
    contactos = relationship("ContactarPor", back_populates="contactos", cascade="all, delete")
    comentario = relationship("Comentarios", back_populates="comentario", cascade="all, delete")

class Foto(Base):
    __tablename__ = "foto"

    id = Column(Integer,primary_key=True,autoincrement=True)
    ruta_archivo = Column(String(300),nullable=False)
    nombre_archivo = Column(String(300),nullable=False)
    actividad_id = Column(Integer,ForeignKey("aviso_adopcion.id"),nullable=False)

    aviso = relationship("AvisoAdopcion")

class ContactarPor(Base):
    __tablename__ = "contactar_por"

    id = Column(Integer,primary_key=True,autoincrement=True)
    nombre = Column(Enum(Contactos),nullable=False)
    identificador = Column(String(150),nullable=False)
    actividad_id = Column(Integer,ForeignKey("aviso_adopcion.id"),nullable=False)

    contactos = relationship("AvisoAdopcion")

class Comentarios(Base):
    __tablename__ = "comentario"

    id = Column(Integer,primary_key=True,autoincrement=True)
    nombre = Column(String(80),nullable=False)
    texto = Column(String(300),nullable=False)
    fecha = Column(TIMESTAMP,nullable=False)
    aviso_id = Column(Integer,ForeignKey("aviso_adopcion.id"),nullable=False)

    comentario = relationship("AvisoAdopcion")

# --- Database Functions ---

def get_avisos(id):
    session = SessionLocal()
    adops = session.query(AvisoAdopcion).filter(AvisoAdopcion.id==id).first()
    session.close()
    return adops

def get_contactos_by_id(id):
    session = SessionLocal()
    adops = session.query(ContactarPor).filter(ContactarPor.actividad_id==id).all()
    session.close()
    return adops

def get_fotos_by_id(id):
    session = SessionLocal()
    adops = session.query(Foto).filter(Foto.actividad_id==id).all()
    session.close()
    return adops

def get_latest():
    session = SessionLocal()
    adops = session.query(AvisoAdopcion).order_by(AvisoAdopcion.id.desc()).limit(5).all()
    session.close()
    return adops

def get_last_foto(id):
    session = SessionLocal()
    adops = session.query(Foto).filter(Foto.actividad_id==id).first()
    session.close()
    return [adops.ruta_archivo,adops.nombre_archivo]

def get_page(page):
    session = SessionLocal()
    adops = session.query(AvisoAdopcion).limit(5).offset(5*page).all()
    session.close()
    return adops

def get_fotos(id):
    session = SessionLocal()
    id = session.query(func.count(Foto.nombre_archivo).label("conteo"),Foto.actividad_id).filter(Foto.actividad_id==id).group_by(Foto.actividad_id).first()
    session.close()
    return id.conteo
def get_contactos(id):
    session = SessionLocal()
    id = session.query(ContactarPor.nombre).filter(ContactarPor.actividad_id==id).first()
    session.close()
    return id.nombre
def get_comuna(id):
    session = SessionLocal()
    id = session.query(Comuna.nombre).filter(Comuna.id==id).first()
    session.close()
    return id.nombre
def get_comuna_region(id):
    session = SessionLocal()
    id = session.query(Comuna.region_id).filter(Comuna.id==id).first()
    session.close()
    return id.region_id
def get_region(id):
    session = SessionLocal()
    id = session.query(Region.nombre).filter(Region.id==id).first()
    session.close()
    return id.nombre

def create_adoption(fecha_ingreso,comuna_id,sector,nombre,email,celular,tipo,cantidad,edad,unidad_medida,fecha_entrega,descripcion):
    session = SessionLocal()
    new_adop = AvisoAdopcion(fecha_ingreso=fecha_ingreso,comuna_id=comuna_id,sector=sector,nombre=nombre,email=email,celular=celular,tipo=tipo,cantidad=cantidad,edad=edad,unidad_medida=unidad_medida,fecha_entrega=fecha_entrega,descripcion=descripcion)
    session.add(new_adop)
    session.commit()
    session.close()

def create_fotos(ruta_archivos,nombre_archivos,actividad_id):
    session = SessionLocal()
    new_foto = Foto(ruta_archivo = ruta_archivos, nombre_archivo = nombre_archivos,actividad_id=actividad_id)
    session.add(new_foto)
    session.commit()
    session.close()

def create_contactos(nombres,identificadores,actividad_id):
    session = SessionLocal()
    new_contacto = ContactarPor(nombre = nombres,identificador = identificadores,actividad_id= actividad_id)
    session.add(new_contacto)
    session.commit()
    session.close()

def create_comentario(nombre,text,aviso_id):
    session = SessionLocal()
    new_contacto = Comentarios(nombre = nombre,texto = text,fecha = func.current_timestamp(),aviso_id= aviso_id)
    session.add(new_contacto)
    session.commit()
    session.close()

def get_comentario(id):
    session = SessionLocal()
    id = session.query(Comentarios).filter(Comentarios.aviso_id==id).all()
    session.close()
    return id

def get_last_id():
    session = SessionLocal()
    id = session.query(AvisoAdopcion).order_by(AvisoAdopcion.id.desc()).first()
    session.close()
    return id.id

def cantidad_tipos():
    session = SessionLocal()
    tabla = session.query(AvisoAdopcion.tipo,func.count(AvisoAdopcion.tipo)).group_by("tipo").order_by("tipo").all()
    session.close()
    return tabla
def grafico_linea():
    session = SessionLocal()
    tabla = session.query(func.date(AvisoAdopcion.fecha_ingreso).label('dia'),func.count().label('cantidad_avisos')).group_by(func.date(AvisoAdopcion.fecha_ingreso)).order_by('dia').all()
    session.close()
    return tabla

def grafico_barra():
    session = SessionLocal()
    tabla = session.query((cast(func.extract('year', AvisoAdopcion.fecha_ingreso), String) + '-' +func.lpad(cast(func.extract('month', AvisoAdopcion.fecha_ingreso), String), 2, '0')).label('mes'),cast(AvisoAdopcion.tipo,String),func.count().label('cantidad')).group_by('mes', AvisoAdopcion.tipo).order_by('mes').all()
    session.close()
    return tabla