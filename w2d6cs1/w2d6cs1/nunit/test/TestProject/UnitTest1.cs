using NUnit.Framework;
using dotnetapp.Models; // Adjust the namespace to match your project
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Reflection;



namespace dotnetapp.Tests
{
    [TestFixture]
    public class DatabaseTests
    {
        private BookDbContext _context;
        private Type _bookType;
        // private Type _employeeType;
        private PropertyInfo[] _bookProperties;
        // private PropertyInfo[] _employeeProperties;
        private DbContextOptions<BookDbContext> _options1;




        [SetUp]
        public void Setup()
        {
            _bookType = new Book().GetType();
            // _employeeType = new Employee().GetType();
            _bookProperties = _bookType.GetProperties();
            // _employeeProperties = _employeeType.GetProperties();

            // Set up the database context before running each test
            var options = new DbContextOptionsBuilder<BookDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            // _options1 = new DbContextOptionsBuilder<EMSDbContext>()
            //     .UseInMemoryDatabase(databaseName: "TestDatabase1")
            //     .Options;

            _context = new BookDbContext(options);

            // using (var context = new EMSDbContext(_options1))
            // {
            //     // Add test data to the in-memory database
            //     context.Employees.Add(new Employee
            //     {
            //         Id = 1,
            //         Name = "John Doe",
            //         Email = "john@example.com",
            //         Salary = 50000,
            //         Deptid = 1,
            //         Dateofbirth = new DateTime(1990, 1, 1)
            //     });

            //     context.SaveChanges();
            // }   
        }

        [Test]
        public void Testing_CreateBook_AddsBookToDatabase()
        {
            // Arrange
            var book = new Book { Id = 1, Title = "demo", Author = "demo", Price = 100, Quantity = 5};

            // Act
            _context.Books.Add(book);
            _context.SaveChanges();

            // Assert
            var addedDept = _context.Books.Find(1);
            Assert.IsNotNull(addedDept);
            Assert.AreEqual("demo", addedDept.Title);
        }

        [Test]
        public void Test_Book_Class_Exists()
        {
            Assert.NotNull(_bookType);
        }

        // [Test]
        // public void Test_Employee_Class_Exists()
        // {
        //     Assert.NotNull(_employeeType);
        // }
        [Test]
        public void Test_Book_Id_Property_DataType()
        {
            var idProperty = _bookProperties.FirstOrDefault(prop => prop.Name == "Id");
            Assert.NotNull(idProperty);
            Assert.AreEqual(typeof(int), idProperty.PropertyType);
        }

        [Test]
        public void Test_Book_Title_Property_DataType()
        {
            var nameProperty = _bookProperties.FirstOrDefault(prop => prop.Name == "Title");
            Assert.NotNull(nameProperty);
            Assert.AreEqual(typeof(string), nameProperty.PropertyType);
        }

        [Test]
        public void Test_Dept_Price_Property_DataType_Decimal()
        {
            var departmentProperty = _bookProperties.FirstOrDefault(prop => prop.Name == "Price");
            Assert.NotNull(departmentProperty);
            Assert.AreEqual(typeof(decimal?), departmentProperty.PropertyType);
        }

//         [Test]
//         public void Test_Employee_Id_Property_DataType()
//         {
//             var idProperty = _employeeProperties.FirstOrDefault(prop => prop.Name == "Id");
//             Assert.NotNull(idProperty);
//             Assert.AreEqual(typeof(int), idProperty.PropertyType);
//         }

        [Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
        [Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }

        [Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
[Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
[Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
[Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
[Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
[Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
[Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
[Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
[Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
[Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
[Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
[Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
[Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
[Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }
[Test]
        public void BookDbContextContainsDbSetBooks_Property()
        {
            // using (var context = new ApplicationDbContext(_dbContextOptions))
            //         {
            // var context = new ApplicationDbContext();
        
            var propertyInfo = _context.GetType().GetProperty("Books");
        
            Assert.IsNotNull(propertyInfo);
            Assert.AreEqual(typeof(DbSet<Book>), propertyInfo.PropertyType);
                    // }
        }


//         [Test]
//         public void EMSDbContextContainsDbSet_Employee_Property()
//         {
//             // using (var context = new ApplicationDbContext(_dbContextOptions))
//             //         {
//             // var context = new ApplicationDbContext();
        
//             var propertyInfo = _context.GetType().GetProperty("Employees");
        
//             Assert.IsNotNull(propertyInfo);
//             Assert.AreEqual(typeof(DbSet<Employee>), propertyInfo.PropertyType);
//                     // }
//         }

//         [Test]
// public void Employee_ForeignKey_To_Dept_Should_Exist()
// {
//     // Arrange
//     var dept = new Dept { Id = 11, Name = "Sample Department", Location = "Sample Location" };
//     var employee = new Employee
//     {
//         Id = 11,
//         Name = "John Doe",
//         Email = "john@example.com",
//         Salary = 50000,
//         Deptid = 11, // Referencing the existing Department 1
//         Dateofbirth = new DateTime(1990, 1, 1)
//     };

//     // Act
//     _context.Depts.Add(dept);
//     _context.Employees.Add(employee);
//     _context.SaveChanges();


//     // Assert
//     var addedEmployee = _context.Employees.Find(11);
//     Console.WriteLine("gai"+addedEmployee.Id);

//     Assert.IsNotNull(addedEmployee);
//     Assert.IsNotNull(addedEmployee.Dept);
//     Assert.AreEqual("Sample Department", addedEmployee.Dept.Name);
// }

        

        
    }
}
