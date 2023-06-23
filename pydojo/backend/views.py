from django.shortcuts import render,HttpResponse,HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User

# Create your views here.

def index_page(request):
    return render(request,'index.html')

def login_page(request):
    if request.method =="POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect("homepage")
        else:
            messages.warning(request, "Invalid credintials please try again!!")
            return HttpResponseRedirect("/")
    else:
        return HttpResponse(render(request,'login_page.html'))

def signup_page(request):
    if request.method == "POST":
        username = request.POST['username']
        # email = request.POST['email']
        pswd1 = request.POST['pswd1']
        pswd2 = request.POST['pswd2']
        if pswd1 == pswd2:
            if User.objects.all().filter(username=username).exists():
                messages.warning(request,'Username Already Exists')
                return HttpResponseRedirect('signup')
            else:
                new_user = User.objects.create_user(username, password=pswd1)
                new_user.save();
                messages.success(request,"Successfully create an account please, login now")
                return HttpResponseRedirect('signup')
        else:
            messages.warning(request,'password doesnt match')
            return HttpResponseRedirect('signup')
    
    else:
        return HttpResponse(render(request, 'signup.html'))