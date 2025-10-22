CREATE PROCEDURE sp_GetApplications
AS
BEGIN
    SELECT * FROM Applications WHERE IsDeleted = 0 ORDER BY AppId DESC;
END;
GO

CREATE PROCEDURE sp_GetDeletedApplications
AS
BEGIN
    SELECT * FROM Applications WHERE IsDeleted = 1 ORDER BY AppId DESC;
END;
GO

CREATE PROCEDURE sp_AddApplication
(
    @ApplicationName NVARCHAR(100),
    @ApplicationUrl NVARCHAR(255),
    @HostedOn NVARCHAR(255),
    @APIServer NVARCHAR(255),
    @DBServer NVARCHAR(255),
    @ApplicationOwner NVARCHAR(100),
    @Status NVARCHAR(50)
)
AS
BEGIN
    INSERT INTO Applications (ApplicationName, ApplicationUrl, HostedOn, APIServer, DBServer, ApplicationOwner, Status)
    VALUES (@ApplicationName, @ApplicationUrl, @HostedOn, @APIServer, @DBServer, @ApplicationOwner, @Status);
END;
GO

CREATE PROCEDURE sp_UpdateApplication
(
    @AppId INT,
    @ApplicationName NVARCHAR(100),
    @ApplicationUrl NVARCHAR(255),
    @HostedOn NVARCHAR(255),
    @APIServer NVARCHAR(255),
    @DBServer NVARCHAR(255),
    @ApplicationOwner NVARCHAR(100),
    @Status NVARCHAR(50)
)
AS
BEGIN
    UPDATE Applications
    SET ApplicationName=@ApplicationName,
        ApplicationUrl=@ApplicationUrl,
        HostedOn=@HostedOn,
        APIServer=@APIServer,
        DBServer=@DBServer,
        ApplicationOwner=@ApplicationOwner,
        Status=@Status
    WHERE AppId=@AppId;
END;
GO

CREATE PROCEDURE sp_SoftDeleteApplication (@AppId INT)
AS
BEGIN
    UPDATE Applications SET IsDeleted = 1 WHERE AppId = @AppId;
END;
GO

CREATE PROCEDURE sp_RestoreApplication (@AppId INT)
AS
BEGIN
    UPDATE Applications SET IsDeleted = 0 WHERE AppId = @AppId;
END;
GO

CREATE PROCEDURE sp_HardDeleteApplication (@AppId INT)
AS
BEGIN
    DELETE FROM Applications WHERE AppId = @AppId;
END;
GO

CREATE PROCEDURE sp_GetUsers
AS
BEGIN
    SELECT UserId, Name, Email, Role FROM Users ORDER BY Name;
END;
GO

CREATE PROCEDURE sp_AddUser
(
    @Name NVARCHAR(100),
    @Email NVARCHAR(100),
    @PasswordHash NVARCHAR(256),
    @Role NVARCHAR(20)
)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
    BEGIN
        RAISERROR('Duplicate Email', 16, 1);
        RETURN;
    END

    INSERT INTO Users (Name, Email, PasswordHash, Role)
    VALUES (@Name, @Email, @PasswordHash, @Role);
END;
GO

CREATE PROCEDURE sp_GetUserByEmail
(
    @Email NVARCHAR(100)
)
AS
BEGIN
    SELECT UserId, Name, Email, PasswordHash, Role FROM Users WHERE Email = @Email;
END;
GO
