import { createClient } from 'redis';
import express from 'express';
import { promisify } from 'util';

const app = express();

const PORT = 1245;
// create a redis client
const client = createClient();

// on connect console log message
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// on error console log message
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

// promisify client
const getAsync = promisify(client.get).bind(client);

const listProducts = [
  {
    itemId: 1,
    itemName: 'Suitcase 250',
    price: 50,
    initialAvailableQuantity: 4,
  },
  {
    itemId: 2,
    itemName: 'Suitcase 450',
    price: 100,
    initialAvailableQuantity: 10,
  },
  {
    itemId: 3,
    itemName: 'Suitcase 650',
    price: 350,
    initialAvailableQuantity: 2,
  },
  {
    itemId: 4,
    itemName: 'Suitcase 1050',
    price: 550,
    initialAvailableQuantity: 5,
  },
];

const getItemById = (itemId) =>
  listProducts.find((item) => item.itemId === itemId);

app.get('/list_products', (req, res) => {
  try {
    res.status(200).json(listProducts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const reserveStockById = (itemId, stock) => {
  client.set(itemId, stock);
};

const getCurrentReservedStockById = async (itemId) => {
  const stock = await getAsync(itemId);
  return stock;
};

app.get('/list_products/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const item = getItemById(parseInt(itemId));
  if (item) {
    const stock = await getCurrentReservedStockById(itemId); // You need to define this function
    const currentQuantity =
      stock !== null ? parseInt(stock) : item.initialAvailableQuantity;
    res.status(200).json({
      ...item,
      currentQuantity: currentQuantity,
    });
  } else {
    res.status(404).json({ status: 'Product not found' });
  }
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const item = getItemById(parseInt(itemId));
  if (item) {
    const stock = await getCurrentReservedStockById(itemId); // You need to define this function
    const currentQuantity =
      stock !== null ? parseInt(stock) : item.initialAvailableQuantity;
    if (!item.initialAvailableQuantity) {
      res
        .status(402)
        .json({ status: 'Not enough stock available', itemId: `${itemId}` });
    } else {
      reserveStockById(itemId, currentQuantity);
      res
        .status(200)
        .json({ status: 'Reservation confirmed', itemId: `${itemId}` });
    }
  } else {
    res.status(404).json({ status: 'Product not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
