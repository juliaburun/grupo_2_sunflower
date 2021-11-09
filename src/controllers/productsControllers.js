const fs = require('fs');
const path = require ('path');

// convertir los datos del JSON a objeto literal
const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// convertir category.JSON a objeto literal
const categoryFilePath = path.join(__dirname, '../data/category.json');
const category = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));

// convertir capacity.JSON a objeto literal
const capacityFilePath = path.join(__dirname, '../data/capacity.json');
const capacity = JSON.parse(fs.readFileSync(capacityFilePath, 'utf-8'));

// convertir discount.JSON a objeto literal
const discountFilePath = path.join(__dirname, '../data/discount.json');
const discount = JSON.parse(fs.readFileSync(discountFilePath, 'utf-8'));

// convertir section.JSON a objeto literal
const sectionFilePath = path.join(__dirname, '../data/section.json');
const section = JSON.parse(fs.readFileSync(sectionFilePath, 'utf-8'));

const productsControllers={
    index: (req, res) => {      
        let idCategory=req.params.cod_category;
        res.render('./products/products', {products, idCategory, capacity, category} );
    },

    category: (req, res) => {
        let idCategory=req.params.cod_category;
        let productsCategory = products.filter(producto => producto.category == idCategory);
        res.render ('./products/productsCategory', {productsCategory, idCategory, capacity, category});
    },

    detail: (req, res) => {
        const cod_product = req.params.cod_product;
        const productDetail = products.find(producto => producto.cod_product == cod_product);
        const productCategory = category.find(producto => producto.cod_category == productDetail.category);
        const productCapacity = capacity.find(producto => producto.cod_capacity== productDetail.capacity);
        const productDiscount = discount.find(producto => producto.cod_discount== productDetail.discount);
        const productSection = section.find(producto => producto.cod_section== productDetail.section);

        //console.log (productSection);
        //Filtro de los otros productos ofertados diferentes al que se muestra en el detalle
        const productOther = products.filter(producto => producto.cod_product != cod_product);

        res.render('./products/productDetail', {productDetail, productCapacity,  productOther});
        //res.send(productOther)
        
    },

    create: (req, res) => {
        res.render('./products/productCreate');
        
    },

    store: (req, res) =>{

        let newProduct = {
            cod_product: products[products.length - 1].cod_product + 1,
            name: req.body.name,
            category: parseInt(req.body.category),
            capacity: parseInt(req.body.capacity),
            price: req.body.price,
            discount: parseInt(req.body.discount),
            section: parseInt(req.body.section),
            description: req.body.description,
            image: req.file ? req.file.filename : "planta.jpg" 
        }
        products.push(newProduct);
        let productJson =JSON.stringify(products, null, " ");
        fs.writeFileSync(productsFilePath, productJson);

        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        res.redirect('/products/');
    },

    edit: (req, res) => {
        const cod_product = req.params.cod_product;
        const productEdit = products.find(producto => producto.cod_product == cod_product);
        res.render('./products/productEdit', {productEdit, category, discount, section, capacity});
    },

    update: (req, res) => {
        //se lee el código del producto que llega por url
        id=req.params.cod_product;

        let indexProduct;

        //buscamos el cod_Product, en el json para traernos los datos del producto
        let productUpdate = products.find((producto, index) =>{
            if (producto.cod_product == id){
                indexProduct = index;
                return true;
            }
            return false;
        });

        let editedProduct = {
            cod_product: productUpdate.cod_product,
            name: req.body.name,
            category: req.body.category,
            capacity: req.body.capacity,
            price: req.body.price,
            section: req.body.section,
            description: req.body.description,
            image: req.file ? req.file.filename : productUpdate.image
        }

        products[indexProduct] = editedProduct;
        let productJson =JSON.stringify(products, null, " ");
        fs.writeFileSync(productsFilePath, productJson);

        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.redirect('/products');
    },

    destroy: (req, res) => {
        let cod_product = req.params.cod_product;
		let finalProducts = products.filter(products => products.cod_product != cod_product);

		let productJson =JSON.stringify(finalProducts, null, " ");
		fs.writeFileSync(productsFilePath, productJson);

        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		res.redirect('/products');

    }



}

module.exports=productsControllers;