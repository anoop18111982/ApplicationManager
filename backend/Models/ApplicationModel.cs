namespace ApplicationManager.Models
{
    public class ApplicationModel
    {
        public int AppId { get; set; }
        public string ApplicationName { get; set; } = "";
        public string ApplicationUrl { get; set; } = "";
        public string[] HostedOn { get; set; } = new string[0];
        public string? APIServer { get; set; }
        public string? DBServer { get; set; }
        public string ApplicationOwner { get; set; } = "";
        public string Status { get; set; } = "Active";
        public bool IsDeleted { get; set; } = false;
    }
}
