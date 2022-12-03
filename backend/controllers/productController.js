import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({
      createdAt: -1 //Sort by Date Added DESC
    })

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
  
    if (product) {
      await product.remove()
      res.json({ message: 'Product removed' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
  
  // @desc    Create a product
  // @route   POST /api/products
  // @access  Private/Admin
  const createProduct = asyncHandler(async (req, res) => {
    const  {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
      numReviews
    } = req.body;
    const product = new Product({
      name: name,
      price: price,
      user: req.user._id,
      image: image,
      brand: brand,
      category: category,
      countInStock: countInStock,
      numReviews: numReviews,
      description: description,
    })
  
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  })

  // @desc    Import  product
  // @route   POST /api/products/import
  // @access  Public
  const importProducts = asyncHandler(async (req, res) => {
    const data = req.body;
    for(let i = 0; i < data.length; i++) {
      const item = data[i];
      const  {
      name,
      price,
      description,
      image,
      brand,
      user, 
      category,
      countInStock,
      numReviews
    } = item;
      const product = new Product({
        name,
        price,
        user,
        image,
        brand,
        category,
        countInStock,
        numReviews,
        description,
      })
       await product.save();
    }

   const message = "Import success!"
    res.status(201).json(message);
  })
  
  // @desc    Update a product
  // @route   PUT /api/products/:id
  // @access  Private/Admin
  const updateProduct = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
  
      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    importProducts
    // createProductReview,
    // getTopProducts,
  }