from flask import Flask, request, render_template, redirect, url_for, session, jsonify
from database import db
from flask_cors import cross_origin
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
    data = []
    for conf in db.get_latest():
       

        comuna = db.get_comuna(conf.comuna_id)
        foto = db.get_last_foto(conf.id)
        conf_img = f"{foto[0]}/{foto[1]}" if foto else "svg/anonymous.svg"

        sector = conf.sector
        if(sector==""):
            sector = "No especificado"


        tipo = str(conf.tipo).split(".")[1]+"s"*(min(1,conf.cantidad-1))

        medida = str(conf.unidad_medida).split(".")[1]

        if(medida=="m"):
            medida = medida + "es" + "es"*(min(1,conf.edad-1))
        else:
            medida = medida + "ño" + "s"*(min(1,conf.edad-1))


        data.append({
            "fecha": conf.fecha_ingreso,
            "comuna":comuna,
            "sector":sector,
            "cantidadEdad":str(conf.cantidad)+" "+tipo+","+str(conf.edad)+" "+medida,
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
    
    tabla = db.get_page(id)
    for conf in tabla:
        print(conf)
        fecha = conf.fecha_ingreso
        fecha_entrega = conf.fecha_entrega

        id0 = conf.id

        conteo = db.get_fotos(id0)
        comuna = db.get_comuna(conf.comuna_id)
        contacto = db.get_contactos(id0)


        sector = conf.sector
        if(sector==""):
            sector = "No especificado"


        tipo = str(conf.tipo.name)+"s"*(min(1,conf.cantidad-1))

        medida = str(conf.unidad_medida.name)

        if(medida=="m"):
            medida = medida + "es" + "es"*(min(1,conf.edad-1))
        else:
            medida = medida + "ño" + "s"*(min(1,conf.edad-1))

        contacto_text = str(contacto).split(".")[1]

        url = url_for('detalle',id=id0)

        data.append({
            "fechaEntrega": fecha_entrega,
            "fechaPublicacion":fecha,
            "comuna": comuna,
            "sector":sector,
            "cantidadEdad": str(conf.cantidad)+" "+tipo+","+str(conf.edad)+" "+medida ,
            "nombre":conf.nombre+",\n"+contacto_text,
            "cantidadFotos": conteo,
            "id":id0,
            "url":url
        })
    atras = id-1
    if atras <0:
        atras = 0
    return render_template("auth/listado.html", data=data,page=id,siguiente=id+1,atras=atras)


@app.route("/detalle/<int:id>",methods=["GET"])
@app.route("/detalle",methods=["GET"])
def detalle(id=None):
    if not id:
        id=0
    # get last adoption
    
    data_contacto = []
    data_foto = []



    avisos = db.get_avisos(id)
    print("aaaa")
    print(avisos)
    fotos = db.get_fotos_by_id(id)
    contactos = db.get_contactos_by_id(id)
    comuna = db.get_comuna(avisos.comuna_id)
    comuna_id = db.get_comuna_region(avisos.comuna_id)
    region = db.get_region(comuna_id)


    

    i=0
    for conf in fotos:
        conf_img = f"{conf.ruta_archivo}/{conf.nombre_archivo}" if conf.nombre_archivo else "svg/anonymous.svg"
        data_foto.append({
            "nombre": url_for('static', filename=conf_img),
            "es":"btn-image-"+str(i),
            "im":"image-"+str(i)
        })
        i+=1

    for conf in contactos:
 
        cont = str(conf.nombre).split(".")[1]

        data_contacto.append({
            "nombre": cont+":"+conf.identificador
        })


    tipos = str(avisos.tipo).split(".")[1]+"s"*min(avisos.cantidad-1,1)
    medida = str(avisos.unidad_medida).split(".")[1]
    if medida =="m":
        medida = "mes"+"es"*min(avisos.edad-1,1)
    else:
        medida = "año"+"s"*min(avisos.edad-1,1)

    data_aviso = {
        "region":region+","+comuna+","+avisos.sector,
        "fecha_entrega":avisos.fecha_entrega,
        "nombre":avisos.nombre,
        "email":avisos.email,
        "datos":str(avisos.cantidad) + " " +tipos+","+str(avisos.edad)+" "+medida,
        "descripcion":avisos.descripcion

    }
    
    print(data_aviso)
    
    return render_template("auth/detalle.html",data_aviso=data_aviso,data_contacto=data_contacto,data_foto=data_foto,id=id)

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

        contacto0 = request.form.get("select-contacto-0")
        identificador0 = request.form.get("identidicador-0")

        contacto1 = request.form.get("select-contacto-1")
        identificador1 = request.form.get("identidicador-1")

        contacto2 = request.form.get("select-contacto-2")
        identificador2 = request.form.get("identidicador-2")

        contacto3 = request.form.get("select-contacto-3")
        identificador3 = request.form.get("identidicador-3")

        contacto4 = request.form.get("select-contacto-4")
        identificador4 = request.form.get("identidicador-4")

        tipo = request.form.get("select-tipo")
        fechaEntrega = request.form.get("fecha")
        fechaPublicacion = request.form.get("fecha-actual")
        cantidad = request.form.get("cantidad")
        edad = request.form.get("edad")
        medida = request.form.get("select-medida")

        fotos0 = request.files.get("files0")
        fotos1 = request.files.get("files1")
        fotos2 = request.files.get("files2")
        fotos3 = request.files.get("files3")
        fotos4 = request.files.get("files4")

        descripcion = request.form.get("descripcion")


        if v.validate_data(region,comuna,sector,nombre,email,telefono,contacto0,identificador0,tipo,fechaEntrega,cantidad,edad,medida,fotos0):
            # 1. generate random name for img
            contactos = []
            contactos.append([contacto0,identificador0])
            if(contacto1):
                contactos.append([contacto1,identificador1])
            if(contacto2):
                contactos.append([contacto2,identificador2])
            if(contacto3):
                contactos.append([contacto3,identificador3])
            if(contacto4):
                contactos.append([contacto4,identificador4])


            fotos = []
            _filename = hashlib.sha256(
                secure_filename(fotos0.filename).encode("utf-8")
                ).hexdigest()
            _extension = filetype.guess(fotos0).extension
            img_filename = f"{_filename}_{str(uuid.uuid4())}.{_extension}"

        # 2. save img as a file
            fotos0.save(os.path.join(app.config["UPLOAD_FOLDER"]+"/"+tipo, img_filename))
            fotos.append([fotos0.filename,img_filename])

            
            if(fotos1):
                _filename = hashlib.sha256(
                secure_filename(fotos1.filename).encode("utf-8")
                ).hexdigest()
                _extension = filetype.guess(fotos1).extension
                img_filename = f"{_filename}_{str(uuid.uuid4())}.{_extension}"

                # 2. save img as a file
                fotos1.save(os.path.join(app.config["UPLOAD_FOLDER"]+"/"+tipo, img_filename))
                fotos.append([fotos1.filename,img_filename])
            if(fotos2):
                _filename = hashlib.sha256(
                secure_filename(fotos2.filename).encode("utf-8")
                ).hexdigest()
                _extension = filetype.guess(fotos2).extension
                img_filename = f"{_filename}_{str(uuid.uuid4())}.{_extension}"

                # 2. save img as a file
                fotos2.save(os.path.join(app.config["UPLOAD_FOLDER"]+"/"+tipo, img_filename))
                fotos.append([fotos2.filename,img_filename])
            if(fotos3):
                _filename = hashlib.sha256(
                secure_filename(fotos3.filename).encode("utf-8")
                ).hexdigest()
                _extension = filetype.guess(fotos3).extension
                img_filename = f"{_filename}_{str(uuid.uuid4())}.{_extension}"

                # 2. save img as a file
                fotos3.save(os.path.join(app.config["UPLOAD_FOLDER"]+"/"+tipo, img_filename))
                fotos.append([fotos3.filename,img_filename])
            if(fotos4):
                _filename = hashlib.sha256(
                secure_filename(fotos4.filename).encode("utf-8")
                ).hexdigest()
                _extension = filetype.guess(fotos4).extension
                img_filename = f"{_filename}_{str(uuid.uuid4())}.{_extension}"

                # 2. save img as a file
                fotos4.save(os.path.join(app.config["UPLOAD_FOLDER"]+"/"+tipo, img_filename))
                fotos.append([fotos4.filename,img_filename])

        # 3. save confession in db
            #fecha_ingreso,comuna_id,sector,nombre,email,celular,tipo,cantidad,edad,unidad_medida,fecha_entrega,descripcion

            db.create_adoption(fechaPublicacion,comuna,sector,nombre,email,telefono,tipo,cantidad,edad,medida,fechaEntrega,descripcion)#region,comuna,sector,nombre,email,telefono,contacto,otro,tipo,fechaEntrega,fechaPublicacion,cantidad,edad,medida,img_filename)
            
            id_0 = db.get_last_id()

            for i in fotos:
                db.create_fotos("uploads"+"/"+tipo,i[1],id_0)
            for i in contactos:
                db.create_contactos(i[0],i[1],id_0)
            
            return redirect(url_for('principal'))
    if request.method == "GET":
        return render_template("auth/adoption.html")

@app.route("/get-stats-data/torta", methods=["GET"])
@cross_origin(origin="127.0.0.1", supports_credentials=True)
def get_stats_data():
    """
    Since we don't have that many confessions yet but we NEED to show off
    our fancy new chart, we are going to generate some random data.
    """

    data = db.cantidad_tipos()

    new_data = [{"name":data[0].tipo.name,"y":data[0][1]},{"name":data[1].tipo.name,"y":data[1][1]}]


    return jsonify(new_data)

@app.route("/get-stats-data/linea", methods=["GET"])
@cross_origin(origin="127.0.0.1", supports_credentials=True)
def get_stats_data_linea():
    """
    Since we don't have that many confessions yet but we NEED to show off
    our fancy new chart, we are going to generate some random data.
    """

    data = db.grafico_linea()


    datos = []

    for i in data:
        datos.append({"dia":i[0],"cantidad_avisos":i[1]})


    return jsonify(datos)

@app.route("/get-stats-data/barra", methods=["GET"])
@cross_origin(origin="127.0.0.1", supports_credentials=True)
def get_stats_data_barra():
    """
    Since we don't have that many confessions yet but we NEED to show off
    our fancy new chart, we are going to generate some random data.
    """

    data = db.grafico_barra()

    print(data)

    datos = []

    for i in data:
        datos.append({"mes":i[0],"tipo":i[1],"cantidad":i[2]})


    return jsonify(datos)

@app.route('/agregar_comentario', methods=['POST'])
@cross_origin(origin="127.0.0.1", supports_credentials=True)
def agregar_comentario():
    data = request.get_json()

    nombre = (data.get('nombre') or '').strip()
    texto = (data.get('texto') or '').strip()
    aviso_id = data.get('aviso_id')

    if not aviso_id or not nombre or not texto:
        return jsonify({'error': 'Faltan datos obligatorios.'}), 400

    if len(nombre) < 3 or len(nombre) > 80:
        return jsonify({'error': 'El nombre debe tener entre 3 y 80 caracteres.'}), 400

    if len(texto) < 5:
        return jsonify({'error': 'El comentario debe tener al menos 5 caracteres.'}), 400


    db.create_comentario(nombre,texto,aviso_id)

    return jsonify({'mensaje': 'Comentario agregado correctamente.'}), 200

@app.route('/comentarios/<int:aviso_id>')
@cross_origin(origin="127.0.0.1", supports_credentials=True)
def obtener_comentarios(aviso_id):
    comentarios = db.get_comentario(aviso_id)
    print(comentarios)
    return jsonify([
        {
            'fecha': c.fecha.strftime('%Y-%m-%d %H:%M'),
            'nombre': c.nombre,
            'texto': c.texto
        } for c in comentarios
    ])


if __name__ == "__main__":
    app.run(debug=True)