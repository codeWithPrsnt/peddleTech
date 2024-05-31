'use client'
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Slot from '../components/Slot';
import { products } from "@/types";
var Barcode = require('react-barcode');

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<products[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('Brand:Z-A');
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      console.log('response', response.data);
      setProducts(response.data)

    } catch (error) {

    }
  }
  const handleScroll = () => {
    console.log(page, page * 20, products.length)
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) setPage((prev) => prev + 1);

  }
  useEffect(() => {
    fetchProducts();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('Bye MainContainer');
    };
  }, [])

  const productList = () => {
    return products.slice(0, page * 20).map((item) => <Card key={item._id}>
      <Slot slot='body'>
        <div className="flex items-center flex-col">
          <Barcode value={parseFloat(item.upc_code)} />
          <h2 className="font-extrabold">{item.brand}</h2>
          <p className="pb-4">{item.product_name}</p>
          <FormButton disabled={false} onClick={() => router.push('/edit/' + item._id)}>Edit</FormButton>
        </div>

      </Slot>
    </Card>)
  }
  useEffect(() => {
    console.log('useEffect')
    productList();
  }, [page, products, sortOrder])

  const handleSearch = async () => {
    let response = await axios.get('http://localhost:3001/search?text=' + searchText);
    setProducts(response.data)

  }


  const handleSortOrder = (e: any) => {
    let text = e.target.value;
    let productSorted: any;
    switch (text) {

      case 'Brand:A-Z':
        productSorted = products.sort((a, b) => {
          const nameA = a.brand.toUpperCase();
          const nameB = b.brand.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
        setSortOrder(text)
        setProducts(productSorted)
        break;

      case 'Brand:Z-A':
        productSorted = products.sort((a, b) => {
          const nameA = a.brand.toUpperCase();
          const nameB = b.brand.toUpperCase();
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        })

        setSortOrder(text)
        setProducts(productSorted)
        break;
      case 'product name:A-Z':
        productSorted = products.sort((a, b) => {
          const nameA = a.product_name.toUpperCase();
          const nameB = b.product_name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
        setSortOrder(text)
        setProducts(productSorted)
        break;
      case 'product name:Z-A':
        productSorted = products.sort((a, b) => {
          const nameA = a.product_name.toUpperCase();
          const nameB = b.product_name.toUpperCase();
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        })

        setSortOrder(text)
        setProducts(productSorted)
        break;

      default:
        break;
    }

  }

  return (
    <main className="p-20 text-black">
      <div className="flex flex-col pb-8 items-center justify-items-center">
        <div className="flex flex-row">
          <div className="w-96"><FormInput name='search' type="text" value={searchText} placeholder="Enter search Text" onChange={(e: any) => setSearchText(e.target.value)} /></div>
          <div style={{ marginTop: 10 }}><FormButton onClick={handleSearch} disabled={false}>Search</FormButton></div>
        </div>
        <div className="flex flex-row-reverse mt-4" style={{ width: '100%', borderRadius: 6 }}>
          <label style={{ backgroundColor: 'white' }} htmlFor="sort">{ }</label>
          <select name='sort' id='sort' onChange={handleSortOrder}>
            <option value='Brand:A-Z'>Brand:A-Z</option>
            <option value='Brand:Z-A'>Brand:Z-A</option>
            <option value='product name:A-Z'>product name:A-Z</option>
            <option value='product name:Z-A'>product name:Z-A</option>
          </select>
        </div>
      </div>
      {products.length > 0 && <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">{productList()}</div>}
      {!products.length && <p className="text-center ">Nothing to show</p>}

    </main>
  );
}
