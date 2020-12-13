from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     created = models.DateTimeField(auto_now_add=True, editable=False)
#     modified = models.DateTimeField(auto_now=True, editable=False)
#     country = models.CharField(max_length=100)
#
#     def __str__(self):
#         return f"{self.user}"
#
# @receiver(post_save,sender=User)
# def manage_user_profile(sender, instance, created, **kwargs):
#     try:
#         my_profile = instance.profile
#         my_profile.save()
#     except Profile.DoesNotExist:
#         Profile.objects.create(user=instance)

class Location(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    visit_date = models.DateTimeField(auto_now_add=True, editable=False)
    lat = models.FloatField()
    lng = models.FloatField()

    def __str__(self):
        return f"{self.user}:{self.name}"

class Friend(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user}:{self.name}"