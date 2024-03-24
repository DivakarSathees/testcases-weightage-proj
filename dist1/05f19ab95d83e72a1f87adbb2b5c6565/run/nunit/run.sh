#!/bin/bash  
if [ ! -d "/home/coder/project/workspace/dotnetapp/" ]
then
    cp -r /home/coder/project/workspace/nunit/dotnetapp /home/coder/project/workspace/;
fi
if [ -d "/home/coder/project/workspace/dotnetapp/" ]
then
    echo "project folder present"
    # checking for src folder
    if [ -d "/home/coder/project/workspace/dotnetapp/" ]
    then
        cp -r /home/coder/project/workspace/nunit/test/TestProject /home/coder/project/workspace/;
        cp -r /home/coder/project/workspace/nunit/test/dotnetapp.sln /home/coder/project/workspace/dotnetapp/;
        cd /home/coder/project/workspace/dotnetapp || exit;
        dotnet clean;
        dotnet build && dotnet test -l "console;verbosity=normal";
    else
        echo "Backend_TestRegisterAdmin FAILED";
        echo "Backend_TestLoginAdmin FAILED";
        echo "Backend_TestRegisterUser FAILED";
        echo "Backend_TestLoginUser FAILED";
        echo "Backend_Test_Post_ProductByAdmin FAILED";
        echo "Backend_Test_Post_ProductByInventoryManager_Forbidden FAILED";
        echo "Backend_TestGetAllproductsByBoth FAILED";
        echo "Backend_Test_Post_CustomerByInventoryManager_Forbidden FAILED";
        echo "Backend_Test_Post_CustomerByAdmin_Ok FAILED";
        echo "Backend_TestGetAllCustomerByBoth_WithoutToken_Should_Unauthorized FAILED";
        echo "Backend_TestGetAllReviewByInventoryManager_Forbidden FAILED";
    fi
else
    echo "Backend_TestRegisterAdmin FAILED";
    echo "Backend_TestLoginAdmin FAILED";
    echo "Backend_TestRegisterUser FAILED";
    echo "Backend_TestLoginUser FAILED";
    echo "Backend_Test_Post_ProductByAdmin FAILED";
    echo "Backend_Test_Post_ProductByInventoryManager_Forbidden FAILED";
    echo "Backend_TestGetAllproductsByBoth FAILED";
    echo "Backend_Test_Post_CustomerByInventoryManager_Forbidden FAILED";
    echo "Backend_Test_Post_CustomerByAdmin_Ok FAILED";
    echo "Backend_TestGetAllCustomerByBoth_WithoutToken_Should_Unauthorized FAILED";
    echo "Backend_TestGetAllReviewByInventoryManager_Forbidden FAILED";
fi
