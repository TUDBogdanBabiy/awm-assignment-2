# Generated by Django 3.1.4 on 2020-12-10 22:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rest', '0003_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='email',
        ),
        migrations.RemoveField(
            model_name='user',
            name='password',
        ),
    ]
