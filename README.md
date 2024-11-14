# Currency-Exchange App

A simple and efficient currency exchange application built with **Next.js** and **ShadCN components**. This app allows users to easily view and exchange currency rates. It uses a custom React hook to fetch exchange rates from an API, handling loading and error states seamlessly.

## Features

- **Currency Rates**: View real-time currency exchange rates.
- **ShadCN UI Components**: Built using ShadCN components for a modern, responsive UI.
- **Custom Hook**: Fetches currency exchange data with a custom React hook.
- **Loading and Error Handling**: Displays loading states while fetching data and error messages in case of issues.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mhmd3ssam/Currency-Exchange
   ```

### Step 2: Install Dependencies

Navigate into the project folder and install the required dependencies using `npm`:

```bash
cd currency-exchange
npm install
```

### Step 3: Start the Development Server

After the dependencies are installed, start the development server:

```bash
npm run dev

```

## Usage

- The app automatically fetches currency exchange rates.
- Once the data is fetched successfully, the **currency exchange rates** are displayed for the user to view.

# Custom Hook: `useCurrencyExchange`

The `useCurrencyExchange` hook is responsible for fetching real-time currency exchange rates and handling loading and error states.

### Usage

To use this custom hook, simply call it inside your React component:

```jsx
const {
  currencyData: { amount, fromCurrency, toCurrency },
  setCurrencyDate,
  currencies,
  convertResult,
  setConvertResult,
  isLoading,
} = useCurrencyExchange();
```

## Technologies Used

### 1. **Next.js**

A React framework for building production-ready web apps.

### 2. **ShadCN Components**

Reusable UI components for building modern interfaces, customizable and compatible with React.

### 4. **API for Currency Data**

An API is used to fetch real-time currency exchange rates and display them in the app.

## Author

Built with ❤️ by [Mohamed Essam]
Feel free to reach out or contribute to the project!
