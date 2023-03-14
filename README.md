
```bash  
docker run --name rabbit -p 5672:5672 -d rabbitmq
```
En app hacer los archivos  
* celery.py  
* celeryconfig.py  
* task.py  


En ` celery.py `  

```py
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')

broker = 'pyamqp://guest@localhost//'
celery_app = Celery('task', include = ['app.task'], broker=broker)

celery_app.config_from_object('django.conf:settings', namespace='CELERY')

celery_app.autodiscover_tasks()

from celery.schedules import crontab

```  

En ` celeryconfig.py `  

```py
CELERY_IMPORTS = ("tasks", )
CELERY_RESULT_BACKEND = "amqp"
BROKER_URL = "amqp://guest:guest@localhost:5672//"
CELERY_TASK_RESULT_EXPIRES = 300
```


En ` task.py `  

```py
from app.celery import celery_app

@celery_app.task
def tu_funcion(saludo):
    print(saludo)

```


En ` settings.py ` agregar la configuracion de celery  

```py  
...

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')

CELERY_TIMEZONE = 'America/Mexico_City'
CELERY_TASK_TRACK_STARTED = True
CELERY_IMPORTS=("app.task")

...
```  

En ` app/__init__.py ` agregar  
  
```py  
from __future__ import absolute_import, unicode_literals

from .celery import celery_app

__all__ = ('celery_app',)
```  

Las funciones va en task.py  
Ejemplo para mandarlas a llamar en ` apis/api.py `  

```py
ejecutar_el = datetime.datetime.utcnow() + datetime.timedelta(seconds=30)
tu_funcion.apply_async(args=['hola que tal'], eta=ejecutar_el)
```  

Para poner a escuchar a celery en la consola  
A la altura de manage.py  

```bash  
celery -A app.task worker -l info  
```


(https://www.youtube.com/watch?v=QZQZQZQZQZQ)[https://www.youtube.com/watch?v=QZQZQZQZQZQ]