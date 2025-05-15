-- Address para la empresa
INSERT INTO Address (Id, Address1, Address2, PostalCode, City, Country)
VALUES ('ADR250513235932', 'Cra 45 #10-25', NULL, 110111, 'Bogotá', 'Colombia');
GO

-- Address para el proveedor
INSERT INTO Address (Id, Address1, Address2, PostalCode, City, Country)
VALUES ('ADR250514000209', 'Av. Siempre Viva 742', 'Bodega 5', 050021, 'Medellín', 'Colombia');
GO

-- Company
INSERT INTO Company (Id, CompanyName, Nit, Email, PhoneNumber, Website, IndustryType, LegalRep, Logo, AddressId)
VALUES ('COM250514000417', 'SigiTech S.A.S.', 900123456, 'contacto@sigi.com', 3216549870, 'www.sigitech.com', 'Tecnología', 'Camila Ríos', 'https://logo.com/logo.png', 'ADR250513235932');
GO

-- Category
INSERT INTO Category (Id, CategoryName, CategoryColor, CompanyId)
VALUES 
('CAT250514000609', 'Electrónica', '#FF5733', 'COM250514000417'),
('CAT250514000759', 'Papelería', '#33C1FF', 'COM250514000417'),
('CAT250514000854', 'Muebles', '#75FF33', 'COM250514000417');
GO

-- Supplier
INSERT INTO Supplier (Id, SupplierName, PhoneNumber, Email, AddressId, CompanyId)
VALUES ('SUP250514001119', 'Proveedora Global S.A.', 3123456789, 'ventas@proveedorglobal.com', 'ADR250514000209', 'COM250514000417');
GO

-- InventoryLocation
INSERT INTO InventoryLocation (Id, LocationCode, LocationName, Capacity, CurrentStock, IsActive, CompanyId)
VALUES ('INV250514001234', 'BOD-001', 'Bodega Central', 500, 150, 1, 'COM250514000417');
GO

-- Products

INSERT INTO Product (Id, ProductName, UnitPrice, Stock, CompanyId, SupplierId, CategoryId, InventoryLocationId)
VALUES 
('PRO250514001235', 'Laptop Dell XPS 13', 4500000, 10, 'COM250514000417', 'SUP250514001119', 'CAT250514000609', 'INV250514001234'),
('PRO250514001236', 'Cuaderno Norma', 3500, 200, 'COM250514000417', 'SUP250514001119', 'CAT250514000759', 'INV250514001234'),
('PRO250514001237', 'Silla Ergonómica', 250000, 15, 'COM250514000417', 'SUP250514001119', 'CAT250514000854', 'INV250514001234');
GO