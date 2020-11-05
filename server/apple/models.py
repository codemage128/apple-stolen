from django.db import models

# Create your models here.
class Juice(models.Model):
    type = models.CharField(max_length=255)
    name = models.CharField(blank=True, max_length=255)
    percent = models.FloatField()
    amount = models.FloatField()
class Stolean(models.Model):
    name = models.CharField(blank=True, max_length=255)
    percent = models.FloatField()
    amount = models.FloatField()
class Water(models.Model):
    name = models.CharField(blank=True, max_length=255)
    percent = models.FloatField()
    amount = models.FloatField()