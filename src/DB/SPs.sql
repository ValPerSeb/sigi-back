/****** Object:  StoredProcedure [dbo].[AddCategory]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateCategory]
    @id VARCHAR(25),
    @name VARCHAR(30),
    @color VARCHAR(30),
	@companyId VARCHAR(25)
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM Category WHERE Id = @id)
    BEGIN
        INSERT INTO Category (Id, CategoryName, CategoryColor, CompanyId)
        VALUES
			(@id,
            @name,
            @color,
			@companyId)

        SELECT 
            1 AS Success,
            'Categoría agregada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Categoría ya existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[CreateCompany]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateCompany]
    @id VARCHAR(25),
	@name VARCHAR(30),
	@nit BIGINT,
	@phoneNumber BIGINT,
	@email VARCHAR(50),
	@website VARCHAR(30),
	@industryType VARCHAR(20),
	@legalRep VARCHAR(30),
	@logo VARCHAR(200),
	@addressId VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM Company WHERE Id = @id)
    BEGIN
        INSERT INTO Company (Id, CompanyName, Nit, PhoneNumber, Email, Website, IndustryType, LegalRep, Logo, AddressId)
		VALUES
			(@id,
			@name,
			@nit,
			@phoneNumber,
			@email,
			@website,
			@industryType,
			@legalRep,
			@logo,
			@addressId
			)

        SELECT 
            1 AS Success,
            'Compañía agregada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Compañia ya existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[CreateInventoryLocation]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateInventoryLocation]
    @id VARCHAR(25),
	@code VARCHAR(20),
	@name VARCHAR(30),
	@capacity INT,
	@currentStock INT,
	@isActive BIT,
	@companyId VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

IF NOT EXISTS (SELECT 1 FROM InventoryLocation WHERE Id = @id)
    BEGIN
        INSERT INTO InventoryLocation (id, LocationCode, LocationName, Capacity, CurrentStock, IsActive, CompanyId)
		VALUES
			(@id,
			@code,
			@name,
			@capacity,
			@currentStock,
			@isActive,
			@companyId
			)

        SELECT 
            1 AS Success,
            'Ubicación agregada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Ubicación ya existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[CreateLocation]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateAddress]
    @id VARCHAR(25),
	@address1 VARCHAR(30),
	@address2 VARCHAR(30),
	@postalCode INT,
	@city VARCHAR(30),
	@country VARCHAR(30)

AS
BEGIN
    SET NOCOUNT ON;

IF NOT EXISTS (SELECT 1 FROM Address WHERE Id = @id)
    BEGIN
        INSERT INTO Address (Id, Address1, Address2, PostalCode, City, Country)
		VALUES
			(@id,
			@address1,
			@address2,
			@postalCode,
			@city,
			@country
			)

        SELECT 
            1 AS Success,
            'Ubicación agregada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Ubicación ya existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[CreateProduct]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateProduct]
    @id VARCHAR(25),
	@productName VARCHAR(30),
	@unitPrice FLOAT,
	@stock INT,
	@companyId VARCHAR(25),
	@supplierId VARCHAR(25),
	@categoryId VARCHAR(25),
	@inventoryLocationId VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

IF NOT EXISTS (SELECT 1 FROM Product WHERE Id = @id)
    BEGIN
        INSERT INTO Product (Id, ProductName, UnitPrice, Stock, CompanyId, SupplierId, CategoryId, InventoryLocationId)
		VALUES
			(@id,
			@productName,
			@unitPrice,
			@stock,
			@companyId,
			@supplierId,
			@categoryId,
			@inventoryLocationId
			)

        SELECT 
            1 AS Success,
            'Producto agregado correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Producto ya existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[CreateStockTransaction]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateStockTransaction]
    @id VARCHAR(25),
	@date DATETIME,
	@type VARCHAR(20),
	@quantity INT,
	@description VARCHAR(50),
	@inventoryLocationIdOld VARCHAR(25),
	@inventoryLocationIdNew VARCHAR(25),
	@userId VARCHAR(25),
	@productId VARCHAR(25),
	@companyId VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

IF NOT EXISTS (SELECT 1 FROM StockTransaction WHERE Id = @id)
    BEGIN
        INSERT INTO StockTransaction (Id, Date, Type, QuantityChange, Description, InventoryLocationIdOld, InventoryLocationIdNew, ProductId, UserId, CompanyId)
		VALUES
			(@id,
			@date,
			@type,
			@quantity,
			@description,
			@inventoryLocationIdOld,
			@inventoryLocationIdNew,
			@productId,
			@userId,
			@companyId
			)

        SELECT 
            1 AS Success,
            'Transacción agregada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Transacción ya existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[CreateSupplier]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateSupplier]
    @id VARCHAR(25),
	@name VARCHAR(30),
	@phoneNumber BIGINT,
	@email VARCHAR(50),
	@companyId VARCHAR(25),
	@addressId VARCHAR(25)	

AS
BEGIN
    SET NOCOUNT ON;

IF NOT EXISTS (SELECT 1 FROM Supplier WHERE Id = @id)
    BEGIN
        INSERT INTO Supplier (Id, SupplierName, PhoneNumber, Email, CompanyId, AddressId)
		VALUES
			(@id,
			@name,
			@phoneNumber,
			@email,
			@companyId,
			@addressId
			)

        SELECT 
            1 AS Success,
            'Proveedor agregada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Proveedor ya existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[CreateUserInfo]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateUserInfo]
    @id VARCHAR(25),
	@userName VARCHAR(30),
	@password VARCHAR(50),
	@rol VARCHAR(20),
	@firstName VARCHAR(30),
	@middleName VARCHAR(30),
	@lastName VARCHAR(30),
	@secondLastName VARCHAR(30),
	@email VARCHAR(50),
	@phoneNumber BIGINT,
	@addressId VARCHAR(25),
	@companyId VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

IF NOT EXISTS (SELECT 1 FROM UserInfo WHERE Id = @id)
    BEGIN
        INSERT INTO UserInfo (Id, UserName, Password, Rol, FirstName, MiddleName, LastName, SecondLastName, Email, PhoneNumber, AddressId, CompanyId)
		VALUES
			(@id,
			@userName,
			@password,
			@rol,
			@firstName,
			@middleName,
			@lastName,
			@secondLastName,
			@email,
			@phoneNumber,
			@addressId,
			@companyId
			)

        SELECT 
            1 AS Success,
            'Usuario agregada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Usuario ya existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteCategory]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteCategory]
    @id VARCHAR(25)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM Category WHERE Id = @id)
    BEGIN
        DELETE FROM Category
		WHERE Id = @id

        SELECT 
            1 AS Success,
            'Categoría eliminada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Categoría no existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteCompany]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteCompany]
    @id VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM Company WHERE Id = @id)
    BEGIN
        DELETE FROM Company
		WHERE Id = @id

        SELECT 
            1 AS Success,
            'Compañía eliminada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Compañía no existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteInventoryLocation]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteInventoryLocation]
    @id VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM InventoryLocation WHERE Id = @id)
    BEGIN
        DELETE FROM InventoryLocation
		WHERE Id = @id

        SELECT 
            1 AS Success,
            'Información de ubicación eliminada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Información de ubicación no existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteLocation]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteAddress]
    @id VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM Address WHERE Id = @id)
    BEGIN
        DELETE FROM Address
		WHERE Id = @id

        SELECT 
            1 AS Success,
            'Información de ubicación eliminada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Información de ubicación no existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteProduct]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteProduct]
    @id VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM Product WHERE Id = @id)
    BEGIN
        DELETE FROM Product
		WHERE Id = @id

        SELECT 
            1 AS Success,
            'Información del producto eliminada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Información de producto no existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteStockTransaction]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteStockTransaction]
    @id VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM StockTransaction WHERE Id = @id)
    BEGIN
        DELETE FROM StockTransaction
		WHERE Id = @id

        SELECT 
            1 AS Success,
            'Información de la transacción eliminada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Información de la transacción no existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteSupplier]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteSupplier]
    @id VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM Supplier WHERE Id = @id)
    BEGIN
        DELETE FROM Supplier
		WHERE Id = @id

        SELECT 
            1 AS Success,
            'Información del proveedor eliminada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Información del proveedor no existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteUserInfo]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteUserInfo]
    @id VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM UserInfo WHERE Id = @id)
    BEGIN
        DELETE FROM UserInfo
		WHERE Id = @id

        SELECT 
            1 AS Success,
            'Información del usuario eliminada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'Información del usuario no existe.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[GetCategories]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetCategories]
    @searchBy NVARCHAR(50) = NULL,
    @searchValue NVARCHAR(100) = NULL,
    @page INT,
    @limit INT,
	@companyId VARCHAR(25)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @offset INT = (@page - 1) * @limit;

    IF @searchBy IS NOT NULL AND @searchValue IS NOT NULL
    BEGIN
        IF @searchBy NOT IN ('Id','CategoryName','CategoryColor')
        BEGIN
            RAISERROR('Campo de búsqueda no permitido', 16, 1);
            RETURN;
        END

        DECLARE @sql NVARCHAR(MAX);
        DECLARE @searchValueLike NVARCHAR(110);

        SET @searchValueLike = '%' + @searchValue + '%';

        SET @sql = '
            SELECT * FROM Category
            WHERE ' + QUOTENAME(@searchBy) + ' LIKE @searchValue
				AND CompanyId = @companyId
            ORDER BY Id
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

            SELECT COUNT(*) AS total FROM Category
            WHERE ' + QUOTENAME(@searchBy) + ' LIKE @searchValue
				AND CompanyId = @companyId;
        ';

        EXEC sp_executesql @sql,
            N'@searchValue NVARCHAR(110), @offset INT, @limit INT, @companyId VARCHAR(25)',
            @searchValue = @searchValueLike,
            @offset = @offset,
            @limit = @limit,
			@companyId = @companyId;
    END
    ELSE
    BEGIN
        SELECT * FROM Category
		WHERE CompanyId = @companyId
        ORDER BY Id
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

        SELECT COUNT(*) AS total FROM Category
		WHERE CompanyId = @companyId;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[GetCompanies]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetCompanies]
    @searchBy NVARCHAR(50) = NULL,
    @searchValue NVARCHAR(100) = NULL,
    @page INT,
    @limit INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @offset INT = (@page - 1) * @limit;

    IF @searchBy IS NOT NULL AND @searchValue IS NOT NULL
    BEGIN
        IF @searchBy NOT IN ('Id','CompanyName','Nit')
        BEGIN
            RAISERROR('Campo de búsqueda no permitido', 16, 1);
            RETURN;
        END

        DECLARE @sql NVARCHAR(MAX);
        DECLARE @searchValueLike NVARCHAR(110);

        SET @searchValueLike = '%' + @searchValue + '%';

        SET @sql = '
            SELECT * FROM Company
            WHERE ' + QUOTENAME(@searchBy) + ' LIKE @searchValue
            ORDER BY Id
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

            SELECT COUNT(*) AS total FROM Company
            WHERE ' + QUOTENAME(@searchBy) + ' LIKE @searchValue;
        ';

        EXEC sp_executesql @sql,
            N'@searchValue NVARCHAR(110), @offset INT, @limit INT',
            @searchValue = @searchValueLike,
            @offset = @offset,
            @limit = @limit;
    END
    ELSE
    BEGIN
        SELECT * FROM Company
        ORDER BY Id
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

        SELECT COUNT(*) AS total FROM Company;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[GetInventoryLocations]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetInventoryLocations]
    @searchBy NVARCHAR(50) = NULL,
    @searchValue NVARCHAR(100) = NULL,
    @page INT,
    @limit INT,
	@companyId VARCHAR(25)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @offset INT = (@page - 1) * @limit;

    IF @searchBy IS NOT NULL AND @searchValue IS NOT NULL
    BEGIN
        IF @searchBy NOT IN ('Id','LocationCode','LocationName', 'IsActive')
        BEGIN
            RAISERROR('Campo de búsqueda no permitido', 16, 1);
            RETURN;
        END

        DECLARE @sql NVARCHAR(MAX);
        DECLARE @searchValueLike NVARCHAR(110);

        SET @searchValueLike = '%' + @searchValue + '%';

        SET @sql = '
            SELECT * FROM InventoryLocation
            WHERE ' + QUOTENAME(@searchBy) + ' LIKE @searchValue
				AND CompanyId = @companyId
            ORDER BY Id
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

            SELECT COUNT(*) AS total FROM InventoryLocation
            WHERE ' + QUOTENAME(@searchBy) + ' LIKE @searchValue
				AND CompanyId = @companyId;
        ';

        EXEC sp_executesql @sql,
            N'@searchValue NVARCHAR(110), @offset INT, @limit INT, @companyId VARCHAR(25)',
            @searchValue = @searchValueLike,
            @offset = @offset,
            @limit = @limit,
			@companyId = @companyId;
    END
    ELSE
    BEGIN
        SELECT * FROM InventoryLocation
		WHERE CompanyId = @companyId
        ORDER BY Id
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

        SELECT COUNT(*) AS total FROM InventoryLocation
		WHERE CompanyId = @companyId;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[GetProducts]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetProducts]
    @searchBy NVARCHAR(50) = NULL,
    @searchValue NVARCHAR(100) = NULL,
    @page INT,
    @limit INT,
	@companyId VARCHAR(25)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @offset INT = (@page - 1) * @limit;

    IF @searchBy IS NOT NULL AND @searchValue IS NOT NULL
    BEGIN
        IF @searchBy NOT IN ('Id','ProductName', 'CategoryId','SupplierId','InventoryLocationId')
        BEGIN
            RAISERROR('Campo de búsqueda no permitido', 16, 1);
            RETURN;
        END

        DECLARE @sql NVARCHAR(MAX);
        DECLARE @searchValueLike NVARCHAR(110);

        SET @searchValueLike = '%' + @searchValue + '%';

        SET @sql = '
            SELECT p.*, c.CategoryName
            FROM Product p
            LEFT JOIN Category c ON p.CategoryId = c.Id
            WHERE ' + QUOTENAME(@searchBy) + ' LIKE @searchValue
				AND p.CompanyId = @companyId
            ORDER BY p.Id
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

            SELECT COUNT(*) AS total FROM Product p
            WHERE ' + QUOTENAME(@searchBy) + ' LIKE @searchValue
				AND p.CompanyId = @companyId;
        ';

        EXEC sp_executesql @sql,
            N'@searchValue NVARCHAR(110), @offset INT, @limit INT, @companyId VARCHAR(25)',
            @searchValue = @searchValueLike,
            @offset = @offset,
            @limit = @limit,
			@companyId = @companyId;
    END
    ELSE
    BEGIN
        SELECT p.*, c.CategoryName
        FROM Product p
        LEFT JOIN Category c ON p.CategoryId = c.Id
        WHERE p.CompanyId = @companyId
        ORDER BY p.Id
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

        SELECT COUNT(*) AS total
        FROM Product p
        WHERE p.CompanyId = @companyId;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[GetStockTransactions]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetStockTransactions]
    @searchBy NVARCHAR(50) = NULL,
    @searchValue NVARCHAR(100) = NULL,
    @page INT,
    @limit INT,
	@companyId VARCHAR(25)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @offset INT = (@page - 1) * @limit;

    IF @searchBy IS NOT NULL AND @searchValue IS NOT NULL
    BEGIN
        IF @searchBy NOT IN ('Id', 'Type', 'UserId', 'ProductId')
        BEGIN
            RAISERROR('Campo de búsqueda no permitido', 16, 1);
            RETURN;
        END

        DECLARE @sql NVARCHAR(MAX);
        DECLARE @searchValueLike NVARCHAR(110);

        SET @searchValueLike = '%' + @searchValue + '%';

        SET @sql = '
            SELECT * FROM StockTransaction
            WHERE ' + QUOTENAME(@searchBy) + ' LIKE @searchValue
				AND CompanyId = @companyId
            ORDER BY Id
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

            SELECT COUNT(*) AS total FROM StockTransaction
            WHERE ' + QUOTENAME(@searchBy) + ' LIKE @searchValue
				AND CompanyId = @companyId;
        ';

        EXEC sp_executesql @sql,
            N'@searchValue NVARCHAR(110), @offset INT, @limit INT, @companyId VARCHAR(25)',
            @searchValue = @searchValueLike,
            @offset = @offset,
            @limit = @limit,
			@companyId = @companyId;
    END
    ELSE
    BEGIN
        SELECT * FROM StockTransaction
		WHERE CompanyId = @companyId
        ORDER BY Id
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

        SELECT COUNT(*) AS total FROM StockTransaction
		WHERE CompanyId = @companyId;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[GetSuppliers]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetSuppliers]
    @searchBy NVARCHAR(50) = NULL,
    @searchValue NVARCHAR(100) = NULL,
    @page INT,
    @limit INT,
	@companyId VARCHAR(25)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @offset INT = (@page - 1) * @limit;

    IF @searchBy IS NOT NULL AND @searchValue IS NOT NULL
    BEGIN
        IF @searchBy NOT IN ('Id','SupplierName')
        BEGIN
            RAISERROR('Campo de búsqueda no permitido', 16, 1);
            RETURN;
        END

        DECLARE @sql NVARCHAR(MAX);
        DECLARE @searchValueLike NVARCHAR(110);

        SET @searchValueLike = '%' + @searchValue + '%';

        SET @sql = '
            SELECT * FROM Supplier
            WHERE ' + QUOTENAME(@searchBy) + ' LIKE @searchValue
				AND CompanyId = @companyId
            ORDER BY Id
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

            SELECT COUNT(*) AS total FROM Supplier
            WHERE ' + QUOTENAME(@searchBy) + ' LIKE @searchValue
				AND CompanyId = @companyId;
        ';

        EXEC sp_executesql @sql,
            N'@searchValue NVARCHAR(110), @offset INT, @limit INT, @companyId VARCHAR(25)',
            @searchValue = @searchValueLike,
            @offset = @offset,
            @limit = @limit,
			@companyId = @companyId;
    END
    ELSE
    BEGIN
        SELECT * FROM Supplier
		WHERE CompanyId = @companyId
        ORDER BY Id
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

        SELECT COUNT(*) AS total FROM Supplier
		WHERE CompanyId = @companyId;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[GetUsers]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUsers]
    @searchBy NVARCHAR(50) = NULL,
    @searchValue NVARCHAR(100) = NULL,
    @page INT,
    @limit INT,
	@companyId VARCHAR(25)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @offset INT = (@page - 1) * @limit;

    IF @searchBy IS NOT NULL AND @searchValue IS NOT NULL
    BEGIN
        IF @searchBy NOT IN ('Id','UserName','Rol')
        BEGIN
            RAISERROR('Campo de búsqueda no permitido', 16, 1);
            RETURN;
        END

        DECLARE @sql NVARCHAR(MAX);
        DECLARE @searchValueLike NVARCHAR(110);

        SET @searchValueLike = '%' + @searchValue + '%';

        SET @sql = '
            SELECT * FROM UserInfo
            WHERE ' + QUOTENAME(@searchBy) + ' LIKE @searchValue
				AND CompanyId = @companyId
            ORDER BY Id
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

            SELECT COUNT(*) AS total FROM UserInfo
            WHERE ' + QUOTENAME(@searchBy) + ' LIKE @searchValue
				AND CompanyId = @companyId;
        ';

        EXEC sp_executesql @sql,
            N'@searchValue NVARCHAR(110), @offset INT, @limit INT, @companyId VARCHAR(25)',
            @searchValue = @searchValueLike,
            @offset = @offset,
            @limit = @limit,
			@companyId = @companyId;
    END
    ELSE
    BEGIN
        SELECT * FROM UserInfo
		WHERE CompanyId = @companyId
        ORDER BY Id
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

        SELECT COUNT(*) AS total FROM UserInfo
		WHERE CompanyId = @companyId;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateCategory]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateCategory]
    @id VARCHAR(25),
    @name VARCHAR(30),
    @color VARCHAR(30)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM Category WHERE Id = @id)
    BEGIN
        UPDATE Category
        SET 
            CategoryName = @name,
            CategoryColor = @color
        WHERE 
            Id = @id;

        SELECT 
            1 AS Success,
            'Categoría actualizada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'No se encontró la categoría con el ID proporcionado.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateCompany]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateCompany]
    @id VARCHAR(25),
	@name VARCHAR(30),
	@nit BIGINT,
	@email VARCHAR(50),
	@phoneNumber BIGINT,
	@website VARCHAR(30),
	@industryType VARCHAR(20),
	@legalRep VARCHAR(30),
	@logo VARCHAR(200),
	@addressId VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM Company WHERE Id = @id)
    BEGIN
        UPDATE Company
	SET
		CompanyName = @name,
		Nit = @nit,
		Email = @email,
		PhoneNumber = @phoneNumber,
		Website = @website,
		IndustryType = @industryType,
		LegalRep = @legalRep,
		Logo = @logo,
		AddressId = @addressId
	WHERE 
		Id = @id

        SELECT 
            1 AS Success,
            'Compañía actualizada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'No se encontró la compañía con el ID proporcionado..' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateInventoryLocation]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateInventoryLocation]
    @id VARCHAR(25),
	@code VARCHAR(20),
	@name VARCHAR(30),
	@capacity INT,
	@currentStock INT,
	@isActive BIT

AS
BEGIN
    SET NOCOUNT ON;

IF EXISTS (SELECT 1 FROM InventoryLocation WHERE Id = @id)
    BEGIN
        UPDATE InventoryLocation
	SET
		LocationCode = @code,
		LocationName = @name,
		Capacity = @capacity,
		CurrentStock = @currentStock,
		IsActive = @isActive
		
	WHERE 
		Id = @id
		

        SELECT 
            1 AS Success,
            'Ubicación actualizada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'No se encontró la ubicación con el ID proporcionado.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateAddress]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateAddress]
    @id VARCHAR(25),
	@address1 VARCHAR(30),
	@address2 VARCHAR(30),
	@postalCode INT,
	@city VARCHAR(30),
	@country VARCHAR(30)

AS
BEGIN
    SET NOCOUNT ON;

IF EXISTS (SELECT 1 FROM Address WHERE Id = @id)
    BEGIN
        UPDATE Address
	SET
		Address1 = @address1,
		Address2 = @address2,
		PostalCode = @postalCode,
		City = @city,
		Country = @country
		
	WHERE 
		Id = @id
		

        SELECT 
            1 AS Success,
            'Ubicación actualizada correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'No se encontró la ubicación con el ID proporcionado.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateProduct]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateProduct]
    @id VARCHAR(25),
	@productName VARCHAR(30),
	@unitPrice FLOAT,
	@stock INT,
	@supplierId VARCHAR(25),
	@categoryId VARCHAR(25),
	@inventoryLocationId VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

IF EXISTS (SELECT 1 FROM Product WHERE Id = @id)
    BEGIN	
        UPDATE Product
	SET
		ProductName = @productName,
		UnitPrice = @unitPrice,
		Stock = @stock,
		SupplierId = @supplierId,
		CategoryId = @categoryId,
		InventoryLocationId = @inventoryLocationId
		
	WHERE 
		Id = @id
		

        SELECT 
            1 AS Success,
            'Producto actualizado correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'No se encontró el producto con el ID proporcionado.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateSupplier]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateSupplier]
    @id VARCHAR(25),
	@name VARCHAR(30),
	@email VARCHAR(50),
	@phoneNumber BIGINT,
	@addressId VARCHAR(25)	
AS
BEGIN
    SET NOCOUNT ON;

IF EXISTS (SELECT 1 FROM Supplier WHERE Id = @id)
    BEGIN	
        UPDATE Supplier
	SET
		SupplierName = @name,
		Email = @email,
		PhoneNumber = @phoneNumber,
		AddressId = @addressId

	WHERE 
		Id = @id
		

        SELECT 
            1 AS Success,
            'Proveedor actualizado correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'No se encontró el proveedor con el ID proporcionado.' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateUserInfo]    Script Date: 5/14/2025 11:23:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateUserInfo]
    @id VARCHAR(25),
	@userName VARCHAR(30),
	@password VARCHAR(50),
	@rol VARCHAR(20),
	@firstName VARCHAR(30),
	@middleName VARCHAR(30),
	@lastName VARCHAR(30),
	@secondLastName VARCHAR(30),
	@email VARCHAR(50),
	@phoneNumber BIGINT,
	@addressId VARCHAR(25)

AS
BEGIN
    SET NOCOUNT ON;

IF EXISTS (SELECT 1 FROM UserInfo WHERE Id = @id)
    BEGIN	
        UPDATE UserInfo
	SET
		UserName = @userName,
		Password = @password,
		Rol = @rol,
		FirstName = @firstName,
		MiddleName = @middleName,
		LastName = @lastName,
		SecondLastName = @secondLastName,
		Email = @email,
		PhoneNumber = @phoneNumber,
		AddressId = @addressId

	WHERE 
		Id = @id
		

        SELECT 
            1 AS Success,
            'Usuario actualizado correctamente.' AS Message;
    END
    ELSE
    BEGIN
        SELECT 
            0 AS Success,
            'No se encontró el usuario con el ID proporcionado.' AS Message;
    END
END
GO