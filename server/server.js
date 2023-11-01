const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors())
const router = require('./routes/thread-routes');
app.use('/router', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
