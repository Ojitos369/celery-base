# Python
import os
import json
import datetime

# Ojitos369
from ojitos369.utils import get_d

# User
from app.core.base_apis.apis import PostApi, GetApi
from app.task import tu_funcion

class HelloWorld(GetApi):
    def main(self):
        ejecutar_el = datetime.datetime.utcnow() + datetime.timedelta(seconds=30)
        tu_funcion.apply_async(args=['hola que tal'], eta=ejecutar_el)

        self.response = {
            'message': 'Hello World'
        }

