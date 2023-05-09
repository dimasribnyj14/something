from django.shortcuts import render, redirect
from shop_cookies_app.models import *

# Create your views here.
def show_catalog(request):
    context = {"products":Product.objects.all()}
    response = render(request, "catalog.html", context)
    if request.method == "POST":
        product_pk = request.POST.get('product_pk')
        product_count = request.POST.get("product_count")
        if "product_pk" not in request.COOKIES:
            response.set_cookie('product_pk', str(product_pk) + ' ' + str(product_count))
        else:
            same_pk = False
            list_products = request.COOKIES['product_pk'].split('|')
            for cookie_product in list_products:
                if cookie_product.split(' ')[0] == str(product_pk):
                    same_pk = True
                    count = int(cookie_product.split(' ')[1]) + int(product_count)
                    new_product = cookie_product.split(' ')[0] + ' ' + str(count)
                    list_products[list_products.index(cookie_product)] = new_product
                    new_products = '|'.join(list_products)
                    break
            if not same_pk:
                new_products = request.COOKIES['product_pk'] + '|' + str(product_pk) + ' ' + str(product_count)
            response.set_cookie('product_pk', new_products)

    return response

def show_cart(request):
    if 'product_pk' in request.COOKIES:
        products_pk = request.COOKIES['product_pk'].split('|')
        list_products = list()
        for product_pk in products_pk:
            list_products_count = [Product.objects.get(pk=product_pk.split(" ")[0]), product_pk.split(" ")[1]]
            list_products.append(list_products_count)
        response = render(request, 'basket.html', context={'products': list_products})
    else:
        response = render(request, 'basket.html', context={'products': list()})
    if request.method == 'POST':
        product_pk_choosed = request.POST.get('product_pk')
        product_count = request.POST.get('product_count')
        product_count = int(product_count.split(' ')[-1])
        list_products = request.COOKIES['product_pk'].split('|')
        for list_product in list_products:
            if list_product.split(' ')[0] == str(product_pk_choosed):
                if product_count <= 0:
                    list_products.pop(list_products.index(list_product))
                    product_new = '|'.join(list_products)
                    if len(list_products) > 0:
                        response.set_cookie('product_pk', product_new)
                    else:
                        response.delete_cookie('product_pk')
                else:
                    product_new = list_product.split(' ')[0] + ' ' + str(product_count)
                    list_products[list_products.index(list_product)] = product_new
                    products_new = '|'.join(list_products)
                    response.set_cookie('product_pk', products_new)
                break
    return response