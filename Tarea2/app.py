from flask import Flask, request, render_template, redirect, url_for, session
from database import db
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os
import uuid
import utils.validations as v

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)
app.secret_key = "secret_key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

@app.route("/",methods = ["GET"])
def index():
    return redirect(url_for('principal'))

@app.route("/principal", methods=["GET"])
def principal():

    # get last adoption
    PAGE_SIZE = 5
    data = []
    for conf in db.get_ultimos():
        conf_img = f"uploads/{conf.fotos}" if conf.fotos else "svg/anonymous.svg"

        fecha = conf.fechaPublicacion.split("T")[0]+" "+conf.fechaPublicacion.split("T")[1]

        data.append({
            "fecha": fecha,
            "region": conf.region,
            "comunaSector": conf.comuna+","+conf.sector,
            "cantidadEdad": str(conf.cantidad)+" "+conf.tipo+","+str(conf.edad)+" "+conf.medida ,
            "path_image": url_for('static', filename=conf_img)
        })
    
    return render_template("auth/principal.html", data=data)

@app.route("/listado/<int:id>",methods=["GET"])
@app.route("/listado",methods=["GET"])
def listado(id=None):
    if not id:
        id=0
    # get last adoption
    data = []
    for conf in db.get_adoptions(id):

        fecha = conf.fechaPublicacion.split("T")[0]+" "+conf.fechaPublicacion.split("T")[1]

        data.append({
            "fechaEntrega": fecha,
            "fechaPublicacion":fecha,
            "comuna": conf.comuna,
            "sector":conf.sector,
            "cantidadEdad": str(conf.cantidad)+" "+conf.tipo+","+str(conf.edad)+" "+conf.medida ,
            "nombre":conf.nombre,
            "cantidadFotos": 1
        })
    
    atras = id-1
    if atras <0:
        atras = 0
    return render_template("auth/listado.html", data=data,page=id,siguiente=id+1,atras=atras)

@app.route("/estadisticas",methods=["GET"])
def estadisticas():
    return render_template("auth/estadisticas.html")

@app.route("/adoption", methods=["POST","GET"])
def adoption():
    if request.method == "POST":
        region = request.form.get("select-region")
        comuna = request.form.get("select-comuna")
        sector = request.form.get("sector")
        nombre = request.form.get("nombre")
        email = request.form.get("email")
        telefono = request.form.get("phone")
        contacto = request.form.get("select-contacto")
        otro = request.form.get("otro-contacto")
        tipo = request.form.get("select-tipo")
        fechaEntrega = request.form.get("fecha")
        fechaPublicacion = request.form.get("fecha")
        cantidad = request.form.get("cantidad")
        edad = request.form.get("edad")
        medida = request.form.get("select-medida")
        fotos = request.files.get("files")


        if v.validate_data(region,comuna,sector,nombre,email,telefono,contacto,otro,tipo,fechaEntrega,cantidad,edad,medida,fotos):
            # 1. generate random name for img
            _filename = hashlib.sha256(
                secure_filename(fotos.filename).encode("utf-8")
                ).hexdigest()
            _extension = filetype.guess(fotos).extension
            img_filename = f"{_filename}_{str(uuid.uuid4())}.{_extension}"

        # 2. save img as a file
            fotos.save(os.path.join(app.config["UPLOAD_FOLDER"], img_filename))

        # 3. save confession in db
            db.create_adoption(region,comuna,sector,nombre,email,telefono,contacto,otro,tipo,fechaEntrega,fechaPublicacion,cantidad,edad,medida,img_filename)
            return redirect(url_for('principal'))
    if request.method == "GET":
        return render_template("auth/adoption.html")

if __name__ == "__main__":
    app.run(debug=True)