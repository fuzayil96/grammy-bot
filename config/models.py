from django.db import models

# Create your models here.


class user(models.Model):
    name = models.CharField(max_length=18)
    last_name  = models.CharField(max_length=125)
    def __str__(self) -> str:
        return self.name
    
class type_of(models.Model):
    type_of_post = models.CharField(max_length=18)
    def __str__(self) -> str:
        return self.type_of_post


class Post_about(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField()
    photo = models.ImageField(unique=True, upload_to='images/')
    whose_post = models.ForeignKey(user, on_delete=models.PROTECT, null=True, blank=True)
    type_post = models.ForeignKey(type_of,  on_delete=models.PROTECT, null=True, blank=True)
    time = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.title