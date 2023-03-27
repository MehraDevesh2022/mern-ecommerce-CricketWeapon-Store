import React, { useEffect, useState } from "react";
import "./NewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Sidebar from "./Siderbar";
import { updateProduct, clearErrors , getProductDetails } from "../../actions/productAction";
import { useHistory } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productsConstatns";
import { useRouteMatch } from "react-router-dom";
import { render } from "react-dom";


function UpdateProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const productId = useRouteMatch().params.id;
   console.log(productId);
  const { error, product } = useSelector((state) => state.productDetails);

  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
   
    if (product && product._id !== productId) {
   
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    images.forEach((currImg) => {
      myForm.append("images", currImg);
    });

    dispatch(updateProduct(productId ,myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
      setOldImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prv) => [...prv, reader.result]);
          setImages((prv) => [...prv, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <>
            <MetaData title="Create Product" />
            <div className="dashboard">
              <Sidebar />
              <div className="newProductContainer">
                <form
                  className="createProductForm"
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <h1>Create Product</h1>

                  <div>
                    <SpellcheckIcon />
                    <input
                      type="text"
                      placeholder="Product Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <AttachMoneyIcon />
                    <input
                      type="number"
                      placeholder="Price"
                      value={price}
                      required
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div>
                    <DescriptionIcon />

                    <textarea
                      placeholder="Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      cols="30"
                      rows="1"
                    ></textarea>
                  </div>

                  <div>
                    <AccountTreeIcon />
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                    >
                      <option value="">Choose Category</option>
                      {categories.map((cate) => (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <StorageIcon />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={Stock}
                      required
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <div id="createProductFormFile">
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProductImagesChange}
                      multiple
                    />
                  </div>
                  <div id="createProductFormImage">
                    {oldImages &&
                      oldImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt="Old Product Preview"
                        />
                      ))}
                  </div>

                  <div id="createProductFormImage">
                    {imagesPreview.map((image, index) => (
                      <img key={index} src={image} alt="Product Preview" />
                    ))}
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    Create
                  </Button>
                </form>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}
export default UpdateProduct;
