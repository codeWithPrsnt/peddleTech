const db = require('./db');
require('dotenv').config();

const utils={}

utils.getProducts=async function getProducts() {
    try {
      const result = await db.query('SELECT * FROM '+process.env.TABLE_NAME);
      return result.rows;
    } catch (error) {
      console.error('Error executing query', error);
      throw error;
    }
  }

  utils.getProduct=async function getProduct(_id) {
    try {
      const result = await db.query('SELECT * FROM '+process.env.TABLE_NAME +' where '+process.env.TABLE_NAME +'._id='+_id);
      return result.rows;
    } catch (error) {
      console.error('Error executing query', error);
      throw error;
    }
  }

  utils.search = async function searchProducts(textt) {
    try {
        

        const query = {
        text: `
            SELECT *
            FROM ${process.env.TABLE_NAME}
            WHERE brand ILIKE $1 OR product_name ILIKE $1;
        `,
        values: [`%${textt}%`],
        };

        let result = await db.query(query);
        console.log(textt,result)
            
        return result.rows;
        //console.log('Number of rows updated:', result.rowCount);
    } catch (error) {
        console.error('Error updating product:', error);
    } finally {

    }
}

  utils.update = async function updateProduct(productToUpdate) {
    try {
        

        const query = {
            text: 'UPDATE '+process.env.TABLE_NAME+' SET brand = $1, product_name = $2 , UPC_code = $3 WHERE products._id = $4',
            values: [productToUpdate.brand, productToUpdate.product_name, productToUpdate.upc_code,productToUpdate.id],
        };

        const result = await db.query(query);
        return result.rows;
        //console.log('Number of rows updated:', result.rowCount);
    } catch (error) {
        console.error('Error updating product:', error);
    } finally {

    }
}

  const products = [
    {
        UPC_code:459512335994,
        brand:'Aeru1',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru2',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru3',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru4',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru5',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru6',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru7',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru8',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru9',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru10',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru11',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru12',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru13',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru14',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru15',
        product_name:'Air Conditioner'
    },

    {
        UPC_code:459512335994,
        brand:'Aeru16',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru17',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru18',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru19',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Onida',
        product_name:'Air Conditioner'
    },{
        UPC_code:459512335994,
        brand:'Hero',
        product_name:'Air tioner'
    },{
        UPC_code:459512435994,
        brand:'Aeru4',
        product_name:'Air Cditioner'
    },
    {
        UPC_code:459512535994,
        brand:'Aeru5',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512635994,
        brand:'Aeru6',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459502335994,
        brand:'Aeru6',
        product_name:'Air Condner'
    },
    {
        UPC_code:459512135994,
        brand:'Aeru1',
        product_name:'Air Conioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru3',
        product_name:'Air Condier'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru6',
        product_name:'Air Condr'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru4',
        product_name:'Air Conditiner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru9',
        product_name:'Air Conditioner9'
    },
    {
        UPC_code:459512365994,
        brand:'Aeru',
        product_name:'Conitioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru10',
        product_name:'Air0o Conditioner'
    },
    {
        UPC_code:459512335994,
        brand:'Aeru9',
        product_name:'Air3'
    },
    {
        UPC_code:429512335994,
        brand:'Aeru',
        product_name:'Conditioners'
    },
    {
        UPC_code:459514335994,
        brand:'Aeru3',
        product_name:'Air Condioner'
    },
    {
        UPC_code:459712335994,
        brand:'Aeru5',
        product_name:'Air-Conditioner'
    },

    {
        UPC_code:459502335994,
        brand:'Aer0',
        product_name:'Air Condition'
    },
    {
        UPC_code:458512335994,
        brand:'Aeru3',
        product_name:'Aust'
    },
    {
        UPC_code:459513335994,
        brand:'Aeru4',
        product_name:'Conditioner'
    },
    {
        UPC_code:459512335894,
        brand:'Aeru2',
        product_name:'Air Conditioner'
    },
    {
        UPC_code:459512335984,
        brand:'Onida',
        product_name:'Air'
    },{
        UPC_code:459512335995,
        brand:'Hero2',
        product_name:'Conditioner'
    }
]

utils.insertProducts = async function insertProducts() {
    try {
        

        for (const product of products) {
            const query = {
                text: 'INSERT INTO '+process.env.TABLE_NAME+' (upc_code, brand, product_name) VALUES ($1, $2, $3)',
                values: [product.UPC_code, product.brand, product.product_name],
            };

            await db.query(query);
            console.log('Product inserted:', product);
        }
    } catch (error) {
        console.error('Error inserting products:', error);
    } finally {
        
    }
}
module.exports=utils;