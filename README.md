


# Expense Tracker MERN Stack App

<img width="1440" alt="Screenshot 2024-04-01 at 22 33 01" src="https://github.com/MhaskeAditya42/exptracker/assets/94377039/5be93c62-cc0e-4c37-8371-b54775c1372a">


Expense Tracker is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack along with Redux Toolkit for state management. The app allows users to track their monthly expenses and categorize them into different categories such as Investment, Savings, and Expenses.

## Features

- Track monthly expenses
- Categorize expenses into Investment, Savings, and Expenses
- Add, edit, and delete expenses
- View total expenses and expenses by category

## Installation and Setup

To run the Expense Tracker app locally, follow these steps:

1. **Clone the repository**: 
   ```bash
   git clone https://github.com/MhaskeAditya42/exptracker.git
   ```

2. **Install dependencies**:
   Navigate into the project directory and install both frontend and backend dependencies:
   ```bash
   cd expense-tracker
   npm install       # Install frontend dependencies
   cd server
   npm install       # Install backend dependencies
   ```

3. **Set up MongoDB**:
   - Make sure MongoDB is installed on your local machine.
   - Create a MongoDB database and configure the connection string in `server/config/db.js`.

4. **Run the backend server**:
   In the `server` directory, run:
   ```bash
   npm start
   ```

5. **Run the frontend**:
   In the root directory, run:
   ```bash
   npm start
   ```

6. **Access the app**:
   Open your web browser and navigate to `http://localhost:3000` to access the Expense Tracker app.

## Usage

1. **Add Expense**:
   - Click on the "Add Expense" button to add a new expense.
   - Enter the expense details such as name, amount, and category.
   - Click "Save" to add the expense.

2. **View Expenses**:
   - Navigate to the dashboard to view your monthly expenses.
   - Expenses will be categorized based on the selected category.

3. **Edit or Delete Expense**:
   - Click on an expense to edit or delete it.
   - Edit the expense details and click "Save" to update.
   - Click "Delete" to remove the expense.
     

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues if you encounter any problems or have suggestions for improvement.

## License

This project is licensed under the [MIT License](LICENSE).
