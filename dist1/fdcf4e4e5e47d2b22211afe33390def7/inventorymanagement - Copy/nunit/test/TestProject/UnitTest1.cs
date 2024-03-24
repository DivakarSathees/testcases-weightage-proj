using NUnit.Framework;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;


[TestFixture]
public class ApplicationTests
{
    private HttpClient _httpClient;

    [SetUp]
    public void Setup()
    {
        _httpClient = new HttpClient();
        _httpClient.BaseAddress = new Uri("http://localhost:8080");
    }

    [Test]
    public async Task Backend_TestRegisterAdmin()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Admin\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        Console.WriteLine(response.StatusCode);
        string responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseString);
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    }

    [Test]
    public async Task Backend_TestLoginAdmin()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Admin\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
    }

    [Test]
    public async Task Backend_TestRegisterUser()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"InventoryManager\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        Console.WriteLine(response.StatusCode);
        string responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseString);
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    }

    [Test]
    public async Task Backend_TestLoginUser()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"InventoryManager\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
    }

    [Test]
    public async Task Backend_Test_Post_ProductByAdmin()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Admin\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);

        string uniquetitle = Guid.NewGuid().ToString();

        // Use a dynamic and unique userName for admin (appending timestamp)
        string uniqueprodTitle = $"prodTitle_{uniquetitle}";

        string giftJson = $"{{\"Name\":\"{uniqueprodTitle}\",\"Description\":\"test\",\"Price\":250,\"Quantity\":10}}";
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage prodresponse = await _httpClient.PostAsync("/api/product",
            new StringContent(giftJson, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, prodresponse.StatusCode);
    }

    [Test]
    public async Task Backend_Test_Post_ProductByInventoryManager_Forbidden()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"InventoryManager\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);

        string uniquetitle = Guid.NewGuid().ToString();

        // Use a dynamic and unique userName for admin (appending timestamp)
        string uniqueprodTitle = $"prodTitle_{uniquetitle}";

        string giftJson = $"{{\"Name\":\"{uniqueprodTitle}\",\"Description\":\"test\",\"Price\":250,\"Quantity\":10}}";
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage prodresponse = await _httpClient.PostAsync("/api/product",
            new StringContent(giftJson, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.Forbidden, prodresponse.StatusCode);
    }

    [Test]
    public async Task Backend_TestGetAllproductsByBoth()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Admin\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);


        Console.WriteLine("admin111" + token);
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        HttpResponseMessage prodresponse = await _httpClient.GetAsync("/api/product");

        Assert.AreEqual(HttpStatusCode.OK, prodresponse.StatusCode);
    }

    [Test]
    public async Task Backend_Test_Post_CustomerByInventoryManager_Forbidden()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"InventoryManager\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);

        string uniquetitle = Guid.NewGuid().ToString();

        // Use a dynamic and unique userName for admin (appending timestamp)
        string uniqueCustName = $"prodTitle_{uniquetitle}";

        string giftJson = $"{{\"CustomerName\":\"{uniqueCustName}\",\"MobileNumber\":\"7894561232\",\"Email\":\"{uniqueCustName}@gmail.com\"}}";
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage prodresponse = await _httpClient.PostAsync("/api/customer",
            new StringContent(giftJson, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.Forbidden, prodresponse.StatusCode);
    }

    [Test]
    public async Task Backend_Test_Post_CustomerByAdmin_Ok()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Admin\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);

        string uniquetitle = Guid.NewGuid().ToString();

        // Use a dynamic and unique userName for admin (appending timestamp)
        string uniqueCustName = $"prodTitle_{uniquetitle}";

        string giftJson = $"{{\"CustomerName\":\"{uniqueCustName}\",\"MobileNumber\":\"7894561232\",\"Email\":\"{uniqueCustName}@gmail.com\"}}";
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage prodresponse = await _httpClient.PostAsync("/api/customer",
            new StringContent(giftJson, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, prodresponse.StatusCode);
    }

    [Test)]
    public async Task Backend_TestGetAllCustomerByBoth()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Admin\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);


        Console.WriteLine("admin111" + token);
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        HttpResponseMessage prodresponse = await _httpClient.GetAsync("/api/customer");

        Assert.AreEqual(HttpStatusCode.OK, prodresponse.StatusCode);
    }

    [Test]
    public async Task Backend_TestGetAllCustomerByBoth_WithoutToken_Should_Unauthorized()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Admin\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);


        HttpResponseMessage prodresponse = await _httpClient.GetAsync("/api/customer");

        Assert.AreEqual(HttpStatusCode.Unauthorized, prodresponse.StatusCode);
    }

    [Test)]
    public async Task Backend_TestGetAllReviewByAdmin()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Admin\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);


        Console.WriteLine("admin111" + token);
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        HttpResponseMessage prodresponse = await _httpClient.GetAsync("/api/review");

        Assert.AreEqual(HttpStatusCode.OK, prodresponse.StatusCode);
    }


    [Test]
    public async Task Backend_TestGetAllReviewByInventoryManager_Forbidden()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"InventoryManager\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);


        Console.WriteLine("admin111" + token);
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        HttpResponseMessage prodresponse = await _httpClient.GetAsync("/api/review");

        Assert.AreEqual(HttpStatusCode.Forbidden, prodresponse.StatusCode);
    }


}