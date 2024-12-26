# Backend for QwikBuyz E-Commerce Application

The backend provides a RESTful API for managing products and includes features such as database interaction, logging, and modular route handling.

---

## **Project Features**

- **API Endpoints**:
  - Fetch all products.
  - Fetch a single product by ID.
  - Query products using filters.
  - Add, update, and delete products.
- **Database Integration**:
  - MongoDB with Mongoose for schema validation and interaction.
- **Logging**:
  - All API activity is logged
  - Logs stored in a `logs.txt` file.
- **Modular Structure**:
  - Routes, models, and controllers are separated for maintainability and scalability.

---

## **Technologies Used**

### **Core Technologies**

- **Node.js**: Runtime environment.
- **Express.js**: Framework for building APIs.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **dotenv**: For environment variable management.
- **Thunder Client**: For API testing.

---

## **Installation and Setup**

### **Prerequisites**

Ensure you have the following installed:

- [Node.js](https://nodejs.org/): LTS version recommended.
- [MongoDB](https://www.mongodb.com/): Local or cloud-based instance.
- [Git](https://git-scm.com/): For version control.

### **Steps**

1. Clone the repository:

   ```bash
   git clone https://github.com/S-Gaurisankar/QwikBuyz.git
   cd backend
   ```
2. Install dependencies:
  ```bash
    npm install
  ```
3. Run the server
  ```bash
  npm run dev
  ```

## Directory Structure
```bash
backend/
  ├── models/    # Mongoose schemas
  ├── routes/    # API routes
  ├── controllers/   
  ├── index.js    # Main entry point
  ├── package.json  
  ├── .gitignore    

```

## API Endpoints
### Product Routes

GET	/api/products	 - Fetch all products.

GET	/api/products/query -	Fetch products by query params.

GET	/api/products/:id	 - Fetch a product by its ID.

GET	/api/products/query? - Fetch a product using the properties.

POST /api/products	Add a new product.

PUT	/api/products/:id - 	Update a product by its ID.

DELETE	/api/products/:id	- Delete a product by its ID.

## Log route:
GET /api/logs - Downloads the log file


