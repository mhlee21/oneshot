# Generated by Django 3.2 on 2022-05-19 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shots', '0003_alter_shot_movie'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shot',
            name='image',
            field=models.ImageField(default='media/default_image.jpg', upload_to=''),
        ),
    ]