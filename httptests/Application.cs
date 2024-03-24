using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreDBFirst.Models;
public class Application
{
    public int ApplicationID { get; set; }
    public string ApplicationName { get; set; }
    public string ContactNumber { get; set; }
    public string MailID { get; set; }
    [ForeignKey("Job")]
    public string JobTitle { get; set; }
    public string Status { get; set; }


    public Job? Job { get; set; }
}
