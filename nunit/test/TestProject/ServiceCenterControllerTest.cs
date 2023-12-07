using NUnit.Framework;

using System.Net;
using Sytem.Text;
using System.Net.Http;

using System.Threading.Tasks;

[TestFixture]
public class WebApiTests{

private HttpClient _httpClient;

 [SetUp]
public void Setup() {

        // Initialize the HttpClient instance with the base URL of your WebAPI.

 _httpClient = new HttpClient();

 _httpClient.BaseAddress = new Uri("http://localhost:8080/"); // Replace with your WebAPI's base URL.

}
[Test]
 public async Task test_case1() {

            // Send an HTTP GET request to the API endpoint.

 HttpResponseMessage response = await _httpClient.GetAsync("admin/getservicecenter");

            // Assert that the response status code is 200 OK.

Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            // Assert that the response content is not empty.
string responseBody = await response.Content.ReadAsStringAsync();

 Assert.IsNotEmpty(responseBody);

 }

[Test]
 public async Task test_case2() {

                // Create an HTTP POST request with a JSON payload.

HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "admin/login");

                // request.Content = new StringContent("{\"name\": \"John\", \"age\": 30}",
request.Content = new StringContent("{\"Email \": \"demo@gmail.com\",\"Password \": \"demo@123\"}",
Encoding.UTF8, "application/json");

                // Send the request to the API endpoint.

 HttpResponseMessage response = await _httpClient.SendAsync(request);

                // Assert that the response status code is 201 Created.

 Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);

                // Assert that the response content is not empty.

 string responseBody = await response.Content.ReadAsStringAsync();

 Assert.IsNotEmpty(responseBody);

 }

  [Test]
 public async Task test_case3() {

                // Create an HTTP POST request with a JSON payload.

HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "admin/signup");

                // request.Content = new StringContent("{\"name\": \"John\", \"age\": 30}",
request.Content = new StringContent("{\"Email \": \"demo@gmail.com\",\"Password \": \"demo@123\",\"MobileNumber\":\"1234567890\",\"UserRole\":\"demo\"}",
Encoding.UTF8, "application/json");

                // Send the request to the API endpoint.

 HttpResponseMessage response = await _httpClient.SendAsync(request);

                // Assert that the response status code is 201 Created.

 Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);

                // Assert that the response content is not empty.

 string responseBody = await response.Content.ReadAsStringAsync();

 Assert.IsNotEmpty(responseBody);

 }

 [Test]
 public async Task test_case4() {

                // Create an HTTP POST request with a JSON payload.

HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "user/signup");

                // request.Content = new StringContent("{\"name\": \"John\", \"age\": 30}",
request.Content = new StringContent("{\"Email \": \"demo@gmail.com\",\"UserName \": \"demo@gmail.com\",\"Password\": \"demo@123\",\"MobileNumber\":\"1234567890\",\"UserRole\":\"demo\"}",
Encoding.UTF8, "application/json");

                // Send the request to the API endpoint.

 HttpResponseMessage response = await _httpClient.SendAsync(request);

                // Assert that the response status code is 201 Created.

 Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);

                // Assert that the response content is not empty.

 string responseBody = await response.Content.ReadAsStringAsync();

 Assert.IsNotEmpty(responseBody);

 }

[Test]
 public async Task test_case5() {

                // Create an HTTP POST request with a JSON payload.

HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "user/login");

                // request.Content = new StringContent("{\"name\": \"John\", \"age\": 30}",
request.Content = new StringContent("{\"Email \": \"demo@gmail.com\",\"Password \": \"demo@123\"}",
Encoding.UTF8, "application/json");

                // Send the request to the API endpoint.

 HttpResponseMessage response = await _httpClient.SendAsync(request);

                // Assert that the response status code is 201 Created.

 Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);

                // Assert that the response content is not empty.

 string responseBody = await response.Content.ReadAsStringAsync();

 Assert.IsNotEmpty(responseBody);

 }


}






