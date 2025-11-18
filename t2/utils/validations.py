import re
import filetype

def validate_email(value):
    return "@" in value

def validate_number(number):
    return number >= 1

def validate_text(text,min,max):
    return (len(text)>=min) and (len(text)<=max)


def validate_conf_img(conf_img):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}

    # check if a file was submitted
    if conf_img is None:
        return False

    # check if the browser submitted an empty file
    if conf_img.filename == "":
        return False
    
    # check file extension
    ftype_guess = filetype.guess(conf_img)
    if ftype_guess.extension not in ALLOWED_EXTENSIONS:
        return False
    # check mimetype
    if ftype_guess.mime not in ALLOWED_MIMETYPES:
        return False
    return True

def validateContacto(contacto):
    contactos = ['whatsapp', 'telegram', 'X', 'instagram', 'tiktok', 'otra']
    if contacto in contactos:
        return True
    else:
        return False

def validate_data(region,comuna,sector,nombre,email,telefono,contacto,otro,tipo,fecha,cantidad,edad,medida,fotos):
    isValid = True

    isValid = isValid and validate_number(int(comuna))
    isValid = isValid and validate_text(nombre,3,200)
    isValid = isValid and validate_email(email)
    isValid = isValid and validateContacto(contacto)
    isValid = isValid and validate_number(int(cantidad))
    isValid = isValid and validate_number(int(edad))

    return isValid