const { StatusCodes  } = require('http-status-codes');
const path = require('path')
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProductImageLocal = async(req, res) => {
    const productImage = req.files.img;
   

    const imagePath = path.join(
        __dirname,
        '../public/uploads/' + `${productImage.name}`
      );
      await productImage.mv(imagePath);
      return res
        .status(StatusCodes.OK)
        .json({ image: { src: `/uploads/${productImage.name}` } });
}


// const uploadProductImage = async (req, res) => {
//   let images = [...req.files.images];
//         let imagesBuffer = [];
//         console.log(images);
//     //     for (let i =0; i < images.length;  i++){
//     //       const result = await cloudinary.uploader.upload(images[i], {
//     //       folder: "banners",
//     //       folder: 'file-upload',
//     // });
//   const result = await cloudinary.uploader.upload(
//     req.files.file.tempFilePath,
//     {
//       use_filename: true,
//       folder: 'file-upload',
//     }

//   );
//   // fs.unlinkSync(req.files.file.tempFilePath);
//   return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
// };

const uploadProductImage = async(req, res) => {
  // console.log(req);
  try {

    let images = (req.files.file);
    let imagesBuffer = [];
      console.log(images);
    for (let i =0; i < images.length;  i++){
          const result = await cloudinary.uploader.upload(images[i].tempFilePath, {
          folder: "banners",
    });

      imagesBuffer.push({
        url: result.secure_url
      })

    }

    // req.body.images = imagesBuffer
    //  const banner = await Banner.create(req.body)
     if(imagesBuffer.length === 0){
        img = images
     }else{
      img = imagesBuffer
     }
    res.status(201).json({
        success: true,
        img 
    })
    
} catch (error) {
    console.log(error);
    
}
}
module.exports = {
  uploadProductImage
}