#!/bin/bash
export CHROME_BIN=/usr/bin/chromium
if [ ! -d "/home/coder/project/workspace/angularapp" ]
then
    cp -r /home/coder/project/workspace/karma/angularapp /home/coder/project/workspace/;
fi

if [ -d "/home/coder/project/workspace/angularapp" ]
then
    echo "project folder present"
    cp /home/coder/project/workspace/karma/karma.conf.js /home/coder/project/workspace/angularapp/karma.conf.js;
    # checking for auth.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/auth.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/auth.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/auth.service.spec.ts;
    else
        echo "Frontend_should_call_the_API_and_register_the_user_when_register_is_called FAILED";
        echo "Frontend_should_call_the_API_and_login_the_user_when_login_is_called FAILED";
    fi

    # checking for customer.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/customer.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/customer.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/customer.service.spec.ts;
    else
        echo "Frontend_CustomerService_should get Customers FAILED";
        echo "Frontend_CustomerService_should create Customer FAILED";
        echo "Frontend_CustomerService_should update Customer FAILED";
        echo "Frontend_CustomerService_should delete Customer FAILED";
    fi

    # checking for order.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/order.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/order.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/order.service.spec.ts;
    else
        echo "Frontend_OrderService_should get orders FAILED";
        echo "Frontend_OrderService_should get order by id FAILED";
        echo "Frontend_OrderService_should get order items by id FAILED";
        echo "Frontend_OrderService_should place an order FAILED";
        echo "Frontend_OrderService_should delete an order FAILED";
    fi

    # checking for product.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/product.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/product.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/product.service.spec.ts;
    else
        echo "Frontend_ProductService_should create a product FAILED";
        echo "Frontend_ProductService_should get products FAILED";
        echo "Frontend_ProductService_should update a product FAILED";
        echo "Frontend_ProductService_should delete a product FAILED";
    fi

    # checking for review.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/review.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/review.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/review.service.spec.ts;
    else
        echo "Frontend_ReviewService_should create a review FAILED";
        echo "Frontend_ReviewServiceshould get reviews FAILED";
    fi

    if [ -d "/home/coder/project/workspace/angularapp/node_modules" ]; 
    then
        cd /home/coder/project/workspace/angularapp/
        npm test;
    else
        cd /home/coder/project/workspace/angularapp/
        yes | npm install
        npm test
    fi 
else   
    echo "Frontend_should_call_the_API_and_register_the_user_when_register_is_called FAILED";
    echo "Frontend_should_call_the_API_and_login_the_user_when_login_is_called FAILED";
    echo "Frontend_CustomerService_should get Customers FAILED";
    echo "Frontend_CustomerService_should create Customer FAILED";
    echo "Frontend_CustomerService_should update Customer FAILED";
    echo "Frontend_CustomerService_should delete Customer FAILED";
    echo "Frontend_OrderService_should get orders FAILED";
    echo "Frontend_OrderService_should get order by id FAILED";
    echo "Frontend_OrderService_should get order items by id FAILED";
    echo "Frontend_OrderService_should place an order FAILED";
    echo "Frontend_OrderService_should delete an order FAILED";
    echo "Frontend_ProductService_should create a product FAILED";
    echo "Frontend_ProductService_should get products FAILED";
    echo "Frontend_ProductService_should update a product FAILED";
    echo "Frontend_ProductService_should delete a product FAILED";
    echo "Frontend_ReviewService_should create a review FAILED";
    echo "Frontend_ReviewServiceshould get reviews FAILED";
fi
