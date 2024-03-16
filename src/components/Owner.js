import React from 'react'
import { useState, useEffect } from 'react';
import { auth } from "../firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';

export default function Owner() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ category: "", category_desc: "" });
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [newBrand, setNewBrand] = useState({ brand: "" });
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [newVendor, setNewVendor] = useState({ name: "", email: "", phone: "", web: "" });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ p_name: "", p_desc: "", price: "", quantity: "", image: "", alt: "", inc_quantity: "" });
  const [forceRerender, setForceRerender] = useState(false);

  // console.log(user)
  const [signOut, loading1, error1] = useSignOut(auth);
  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  // console.log(products)

  const handleNewCategory = (e) => {
    setNewCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addCategory = async (e) => {
    e.preventDefault();
    const requiredFields = ['category', 'category_desc'];
    const isAnyFieldEmpty = requiredFields.some(field => !newCategory[field]);
    if (isAnyFieldEmpty)
      return alert("Please fill all fields");

    try {
      // Send new category data to Flask backend
      const response = await fetch('http://127.0.0.1:5000/add_category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          displaytext: newCategory.category,
          desc: newCategory.category_desc,
        })
      });

      if (response.ok) {
        alert("New category added")
        setForceRerender(!forceRerender)
      } else {
        throw new Error('Failed to add category');
      }
    } catch (error) {
      alert(error)
    }
  };
  const deleteCategory = async (e) => {
    e.preventDefault();
    if (selectedCategory === null)
      return alert("Select a category");
    try {
      // Send new category data to Flask backend
      const response = await fetch('http://127.0.0.1:5000/delete_category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedCategory
        })
      });

      if (response.ok) {
        alert("Category deleted")
        setSelectedCategory(null)
        setForceRerender(!forceRerender)
      } else {
        throw new Error('Failed to delete category');
      }
    } catch (error) {
      alert(error)
    }
  };

  const handleNewBrand = (e) => {
    setNewBrand((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addBrand = async (e) => {
    e.preventDefault();
    const requiredFields = ['brand'];
    const isAnyFieldEmpty = requiredFields.some(field => !newBrand[field]);
    if (isAnyFieldEmpty)
      return alert("Please fill all fields");

    try {
      // Send new category data to Flask backend
      const response = await fetch('http://127.0.0.1:5000/add_brand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          brand: newBrand.brand
        })
      });

      if (response.ok) {
        alert("New brand added")
        setForceRerender(!forceRerender)
      } else {
        throw new Error('Failed to add brand');
      }
    } catch (error) {
      alert(error)
    }
  };
  const deleteBrand = async (e) => {
    e.preventDefault();
    if (selectedBrand === null)
      return alert("Select a category");
    try {
      // Send new category data to Flask backend
      const response = await fetch('http://127.0.0.1:5000/delete_brand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedBrand
        })
      });

      if (response.ok) {
        alert("Brand deleted")
        setSelectedBrand(null)
        setForceRerender(!forceRerender)
      } else {
        throw new Error('Failed to delete brand');
      }
    } catch (error) {
      alert(error)
    }
  };

  const handleNewVendor = (e) => {
    setNewVendor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addVendor = async (e) => {
    e.preventDefault();
    const requiredFields = ['name', 'email', 'phone', 'web'];
    const isAnyFieldEmpty = requiredFields.some(field => !newVendor[field]);
    if (isAnyFieldEmpty)
      return alert("Please fill all fields");

    try {
      // Send new category data to Flask backend
      const response = await fetch('http://127.0.0.1:5000/add_vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newVendor.name,
          email: newVendor.email,
          phone: newVendor.phone,
          web: newVendor.web
        })
      });

      if (response.ok) {
        alert("New brand added")
        setForceRerender(!forceRerender)
      } else {
        throw new Error('Failed to add brand');
      }
    } catch (error) {
      alert(error)
    }
  };
  const deleteVendor = async (e) => {
    e.preventDefault();
    if (selectedVendor === null)
      return alert("Select a vendor");
    try {
      // Send new category data to Flask backend
      const response = await fetch('http://127.0.0.1:5000/delete_vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedVendor
        })
      });

      if (response.ok) {
        alert("Vendor deleted")
        setSelectedVendor(null)
        setForceRerender(!forceRerender)
      } else {
        throw new Error('Failed to delete vendor');
      }
    } catch (error) {
      alert(error)
    }
  };

  const handleNewProduct = (e) => {
    setNewProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addProduct = async (e) => {
    e.preventDefault();
    if (parseInt(newProduct.quantity) < 1)
      return alert("Quantity must be atleast 1")
    if (selectedBrand === null)
      return alert("Select corresponding brand")
    if (selectedCategory === null)
      return alert("Select corresponding category")
    if (selectedVendor === null)
      return alert("Select corresponding vendor")
    const requiredFields = ['p_name', 'p_desc', 'price', 'quantity', 'image', 'alt'];
    const isAnyFieldEmpty = requiredFields.some(field => !newProduct[field]);
    if (isAnyFieldEmpty)
      return alert("Please fill all fields");

    try {
      // Send new category data to Flask backend
      const response = await fetch('http://127.0.0.1:5000/add_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          p_name: newProduct.p_name,
          p_desc: newProduct.p_desc,
          price: newProduct.price,
          quantity: newProduct.quantity,
          image: newProduct.image,
          alt: newProduct.alt,
          brand_id: selectedBrand,
          category_id: selectedCategory,
          vendor_id: selectedProduct,
        })
      });

      if (response.ok) {
        alert("New product added")
        setForceRerender(!forceRerender)
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      alert(error)
    }
  };
  const deleteProduct = async (e) => {
    e.preventDefault();
    if (selectedProduct === null)
      return alert("Select a product");
    try {
      // Send new category data to Flask backend
      const response = await fetch('http://127.0.0.1:5000/delete_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedProduct
        })
      });

      if (response.ok) {
        alert("Product deleted")
        setSelectedProduct(null)
        setForceRerender(!forceRerender)
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      alert(error)
    }
  };

  useEffect(() => {
    //fetch data from db
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/categories");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        // console.log(JSON.parse(jsonData[0]));
        setCategories(JSON.parse(jsonData[0]))
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/brands");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        // console.log(JSON.parse(jsonData[0]));
        setBrands(JSON.parse(jsonData[0]))
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    const fetchVendors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/vendors");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        // console.log(JSON.parse(jsonData[0]));
        setVendors(JSON.parse(jsonData[0]))
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/products");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        // console.log(JSON.parse(jsonData[0]));
        setProducts(JSON.parse(jsonData[0]))
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    fetchVendors();
    fetchCategories();
    fetchProducts();
    fetchBrands();
  }, [forceRerender]);

  const updateProductQuantity = async (e) => {
    e.preventDefault();
    if (selectedProduct === null)
      return alert("Select a product");
    try {
      // Send new category data to Flask backend
      const response = await fetch('http://127.0.0.1:5000/update_product_quantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedProduct,
          quantity:newProduct.inc_quantity
        })
      });

      if (response.ok) {
        alert("Product updated")
        setSelectedProduct(null)
        setForceRerender(!forceRerender)
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      {!loading1 && (<button
        onClick={handleLogout}
        className="block rounded-md bg-gray-900 mt-4 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
      >
        Signout
      </button>)}
      <div className="flex flex-row items-start ml-10 sm:ml-[100px] mt-10 sm:mt-20 mr-10 sm:mr-0 flex-wrap mb-10">
        <div className="flex flex-col grow w-1/2 overflow-y-auto max-h-96">
          <div className="text-4xl mt-10 mb-10 font-semibold">Categories</div>
          <div className="flow-root">
            <dl className="-my-3 divide-y divide-gray-100 text-sm"></dl>
            {categories ? (
              categories.map((category, index) => (
                <div
                  key={category.Category_ID}
                  onClick={() => setSelectedCategory(category.Category_ID)} // Update the selected categories on click
                  className={`grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-4 sm:gap-4 cursor-pointer ${selectedCategory === category.Category_ID ? 'border border-blue-500' : '' // Apply border for selected categories
                    }`}
                >
                  <dt className="font-medium text-gray-900">{category.Category_ID}</dt>
                  <dd className="text-gray-700 sm:col-span-2">{category.Category}</dd>
                  <dd className="text-gray-700 sm:col-span-1">{category.Category_Description}</dd>
                </div>
              ))
            ) : (
              <div>No Categories</div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start w-full sm:w-1/2 pl-0 sm:pl-[10%]">
          <div className="text-3xl my-10 font-semibold">Add Categories</div>
          <div>
            <label htmlFor="categories" className="block text-xs font-medium text-gray-700"> Category </label>
            <input
              onChange={handleNewCategory}
              id="category"
              name="category"
              className="mt-1 w-[300px] rounded-md border-solid border-gray-600 shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="PostalCode" className="block text-xs font-medium text-gray-700 mt-3"> Category Description</label>
            <input
              onChange={handleNewCategory}
              id="category_desc"
              name="category_desc"
              className="mt-1 w-[300px] rounded-md border-solid border-gray-600 shadow-sm sm:text-sm"
            />
          </div>
          <button
            onClick={addCategory}
            className="block rounded-md bg-gray-900 mt-4 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
          >
            Add Category
          </button>
          <button
            onClick={deleteCategory}
            className="block rounded-md bg-gray-900 mt-4 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
          >
            Delete Category
          </button>
        </div>
      </div>

      <div className="flex flex-row items-start ml-10 sm:ml-[100px] mt-10 sm:mt-20 mr-10 sm:mr-0 flex-wrap mb-10">
        <div className="flex flex-col grow w-1/2 overflow-y-auto max-h-96">
          <div className="text-4xl mt-10 mb-10 font-semibold">Brands</div>
          <div className="flow-root">
            <dl className="-my-3 divide-y divide-gray-100 text-sm"></dl>
            {brands ? (
              brands.map((brand, index) => (
                <div
                  key={brand.Brand_ID}
                  onClick={() => setSelectedBrand(brand.Brand_ID)} // Update the selected categories on click
                  className={`grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-4 sm:gap-4 cursor-pointer ${selectedBrand === brand.Brand_ID ? 'border border-blue-500' : '' // Apply border for selected categories
                    }`}
                >
                  <dt className="font-medium text-gray-900">{brand.Brand_ID}</dt>
                  <dd className="text-gray-700 sm:col-span-2">{brand.Brand}</dd>
                </div>
              ))
            ) : (
              <div>No Brands</div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start w-full sm:w-1/2 pl-0 sm:pl-[10%]">
          <div className="text-3xl my-10 font-semibold">Add Brands</div>
          <div>
            <label htmlFor="brand" className="block text-xs font-medium text-gray-700"> Brand </label>
            <input
              onChange={handleNewBrand}
              id="brand"
              name="brand"
              className="mt-1 w-[300px] rounded-md border-solid border-gray-600 shadow-sm sm:text-sm"
            />
          </div>
          <button
            onClick={addBrand}
            className="block rounded-md bg-gray-900 mt-4 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
          >
            Add Brand
          </button>
          <button
            onClick={deleteBrand}
            className="block rounded-md bg-gray-900 mt-4 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
          >
            Delete Brand
          </button>
        </div>
      </div>

      <div className="flex flex-row items-start ml-10 sm:ml-[100px] mt-10 sm:mt-20 mr-10 sm:mr-0 flex-wrap mb-10">
        <div className="flex flex-col grow w-1/2 overflow-y-auto max-h-96">
          <div className="text-4xl mt-10 mb-10 font-semibold">Vendors</div>
          <div className="flow-root">
            <dl className="-my-3 divide-y divide-gray-100 text-sm"></dl>
            {vendors ? (
              vendors.map((vendor, index) => (
                <div
                  key={vendor.Vendor_ID}
                  onClick={() => setSelectedVendor(vendor.Vendor_ID)} // Update the selected categories on click
                  className={`grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 cursor-pointer ${selectedVendor === vendor.Vendor_ID ? 'border border-blue-500' : '' // Apply border for selected categories
                    }`}
                >
                  <dt className="font-medium text-gray-900">{vendor.Vendor_ID}</dt>
                  <dd className="text-gray-700 sm:col-span-2">{vendor.Vendor}</dd>
                  <dd className="text-gray-700 sm:col-span-1">{vendor.Vendor_Email}</dd>
                  <dd className="text-gray-700 sm:col-span-1">{vendor.Vendor_Phone}</dd>
                  <dd className="text-gray-700 sm:col-span-1">{vendor.Vendor_Website}</dd>
                </div>
              ))
            ) : (
              <div>No Vendors</div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start w-full sm:w-1/2 pl-0 sm:pl-[10%]">
          <div className="text-3xl my-10 font-semibold">Add Vendors</div>
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-gray-700"> Vendor </label>
            <input
              onChange={handleNewVendor}
              id="name"
              name="name"
              className="mt-1 w-[300px] rounded-md border-solid border-gray-600 shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mt-3"> Email </label>
            <input
              onChange={handleNewVendor}
              id="email"
              name="email"
              className="mt-1 w-[300px] rounded-md border-solid border-gray-600 shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mt-3"> Phone No </label>
            <input
              onChange={handleNewVendor}
              id="phone"
              name="phone"
              className="mt-1 w-[300px] rounded-md border-solid border-gray-600 shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="web" className="block text-xs font-medium text-gray-700 mt-3"> Website </label>
            <input
              onChange={handleNewVendor}
              id="web"
              name="web"
              className="mt-1 w-[300px] rounded-md border-solid border-gray-600 shadow-sm sm:text-sm"
            />
          </div>
          <button
            onClick={addVendor}
            className="block rounded-md bg-gray-900 mt-4 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
          >
            Add Vendor
          </button>
          <button
            onClick={deleteVendor}
            className="block rounded-md bg-gray-900 mt-4 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
          >
            Delete Vendor
          </button>
        </div>
      </div>

      <div className="flex flex-row items-start ml-10 sm:ml-[100px] mt-10 sm:mt-20 mr-10 sm:mr-0 flex-wrap mb-10">
        <div className="flex flex-col grow w-1/2 overflow-y-auto max-h-96">
          <div className="text-4xl mt-10 mb-10 font-semibold">Products</div>
          <div className="flow-root">
            <dl className="-my-3 divide-y divide-gray-100 text-sm"></dl>
            {products ? (
              products.map((product, index) => (
                <div
                  key={product.Product_ID}
                  onClick={() => setSelectedProduct(product.Product_Id)} // Update the selected categories on click
                  className={`grid grid-cols-1 gap-1 py-3  sm:grid-cols-3 sm:gap-4 cursor-pointer ${product.Product_Stock === 1 ? 'bg-red-600' : 'even:bg-gray-50'} ${selectedProduct === product.Product_Id ? 'border border-blue-500' : '' // Apply border for selected categories
                    }`}
                >
                  <dt className="font-medium text-gray-900">{product.Product_Id}</dt>
                  <dd className="text-gray-700 sm:col-span-2">{product.Product}</dd>
                  <dd className="text-gray-700 sm:col-span-1">{product.Product_Name}</dd>
                  <dd className="text-gray-700 sm:col-span-1">{product.Product_Description}</dd>
                  <dd className="text-gray-700 sm:col-span-1">{product.Product_Price.toFixed(2)}</dd>
                  <dd className="text-gray-700 sm:col-span-1">{product.Product_Quantity}</dd>
                  {/* <dd className="text-gray-700 sm:col-span-1 text-wrap">{product.Product_Image}</dd>
                                        <dd className="text-gray-700 sm:col-span-1">{product.Product_Alt}</dd> */}
                </div>
              ))
            ) : (
              <div>No Products</div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start w-full sm:w-1/2 pl-0 sm:pl-[10%]">
          <div className="text-3xl my-10 font-semibold">Add Products</div>
          <div>
            <label htmlFor="p_name" className="block text-xs font-medium text-gray-700"> Name </label>
            <input
              onChange={handleNewProduct}
              id="p_name"
              name="p_name"
              className="mt-1 w-[300px] rounded-md border-solid border-gray-600 shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="p_desc" className="block text-xs font-medium text-gray-700 mt-3"> Description </label>
            <input
              onChange={handleNewProduct}
              id="p_desc"
              name="p_desc"
              className="mt-1 w-[300px] rounded-md border-solid border-gray-600 shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-xs font-medium text-gray-700 mt-3"> Price </label>
            <input
              onChange={handleNewProduct}
              id="price"
              name="price"
              className="mt-1 w-[300px] rounded-md border-solid border-gray-600 shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-xs font-medium text-gray-700 mt-3"> Quantity </label>
            <input
              onChange={handleNewProduct}
              id="quantity"
              name="quantity"
              className="mt-1 w-[300px] rounded-md border-solid border-gray-600 shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-xs font-medium text-gray-700 mt-3"> Image Path </label>
            <input
              onChange={handleNewProduct}
              id="image"
              name="image"
              className="mt-1 w-[300px] rounded-md border-solid border-gray-600 shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="alt" className="block text-xs font-medium text-gray-700 mt-3"> Alt </label>
            <input
              onChange={handleNewProduct}
              id="alt"
              name="alt"
              className="mt-1 w-[300px] rounded-md border-solid border-gray-600 shadow-sm sm:text-sm"
            />
          </div>
          <button
            onClick={addProduct}
            className="block rounded-md bg-gray-900 mt-4 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
          >
            Add Product
          </button>
          <button
            onClick={deleteProduct}
            className="block rounded-md bg-gray-900 mt-4 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
          >
            Delete Product
          </button>
          <div>
            <label htmlFor="quantity" className="block text-xs font-medium text-gray-700 mt-3"> Update Quantity </label>
            <input
              onChange={handleNewProduct}
              id="inc_quantity"
              name="inc_quantity"
              className="mt-1 w-[300px] rounded-md border-solid border-gray-600 shadow-sm sm:text-sm"
            />
          </div>
          <button
            onClick={updateProductQuantity}
            className="block rounded-md bg-gray-900 mt-4 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
          >
            Update Product Quantity
          </button>
        </div>
      </div>
    </>

  )
}
