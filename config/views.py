from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .models import Post_about, type_of

# Create your views here.


def Post(request):
    Posts = Post_about.objects.filter(time__year=2023).order_by('-time','title')
    type_of_post = type_of.objects.all()
    return render(request, "index.html",{"Posts":Posts, "types":type_of_post })

def Economy(request):
    Economies = Post_about.objects.filter(type_post=1).filter(time__year=2023).order_by('-time','title')
    return render(request, "iqtisodiyot.html",{'economies':Economies})
def Sport(request):
    sports = Post_about.objects.filter(type_post=2).filter(time__year=2023).order_by('-time','title')
    return render(request, "sport.html",{'sports':sports})
def Siyosat(request):
    siyosats = Post_about.objects.filter(type_post=3).filter(time__year=2023).order_by('-time','title')
    return render(request, "siyosat.html",{'siyosats':siyosats})
def Jamiyat(request):
    jamiyats = Post_about.objects.filter(type_post=4).filter(time__year=2023).order_by('-time','title')
    return render(request, "jamiyat.html",{'jamiyats':jamiyats})