// TODO: create a controller to send the data of uploaded cat
// to the client
// data to send is described in UploadMessageResponse interface

// export {catPost};
import {Request, Response} from 'express';
import CatModel from '../models/catModel';
import {Cat} from '../../interfaces/Cat';
import UploadMessageResponse from '../../interfaces/UploadMessageResponse';

export const catPost = async (req: Request, res: Response) => {
  const {cat_name, owner, area, location, thumbnail}: any = req.body;
  if (req.file === undefined) {
    return res.status(400).json({message: 'No file uploaded'});
  }
  const {path} = req.file;
  const newCat = new CatModel({
    cat_name,
    owner,
    area,
    location,
    thumbnail,
    cat_picture: path,
  });
  await newCat.save();
  const message: UploadMessageResponse = {
    message: 'cat uploaded',
    data: {
      filename: path,
      location: location,
    },
  };
  res.json(message);
};
