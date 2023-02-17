from django.urls import path
from . import views


urlpatterns = [
    path("", views.Post),
    path('economy',views.Economy, name="iqtisod"),
    path('jamiyat',views.Jamiyat, name='jamiyat'),
    path('siyosat',views.Siyosat, name='siyosat'),
    path('sport',views.Sport, name='sport'),
]