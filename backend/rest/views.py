from django.shortcuts import render

from django.contrib.auth import login
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.views import APIView

from .serializers import UserSerializer, RegisterSerializer
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from knox.auth import TokenAuthentication
from .models import Friend, Location
from django.contrib.auth.models import User
from django.core import serializers
import json

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # user = User.objects.get(username=username)
        # print(user.pk)
        # print(request.data)
        # profile = Profile.objects.get(user_id=user.pk)
        # profile.country = request.data['country']
        # profile.save()

        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })

class verifyToken(APIView):

    def post(self, request, token):
        authToken = AuthToken.objects.get(token_key=token[:8])
        user_id = authToken.user_id
        user = User.objects.get(pk=user_id)
        users = User.objects.all()
        json_user = serializers.serialize('json', [user,]) # serialize single instance
        json_users = serializers.serialize('json', users) # serialize multiple instances

        return Response({
        "user": user.username,
        "token": token
        })
        # return Response(json.loads(json_users))

class friendsView(APIView):

    def get(self, request, user):

        userId = User.objects.get(username=user)
        friends = Friend.objects.filter(user=userId)
        friends_json = serializers.serialize('json', friends)

        return  Response(json.loads(friends_json))

    def post(self, request, user):
        userId = User.objects.get(username=user)
        newFriend = request.data['friend']

        friend = Friend(name=newFriend,user=userId)
        friend.save()

        return Response({
            "friend": newFriend
        })

    def delete(self, request, user):
        friend_name = request.data['friend']
        user = User.objects.get(username=user)
        friend = Friend.objects.filter(user=user.pk).get(name=friend_name)
        friend.delete()

        return Response({
            "friend": friend_name
        })

class locationHistoryView(APIView):

    def get(self, request, user):
        userId = User.objects.get(username=user)
        locations = Location.objects.filter(user=userId)
        locations_json = serializers.serialize('json', locations)

        return  Response(json.loads(locations_json))

    def post(self, request, user):
        userId = User.objects.get(username=user)
        newLocation = request.data['location']
        print(newLocation)
        location = Location(name=newLocation['name'],lat=newLocation['lat'],lng=newLocation['lng'],user=userId)
        location.save()

        return Response({
            "location": newLocation
        })

    def delete(self, request, user):
        user = User.objects.get(username=user)
        location_name = request.data['location']
        location = Friend.objects.filter(user=user.pk).get(username=location_name)
        location.delete()

        return Response({
            "location": location_name
        })

class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)