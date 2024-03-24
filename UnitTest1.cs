using System.Numerics;
using dotnetapp.Controllers;
using dotnetapp.Models;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace TestProject
{
  public class Tests
  {

    // Test to check that ApplicationDbContext Contains DbSet for model Ride
    [Test]
    public void ApplicationDbContext_ContainsDbSet_Ride()
    {
        Assembly assembly = Assembly.GetAssembly(typeof(ApplicationDbContext));
        Type contextType = assembly.GetTypes().FirstOrDefault(t => typeof(DbContext).IsAssignableFrom(t));
        if (contextType == null)
        {
            Assert.Fail("No DbContext found in the assembly");
            return; 
        }
        Type RideType = assembly.GetTypes().FirstOrDefault(t => t.Name == "Ride");
        if (RideType == null)
        {
            Assert.Fail("No DbSet found in the DbContext");
            return; 
        }
        var propertyInfo = contextType.GetProperty("Rides");
        if (propertyInfo == null)
        {
            Assert.Fail("Rides property not found in the DbContext");
            return; 
        }
        else
        {
          Assert.AreEqual(typeof(DbSet<>).MakeGenericType(RideType), propertyInfo.PropertyType);
        }
    }
    
    // Test to check whether Ride Models Class exists
    [Test]
    public void Ride_Models_ClassExists()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Models.Ride";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideType = assembly.GetType(typeName);
      Assert.IsNotNull(RideType);
    }
    
    // Test to Check Ride Models Property RideID Exists with correcct datatype int    
    [Test]
    public void Ride_RideID_PropertyExists_ReturnExpectedDataTypes_int()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Models.Ride";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideType = assembly.GetType(typeName);
      PropertyInfo propertyInfo = RideType.GetProperty("RideID");
      Assert.IsNotNull(propertyInfo,"Property RideID does not exist in Ride class");
      Type expectedType = propertyInfo.PropertyType;
      Assert.AreEqual(typeof(int), expectedType, "Property RideID in Ride class is not of type int");
    }
    
    // Test to Check Ride Models Property DepartureLocation Exists with correcct datatype string    
    [Test]
    public void Ride_DepartureLocation_PropertyExists_ReturnExpectedDataTypes_string()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Models.Ride";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideType = assembly.GetType(typeName);
      PropertyInfo propertyInfo = RideType.GetProperty("DepartureLocation");
      Assert.IsNotNull(propertyInfo,"Property DepartureLocation does not exist in Ride class");
      Type expectedType = propertyInfo.PropertyType;
      Assert.AreEqual(typeof(string), expectedType, "Property DepartureLocation in Ride class is not of type string");
    }
    
    // Test to Check Ride Models Property Destination Exists with correcct datatype string    
    [Test]
    public void Ride_Destination_PropertyExists_ReturnExpectedDataTypes_string()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Models.Ride";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideType = assembly.GetType(typeName);
      PropertyInfo propertyInfo = RideType.GetProperty("Destination");
      Assert.IsNotNull(propertyInfo,"Property Destination does not exist in Ride class");
      Type expectedType = propertyInfo.PropertyType;
      Assert.AreEqual(typeof(string), expectedType, "Property Destination in Ride class is not of type string");
    }
    
    // Test to Check Ride Models Property DateOfDeparture Exists with correcct datatype DateTime    
    [Test]
    public void Ride_DateOfDeparture_PropertyExists_ReturnExpectedDataTypes_DateTime()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Models.Ride";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideType = assembly.GetType(typeName);
      PropertyInfo propertyInfo = RideType.GetProperty("DateOfDeparture");
      Assert.IsNotNull(propertyInfo,"Property DateOfDeparture does not exist in Ride class");
      Type expectedType = propertyInfo.PropertyType;
      Assert.AreEqual(typeof(DateTime), expectedType, "Property DateOfDeparture in Ride class is not of type DateTime");
    }
    
    // Test to Check Ride Models Property MaximumCapacity Exists with correcct datatype int    
    [Test]
    public void Ride_MaximumCapacity_PropertyExists_ReturnExpectedDataTypes_int()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Models.Ride";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideType = assembly.GetType(typeName);
      PropertyInfo propertyInfo = RideType.GetProperty("MaximumCapacity");
      Assert.IsNotNull(propertyInfo,"Property MaximumCapacity does not exist in Ride class");
      Type expectedType = propertyInfo.PropertyType;
      Assert.AreEqual(typeof(int), expectedType, "Property MaximumCapacity in Ride class is not of type int");
    }
    
    // Test to Check Ride Models Property DriverName Exists with correcct datatype string    
    [Test]
    public void Ride_DriverName_PropertyExists_ReturnExpectedDataTypes_string()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Models.Ride";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideType = assembly.GetType(typeName);
      PropertyInfo propertyInfo = RideType.GetProperty("DriverName");
      Assert.IsNotNull(propertyInfo,"Property DriverName does not exist in Ride class");
      Type expectedType = propertyInfo.PropertyType;
      Assert.AreEqual(typeof(string), expectedType, "Property DriverName in Ride class is not of type string");
    }
    
    // Test to Check Ride Models Property Fare Exists with correcct datatype decimal    
    [Test]
    public void Ride_Fare_PropertyExists_ReturnExpectedDataTypes_decimal()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Models.Ride";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideType = assembly.GetType(typeName);
      PropertyInfo propertyInfo = RideType.GetProperty("Fare");
      Assert.IsNotNull(propertyInfo,"Property Fare does not exist in Ride class");
      Type expectedType = propertyInfo.PropertyType;
      Assert.AreEqual(typeof(decimal), expectedType, "Property Fare in Ride class is not of type decimal");
    }
    
    // Test to check whether RideController Controllers Class exists
    [Test]
    public void RideController_Controllers_ClassExists()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Controllers.RideController";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideControllerType = assembly.GetType(typeName);
      Assert.IsNotNull(RideControllerType);
    }
    
    // Test to Check RideController Controllers Method Index Exists
    [Test]
    public void RideController_Index_MethodExists()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Controllers.RideController";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideControllerType = assembly.GetType(typeName);
      MethodInfo methodInfo = RideControllerType.GetMethod("Index");
      Assert.IsNotNull(methodInfo,"Method Index does not exist in RideController class");
    }

    // Test to Check RideController Controllers Method Index Returns IActionResult
    [Test]
    public void RideController_Index_MethodReturns_IActionResult()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Controllers.RideController";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideControllerType = assembly.GetType(typeName);
      MethodInfo methodInfo = RideControllerType.GetMethod("Index");
      Assert.AreEqual(typeof(IActionResult), methodInfo.ReturnType, "Method Index in RideController class is not of type IActionResult");
    }
    
    // Test to Check RideController Controllers Method Index with no parameter Returns IActionResult
    [Test]
    public void RideController_Index_Method_with_NoParams_Returns_IActionResult()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Controllers.RideController";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideControllerType = assembly.GetType(typeName);
      MethodInfo methodInfo = RideControllerType.GetMethod("Index", Type.EmptyTypes);
      Assert.AreEqual(typeof(IActionResult), methodInfo.ReturnType, "Method Index in RideController class is not of type IActionResult");
    }
    
    // Test to Check RideController Controllers Method Create Exists
    [Test]
    public void RideController_Create_MethodExists()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Controllers.RideController";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideControllerType = assembly.GetType(typeName);
      MethodInfo methodInfo = RideControllerType.GetMethod("Create");
      Assert.IsNotNull(methodInfo,"Method Create does not exist in RideController class");
    }

    // Test to Check RideController Controllers Method Create Returns IActionResult
    [Test]
    public void RideController_Create_MethodReturns_IActionResult()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Controllers.RideController";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideControllerType = assembly.GetType(typeName);
      MethodInfo methodInfo = RideControllerType.GetMethod("Create");
      Assert.AreEqual(typeof(IActionResult), methodInfo.ReturnType, "Method Create in RideController class is not of type IActionResult");
    }
    
    // Test to Check RideController Controllers Method Create with no parameter Returns IActionResult
    [Test]
    public void RideController_Create_Method_with_NoParams_Returns_IActionResult()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Controllers.RideController";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideControllerType = assembly.GetType(typeName);
      MethodInfo methodInfo = RideControllerType.GetMethod("Create", Type.EmptyTypes);
      Assert.AreEqual(typeof(IActionResult), methodInfo.ReturnType, "Method Create in RideController class is not of type IActionResult");
    }
    
    // Test to Check RideController Controllers Method Create Exists
    [Test]
    public void RideController_Create_MethodExists()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Controllers.RideController";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideControllerType = assembly.GetType(typeName);
      MethodInfo methodInfo = RideControllerType.GetMethod("Create");
      Assert.IsNotNull(methodInfo,"Method Create does not exist in RideController class");
    }

    // Test to Check RideController Controllers Method Create Returns IActionResult
    [Test]
    public void RideController_Create_MethodReturns_IActionResult()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Controllers.RideController";
      Assembly assembly = Assembly.Load(assemblyName);
      Type RideControllerType = assembly.GetType(typeName);
      MethodInfo methodInfo = RideControllerType.GetMethod("Create");
      Assert.AreEqual(typeof(IActionResult), methodInfo.ReturnType, "Method Create in RideController class is not of type IActionResult");
    }
    
    // Test to Check RideController Controllers Method Create with parameter Ride Returns IActionResult
    [Test]
    public void RideController_Create_Method_Invokes_with_Ride_Param_Returns_IActionResult()
    {
      string assemblyName = "dotnetapp";
      string typeName = "dotnetapp.Controllers.RideController";
      Assembly assembly = Assembly.Load(assemblyName);
      string typeName1 = "dotnetapp.Models.Ride";
      Type RideType = assembly.GetType(typeName1);
      object instance1 = Activator.CreateInstance(RideType);
      Type RideControllerType = assembly.GetType(typeName);
      object instance = Activator.CreateInstance(RideControllerType);
      MethodInfo methodInfo = RideControllerType.GetMethod("Create", new Type[] {  RideType });
      object result = methodInfo.Invoke(instance, new object[] { instance1 });
      Assert.IsNotNull(result, "Result should not be null");
    }
      
  }
}
  