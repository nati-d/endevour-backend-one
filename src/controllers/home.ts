import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    console.log(req)
  res.send('hello');
  // res.redirect('https://www.endevour.org');
}
