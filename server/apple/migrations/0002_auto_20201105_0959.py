# Generated by Django 3.1.3 on 2020-11-05 01:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apple', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Juice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=255)),
                ('name', models.CharField(blank=True, max_length=255)),
                ('percent', models.IntegerField()),
                ('amount', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Water',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255)),
                ('percent', models.IntegerField()),
                ('amount', models.IntegerField()),
            ],
        ),
        migrations.RenameModel(
            old_name='Data',
            new_name='Stolean',
        ),
    ]
