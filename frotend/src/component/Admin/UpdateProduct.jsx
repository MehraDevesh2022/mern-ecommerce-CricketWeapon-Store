import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  FormControl,
} from "@material-ui/core";
import Sidebar from "./Siderbar";
import {
  updateProduct,
  clearErrors,
  getProductDetails,
} from "../../actions/productAction";
import { useHistory } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productsConstatns";
import { useRouteMatch } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@material-ui/core/Box";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CollectionsIcon from "@mui/icons-material/Collections";
import Select from "@material-ui/core/Select";
import InfoIcon from "@mui/icons-material/Info";
import MenuItem from "@material-ui/core/MenuItem";
import Navbar from "./Navbar";
import useStyles from "../User/LoginFromStyle";
function UpdateProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();

  const classes = useStyles();
  const productId = useRouteMatch().params.id;
  const { error, product } = useSelector((state) => state.productDetails);

  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isCategory, setIsCategory] = useState(false);
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [info , setInfo] = useState('');
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const fileInputRef = useRef();
  const [toggle, setToggle] = useState(false);
  const categories = [
    "Cricket Kits",
    "Batting Gloves",
    "Batting Pads",
    "Bats",
    "Bags",
    "Helmets",
    "Balls",
    "Stumps",
    "Shoes",
    "Clothing",
    "Accessories",
  ];
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory("");
      setInfo(product.info);  
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
    myForm.set("info", info);
    images.forEach((currImg) => {
      myForm.append("images", currImg);
    });


    dispatch(updateProduct(productId, myForm));
  };


  const handleImageUpload = () => {
    fileInputRef.current.click();
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
          setImagesPreview((prev) => [...prev, reader.result]);
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <>
            <MetaData title="Create Product" />
            <div className={classes.updateProduct}>
              <div
                className={
                  !toggle ? `${classes.firstBox1}` : `${classes.toggleBox1}`
                }
              >
                <Sidebar />
              </div>
              <div className={classes.secondBox1}>
                <div className={classes.navBar1}>
                  <Navbar toggleHandler={toggleHandler} />
                </div>

                <div
                  className={`${classes.formContainer} ${classes.formContainer2}`}
                >
                  <form
                    className={`${classes.form} ${classes.form2}`}
                    encType="multipart/form-data"
                  >
                    <Avatar className={classes.avatar}>
                      <AddCircleOutlineIcon />
                    </Avatar>
                    <Typography
                      variant="h5"
                      component="h1"
                      className={classes.heading}
                    >
                      Create Product
                    </Typography>
                    {/* SpellcheckIcon */}
                    <TextField
                      variant="outlined"
                      fullWidth
                      className={`${classes.nameInput} ${classes.textField}`}
                      label="Product Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <ShoppingCartOutlinedIcon
                              style={{
                                fontSize: 20,
                                color: "#414141",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Price"
                      value={price}
                      required
                      fullWidth
                      className={`${classes.passwordInput} ${classes.textField}`}
                      onChange={(e) => setPrice(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            style={{
                              fontSize: 20,
                              color: "#414141",
                            }}
                          >
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      variant="outlined"
                      label="Stock"
                      value={Stock}
                      required
                      className={`${classes.passwordInput} ${classes.textField}`}
                      onChange={(e) => setStock(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            style={{
                              fontSize: 20,
                              color: "#414141",
                            }}
                          >
                            <StorageIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Prodcut Info"
                      value={info}
                      required
                      className={`${classes.passwordInput} ${classes.textField}`}
                      onChange={(e) => setInfo(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            style={{
                              fontSize: 20,
                              color: "#414141",
                            }}
                          >
                            <InfoIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <div className={classes.selectOption}>
                      {!isCategory && (
                        <Typography
                          variant="body2"
                          className={classes.labelText}
                        >
                          Choose Category
                        </Typography>
                      )}
                      <FormControl className={classes.formControl}>
                        <Select
                          variant="outlined"
                          fullWidth
                          value={category}
                          onChange={handleCategoryChange}
                          className={classes.select}
                          inputProps={{
                            name: "category",
                            id: "category-select",
                          }}
                          MenuProps={{
                            classes: {
                              paper: classes.menu,
                            },
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                          }}
                        >
                          {!category && (
                            <MenuItem value="">
                              <em>Choose Category</em>
                            </MenuItem>
                          )}
                          {categories.map((cate) => (
                            <MenuItem key={cate} value={cate}>
                              {cate}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <TextField
                      variant="outlined"
                      fullWidth
                      className={classes.descriptionInput}
                      label="Product Description"
                      multiline
                      rows={1}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <DescriptionIcon
                              className={classes.descriptionIcon}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <div className={classes.root}>
                      <div className={classes.imgIcon}>
                        <CollectionsIcon
                          fontSize="large"
                          style={{ fontSize: 40 }}
                        />
                      </div>

                      <input
                        type="file"
                        name="avatar"
                        className={classes.input}
                        accept="image/*"
                        onChange={updateProductImagesChange}
                        multiple
                        style={{ display: "none" }}
                        ref={fileInputRef}
                      />
                      <label htmlFor="avatar-input">
                        <Button
                          variant="contained"
                          color="default"
                          className={classes.uploadAvatarButton}
                          startIcon={
                            <CloudUploadIcon
                              style={{
                                color: "#FFFFFF",
                              }}
                            />
                          }
                          onClick={handleImageUpload}
                        >
                          <p className={classes.uploadAvatarText}>
                            Upload Images
                          </p>
                        </Button>
                      </label>
                    </div>

                    {imagesPreview.length > 0 ? (
                      <Box className={classes.imageArea}>
                        {imagesPreview &&
                          imagesPreview.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt="Product Preview"
                              className={classes.image}
                            />
                          ))}
                      </Box>
                    ) : (
                      <Box className={classes.imageArea}>
                        {oldImages &&
                          oldImages.map((image, index) => (
                            <img
                              key={index}
                              src={image.url}
                              alt="Old Product Preview"
                              className={classes.image}
                            />
                          ))}
                      </Box>
                    )}

                    <Button
                      variant="contained"
                      className={classes.loginButton}
                      fullWidth
                      onClick={createProductSubmitHandler}
                      disabled={loading ? true : false}
                    >
                      Create
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}
export default UpdateProduct;
