# Generated by Django 3.2.4 on 2021-10-16 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('purchases_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='allinstatepurchase',
            name='total_amount',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='alloutstatepurchase',
            name='total_amount',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='instatepurchase',
            name='product_cgst',
            field=models.CharField(choices=[('5', '5%'), ('12', '12%'), ('18', '18%'), ('28', '28%')], max_length=10),
        ),
        migrations.AlterField(
            model_name='instatepurchase',
            name='product_price',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='instatepurchase',
            name='product_sgst',
            field=models.CharField(choices=[('5', '5%'), ('12', '12%'), ('18', '18%'), ('28', '28%')], max_length=10),
        ),
        migrations.AlterField(
            model_name='instatepurchase',
            name='total',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='outstatepurchase',
            name='product_gst',
            field=models.CharField(choices=[('5', '5%'), ('12', '12%'), ('18', '18%'), ('28', '28%')], max_length=10),
        ),
        migrations.AlterField(
            model_name='outstatepurchase',
            name='product_price',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='outstatepurchase',
            name='total',
            field=models.FloatField(),
        ),
    ]