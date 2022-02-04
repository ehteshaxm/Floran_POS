from django.db import models

class Bill_of_material(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    description = models.TextField()
        
    receipe = models.TextField()

