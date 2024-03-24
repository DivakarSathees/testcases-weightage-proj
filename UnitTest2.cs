using NUnit.Framework;
using System;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
[TestFixture]
public class UnitTest2
{
    private HttpClient _httpClient;
    private string _generatedToken;
    
    [SetUp]
    public void Setup()
    {
        _httpClient = new HttpClient();
        _httpClient.BaseAddress = new Uri("http://localhost:8080");
    }
    
    [Test, Order(1)]
    public async Task Backend_TestPostApplication()
    {
    //string responseBody = await loginResponse.Content.ReadAsStringAsync();

    //dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

    //string token = responseMap.token;
    //Assert.IsNotNull(token);
        string uniqueId = Guid.NewGuid().ToString();
        
        int uniqueApplicationID = 123;
        string uniqueApplicationName = $"abcd{uniqueId}";
        string uniqueContactNumber = $"abcd{uniqueId}";
        string uniqueMailID = $"abcd{uniqueId}";
        string uniqueJobTitle = $"abcd{uniqueId}";
        string uniqueStatus = $"abcd{uniqueId}";
        string requestBody2 = $"{{\"ApplicationID\" : {uniqueApplicationID},\"ApplicationName\" : \"{uniqueApplicationName}\",\"ContactNumber\" : \"{uniqueContactNumber}\",\"MailID\" : \"{uniqueMailID}\",\"JobTitle\" : \"{uniqueJobTitle}\",\"Status\" : \"{uniqueStatus}\" }}";
    //    _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage response3 = await _httpClient.PostAsync("/api/Application", new StringContent(requestBody2, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, response3.StatusCode);
    }
    
    [Test, Order(2)]
    public async Task Backend_TestGetApplication()
    {
    //string responseBody = await loginResponse.Content.ReadAsStringAsync();
    //dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
    //string token = responseMap.token;
    //Assert.IsNotNull(token);
    //_httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        HttpResponseMessage response = await _httpClient.GetAsync("/api/Application");

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    }
    [Test, Order(1)]
    public async Task Backend_TestPostJob()
    {
    //string responseBody = await loginResponse.Content.ReadAsStringAsync();

    //dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

    //string token = responseMap.token;
    //Assert.IsNotNull(token);
        string uniqueId = Guid.NewGuid().ToString();
        
        int uniqueJobID = 123;
        string uniqueJobTitle = $"abcd{uniqueId}";
        string uniqueDepartment = $"abcd{uniqueId}";
        string uniqueLocation = $"abcd{uniqueId}";
        string uniqueResponsibility = $"abcd{uniqueId}";
        string uniqueQualification = $"abcd{uniqueId}";
        DateTime uniqueDeadLine = DateTime.Now;
        string requestBody2 = $"{{\"JobID\" : {uniqueJobID},\"JobTitle\" : \"{uniqueJobTitle}\",\"Department\" : \"{uniqueDepartment}\",\"Location\" : \"{uniqueLocation}\",\"Responsibility\" : \"{uniqueResponsibility}\",\"Qualification\" : \"{uniqueQualification}\",\"DeadLine\" : \"{uniqueDeadLine}\" }}";
    //    _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage response3 = await _httpClient.PostAsync("/api/Job", new StringContent(requestBody2, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, response3.StatusCode);
    }
    
    [Test, Order(2)]
    public async Task Backend_TestGetJob()
    {
    //string responseBody = await loginResponse.Content.ReadAsStringAsync();
    //dynamic responseMap = JsonConvert.DeserializeObject(responseBody);
    //string token = responseMap.token;
    //Assert.IsNotNull(token);
    //_httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        HttpResponseMessage response = await _httpClient.GetAsync("/api/Job");

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    }
    [Test, Order(1)]
    public async Task Backend_TestRegisterAdmin()
    {
        string uniqueId = Guid.NewGuid().ToString();
        
        string uniqueusername = $"abcd_{uniqueId}";
        string uniquepassword = $"abcdA{uniqueId}@123";
        string uniquerole = "admin";
        string requestBody = $"{{\"Username\" : \"{uniqueusername}\",\"Password\" : \"{uniquepassword}\",\"Role\" : \"{uniquerole}\" }}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/auth/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        string responseBody = await response.Content.ReadAsStringAsync();    
    }
    
    [Test, Order(2)]
    public async Task Backend_TestLoginAdmin()
    {
        string uniqueId = Guid.NewGuid().ToString();
        
        string uniqueusername = $"abcd_{uniqueId}";
        string uniquepassword = $"abcdA{uniqueId}@123";
        string uniquerole = "admin";
        string requestBody = $"{{\"Username\" : \"{uniqueusername}\",\"Password\" : \"{uniquepassword}\",\"Role\" : \"{uniquerole}\" }}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/auth/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

        string requestBody1 = $"{{\"Username\" : \"{uniqueusername}\",\"Password\" : \"{uniquepassword}\" }}";
        HttpResponseMessage response1 = await _httpClient.PostAsync("/api/auth/login", new StringContent(requestBody1, Encoding.UTF8, "application/json"));
        Assert.AreEqual(HttpStatusCode.OK, response1.StatusCode);
        string responseBody = await response1.Content.ReadAsStringAsync();
    }
    
}
