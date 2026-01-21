
import { content } from './src/data/content.js';
import { categoriesPageContent } from './src/data/categoriesPageContent.js';
import { productListPageContent } from './src/data/productListPageContent.js';
import { productDetailsContent } from './src/data/productDetailsContent.js';
import fs from 'fs';

const allData = {
    home: content,
    categories: categoriesPageContent,
    productList: productListPageContent,
    productDetails: productDetailsContent
};

fs.writeFileSync('all_data.json', JSON.stringify(allData, null, 2));
console.log('Data exported to all_data.json');
