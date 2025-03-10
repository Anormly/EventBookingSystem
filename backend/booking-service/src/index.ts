import express, { Request, Response } from 'express';  // Импортируем express и типы Request, Response

const app = express();
const port = 5001;

app.get('/', (req: Request, res: Response) => {  // Явно указываем типы для req и res
  res.send('Booking service is running');
});

app.listen(port, () => {
  console.log(`Booking service is listening on port ${port}`);
});
