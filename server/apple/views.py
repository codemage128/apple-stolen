from django.http import HttpResponse, JsonResponse
from .models import Juice, Stolean, Water
from django.views.decorators.csrf import csrf_exempt
import json
from django.core import serializers


@csrf_exempt
def get_juice_data(request):
    resData = ""
    if request.method == 'GET':
        pass
    elif request.method == 'POST':
        type = request.POST.get('type')
        print(type)
        juices = Juice.objects.filter(type=type).values()
        resData = {"data": list(juices)}
    return JsonResponse(resData)


@csrf_exempt
def add_water(request):
    resData = ""
    if request.method == 'GET':
        pass
    elif request.method == 'POST':
        req = request.POST.get('type')
        _json = json.loads(req)
        Stolean.objects.all().delete()
        Water.objects.all().delete()
        for item in _json['array']:
            Stolean.objects.create(name=item['name'], amount=item['amount'], percent=item['percent'])
            Water.objects.create(name=item['name'], amount=item['amount'], percent=item['percent'])
        waters = Water.objects.all()
        _data = []
        for item in waters:
            if item.name == "Sugar":
                water = Water.objects.get(pk=item.id)
                water.amount += 92.5
                water.save()
            _data.append(item)
        _data = Water.objects.all().values()
        resData = {"data": list(_data)}
    return JsonResponse(resData)
