from django.contrib import admin
from . import models
# # Register your models here.
@admin.register(models.Post_about)
class postAdmin(admin.ModelAdmin):
    list_display = ['title', 'whose_post', 'time']
    ordering = ['time']
    
    
admin.site.register(models.type_of)
    
@admin.register(models.user)
class userAdmin(admin.ModelAdmin):
    list_display = ['name', 'last_name']