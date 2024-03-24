using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dotnetapp.Models;
using System.Data;
using Microsoft.Data.SqlClient;


namespace dotnetapp.Controllers
{
    public class CarserviceController : Controller
    {
        private string connectionString = "Data Source=Divakar;Initial Catalog=carserviceDB;Integrated Security=True;Persist Security Info=True;Encrypt=True;Trust Server Certificate=True";


        public ActionResult Index(string sortOrder, int id)
        {
            List<Carservice> carservices = new List<Carservice>();

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string query = "SELECT * FROM carservice";

                    if (!string.IsNullOrEmpty(sortOrder))
                    {
                        query += " ORDER BY ";

                        switch (sortOrder)
                        {
                            case "car_name":
                                query += "car_name ASC";
                                break;
                            case "car_number":
                                query += "car_number ASC";
                                break;
                            case "customer_name":
                                query += "customer_name ASC";
                                break;
                            default:
                                query += "id ASC"; // Default sorting
                                break;
                        }
                    }
                    SqlCommand command = new SqlCommand(query, connection);

                    // using (SqlCommand command = new SqlCommand(query, connection))
                    // {
                        connection.Open();
                        SqlDataReader reader = command.ExecuteReader();
                        while (reader.Read())
                        {
                            Carservice carservice = new Carservice
                            {
                                id = Convert.ToInt32(reader["id"]),
                                car_name = reader["car_name"].ToString(),
                                car_number = reader["car_number"].ToString(),
                                car_varient = reader["car_varient"].ToString(),
                                customer_name = reader["customer_name"].ToString(),
                                complaint = reader["complaint"].ToString(),
                                phonenumber = reader["phonenumber"].ToString(),
                                address = reader["address"].ToString()
                            };
                            carservices.Add(carservice);
                        }

                        reader.Close();
                    // }
                }

                return View(carservices);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest("An error occurred while retrieving the carservices item.");
            }
        }
        public ActionResult Create()
        {
            return View();
        }


        [HttpPost]
        public ActionResult Create(Carservice carservice)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string query = "INSERT INTO carservice (car_name, car_number, car_varient, customer_name, complaint, phonenumber, address) VALUES (@car_name, @car_number, @car_varient, @customer_name, @complaint, @phonenumber, @address)";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        // command.Parameters.AddWithValue("@id", Carservice.id);
                        command.Parameters.AddWithValue("@car_name", carservice.car_name);
                        command.Parameters.AddWithValue("@car_number", carservice.car_number);
                        command.Parameters.AddWithValue("@car_varient", carservice.car_varient);
                        command.Parameters.AddWithValue("@customer_name", carservice.customer_name);
                        command.Parameters.AddWithValue("@complaint", carservice.complaint);
                        command.Parameters.AddWithValue("@phonenumber", carservice.phonenumber);
                        command.Parameters.AddWithValue("@address", carservice.address);
                        connection.Open();
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest("An error occurred while creating the carservices item.");

            }
            return RedirectToAction("Index");
        }

        public ActionResult Delete(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest();
                }
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string query = "DELETE FROM carservice WHERE id = @id";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        connection.Open();
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected == 0)
                        {
                            return NotFound();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest("An error occurred while deleting the carservices item.");

            }

            return RedirectToAction("Index");
        }
    }
}