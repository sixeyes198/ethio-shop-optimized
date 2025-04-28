import React from "react";
import { useState, useEffect } from "react";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    quantity: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

// useEffect(()=>{
//     const savedProducts = localStorage.getItem("products")
//     try{
//         if(savedProducts){
//             const parsedProducts = JSON.parse(savedProducts)
//             if(Array.isArray(parsedProducts)){
//                 setProducts(parsedProducts)
//             }else{
//                 console.error("products in storage")
//             }
//         }
//     }catch(error){
//         console.error("error parsing products from localstorage");
        
//     }
// },[]);

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ name: "", price: "", image: "", quantity: 0 });
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleEditProduct = (product) => {
    setEditingId(product.id);
    setEditedProduct(product);
  };

  const handleSaveEditedProduct = () => {
    const updatedProducts = products.map((product) =>
      product.id === editingId ? editedProduct : product
    );
    setProducts(updatedProducts);
    setEditingId(null);
    setEditedProduct({});
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Add New Product */}
        <div className="bg-white shadow p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Image Url"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value),
                })
              }
              className="border p-2 rounded"
            />
            {/* <input
              type="number"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  quantity: parseInt(e.target.value),
                })
              }
              className="border p-2 rounded"
            /> */}
            <button
              onClick={handleAddProduct}
              className="bg-amber-500 text-white py-2 rounded hover:bg-amber-600"
            >
              Add Product
            </button>
          </div>
        </div>
        {/* Product List */}
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          {products.length === 0 ? (
            <p>No products yet.</p>
          ) : (
            <ul className="space-y-6">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center"
                >
                  {editingId === product.id ? (
                    // Editing Mode
                    <div className="flex flex-col w-full gap-2">
                      <input
                        type="text"
                        value={editedProduct.name}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            name: e.target.value,
                          })
                        }
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        value={editedProduct.image}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            image: e.target.value,
                          })
                        }
                        className="border p-2 rounded"
                      />
                      <input
                        type="number"
                        value={editedProduct.price}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            price: parseFloat(e.target.value),
                          })
                        }
                        className="border p-2 rounded"
                      />
                      {/* <input
                        type="number"
                        value={editedProduct.quantity}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            quantity: parseInt(e.target.value),
                          })
                        }
                        className="border p-2 rounded"
                      /> */}
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEditedProduct}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Normal View Mode
                    <>
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-bold">{product.name}</h3>
                          <p>
                            {product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
