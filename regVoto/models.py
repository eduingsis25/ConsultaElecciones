from django.db import models

# Create your models here.


class votante(models.Model):
    cedula = models.IntegerField(primary_key=True)
    nacionalidad = models.CharField(max_length=10)
    papellido = models.CharField(max_length=50)
    sapellido = models.CharField(max_length=50, blank=True, null=True)
    pnombre = models.CharField(max_length=50)
    snombre = models.CharField(max_length=50, blank=True, null=True)
    cv = models.CharField(max_length=100)
    municipio = models.CharField(max_length=50)
    parroquia = models.CharField(max_length=50)
    voto = models.BooleanField(default=True)
