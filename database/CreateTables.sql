CREATE TABLE Users (
    UserId INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(100),
    Email NVARCHAR(100) UNIQUE,
    PasswordHash NVARCHAR(256),
    Role NVARCHAR(20) CHECK (Role IN ('Admin', 'User'))
);

CREATE TABLE Applications (
    AppId INT IDENTITY PRIMARY KEY,
    ApplicationName NVARCHAR(100),
    ApplicationUrl NVARCHAR(255),
    HostedOn NVARCHAR(255),
    APIServer NVARCHAR(255),
    DBServer NVARCHAR(255),
    ApplicationOwner NVARCHAR(100),
    Status NVARCHAR(50),
    IsDeleted BIT DEFAULT 0
);
