# mongo-form
 
## About

This is a simple project that allows the user to create restaurants, edit them, and delete them. 

The user can also search for restaurants by name, cuisine, borough, street, and restaurant id.

### Screenshots

![Main Page](https://imgur.com/tL1NWtt.png)
![New Restaurant](https://imgur.com/AF83Qmg.png)
![Edit Restaurant](https://imgur.com/OjgQhqq.png)

## Installation

Clone the repository and run the following commands in the terminal:

```bash
git clone https://github.com/ShAd0W20/mongo-form.git
```

To install this project, you must have [Node.js](https://nodejs.org/en/) installed on your computer.

After cloning the repository, run the following commands in the terminal:

```bash
cd mongo-form
cd server
npm install
cd ../client
npm install
```

After installing the dependencies, you must create a `.env` file in the `server` folder and add the following lines:

```bash
MONGO_URI=<your_mongo_uri>
BASE_PORT=3000
```

The data used in this project can be found [here](https://github.com/ShAd0W20/mongo-form/tree/main/server/restaurants.json).

You can import the data into your MongoDB database using the following command:

```bash
mongoimport --db <your_database_name> --collection restaurants --file <path_to_file>/restaurants.json
```

## Usage

To run the project, run the following commands in the terminal:

```bash
cd mongo-form
cd server
npm run dev
cd ../client
npm run dev
```

After running the commands, the project will be running on `http://localhost:5173`.

