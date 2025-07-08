from django.db import models

# Create your models here.


class elector(models.Model):
    nacionalidad = models.CharField(max_length=10)
    cedula = models.IntegerField(primary_key=True)
    papellido = models.CharField(max_length=50)
    sapellido = models.CharField(max_length=50)
    pnombre = models.CharField(max_length=50)
    snombre = models.CharField(max_length=50)
    cv = models.CharField(max_length=100)
    municipio = models.CharField(max_length=50)
    parroquia = models.CharField(max_length=50)
