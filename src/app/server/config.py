SECRET_KEY = '123456789'

DATABASE_FILE = ''
SQLALCHEMY_DATABASE_URI = 'postgresql://admin:admin@db/animaldb'
SQLALCHEMY_ECHO = True

SECURITY_URL_PREFIX = "/view"
SECURITY_PASSWORD_HASH = "pbkdf2_sha512"
SECURITY_PASSWORD_SALT = "123456789abcdef"

SECURITY_LOGIN_URL = "/login/"
SECURITY_LOGOUT_URL = "/logout/"
SECURITY_REGISTER_URL = "/register/"

SECURITY_POST_LOGIN_VIEW = "/admin/"
SECURITY_POST_LOGOUT_VIEW = "/view/"
SECURITY_POST_REGISTER_VIEW = "/view/"

SECURITY_REGISTERABLE = False
SECURITY_SEND_REGISTER_EMAIL = False
SQLALCHEMY_TRACK_MODIFICATIONS = False
