# Generated by Django 5.2.3 on 2025-07-05 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('censo', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='censo',
            name='voto',
        ),
        migrations.AlterField(
            model_name='censo',
            name='sapellido',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='censo',
            name='snombre',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
