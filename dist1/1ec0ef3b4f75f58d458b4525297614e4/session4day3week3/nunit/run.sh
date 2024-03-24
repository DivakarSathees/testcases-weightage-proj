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
        echo "DepartmentController_Index_ReturnsViewWithDepartments FAILED";
        echo "DepartmentController_Create_GET_ReturnsView FAILED";
        echo "DepartmentController_Create_POST_ValidModel_RedirectsToIndex FAILED";
        echo "DepartmentController_Delete_GET_ValidId_ReturnsViewWithDepartment FAILED";
        echo "DepartmentController_Delete_POST_ValidId_RedirectsToIndex FAILED";
        echo "DepartmentController_Delete_POST_InvalidId_ReturnsNotFound FAILED";
        echo "EmployeeController_Index_ReturnsViewWithEmployees FAILED";
        echo "EmployeeController_Create_POST_ValidModel_RedirectsToIndex FAILED";
        echo "EmployeeController_Edit_GET_ValidId_ReturnsViewWithEmployeeAndDepartments FAILED";
        echo "EmployeeController_Delete_GET_ValidId_ReturnsViewWithEmployee FAILED";
        echo "EmployeeController_Delete_POST_ValidId_RedirectsToIndex FAILED";
        echo "EmployeeController_Delete_POST_InvalidId_ReturnsNotFound FAILED";
    fi
else
    echo "DepartmentController_Index_ReturnsViewWithDepartments FAILED";
    echo "DepartmentController_Create_GET_ReturnsView FAILED";
    echo "DepartmentController_Create_POST_ValidModel_RedirectsToIndex FAILED";
    echo "DepartmentController_Delete_GET_ValidId_ReturnsViewWithDepartment FAILED";
    echo "DepartmentController_Delete_POST_ValidId_RedirectsToIndex FAILED";
    echo "DepartmentController_Delete_POST_InvalidId_ReturnsNotFound FAILED";
    echo "EmployeeController_Index_ReturnsViewWithEmployees FAILED";
    echo "EmployeeController_Create_POST_ValidModel_RedirectsToIndex FAILED";
    echo "EmployeeController_Edit_GET_ValidId_ReturnsViewWithEmployeeAndDepartments FAILED";
    echo "EmployeeController_Delete_GET_ValidId_ReturnsViewWithEmployee FAILED";
    echo "EmployeeController_Delete_POST_ValidId_RedirectsToIndex FAILED";
    echo "EmployeeController_Delete_POST_InvalidId_ReturnsNotFound FAILED";
fi
