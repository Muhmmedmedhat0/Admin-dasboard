import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { createProduct } from "../../app/slices/products";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { Watch } from '@material-ui/icons';


import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase.js";

import "./newProduct.css";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSize] = useState([]);
  const [loading, setLoading] = useState(false);

const navigate = useNavigate();
  const { error } = useSelector((state) => state.products);


  const dispatch = useDispatch();

  function handleInputs(e) {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  function handleCategorie(e) {
    setCategorie(e.target.value.split(","));
  }
  function handleColors(e) {
    setColors(e.target.value.split(","));
  }
  function handleSize(e) {
    setSize(e.target.value.split(","));
  }
  function hanleSubmit(event) {
    event.preventDefault();
    const fileName = new Date().getTime() + file.name;

    // working with firebase
    // 1.Create a root reference
    const storage = getStorage(app);
    // Create a reference to file
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        setLoading(true)
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            categories: categorie,
            color: colors,
            size: sizes,
          };
          // dispach action
          dispatch(createProduct(product));
          setLoading(false)
          if(!loading){
            navigate('/products')
          }
        });
      },
    );
  }
  return (
    <div className="container-fluid">
      <Sidebar />
      <div className="new-product">
        <h1 className="add-product-title">New Product</h1>
        <form className="add-product__form" onSubmit={hanleSubmit}>
          <div className="add-product-item">
            <label>Image</label>
            <input type="file" id="file" name="img" onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="add-product-item">
            <label>Title</label>
            <input name="title" type="text" placeholder="Shirt" onChange={handleInputs} />
          </div>
          <div className="add-product-item">
            <label>Description</label>
            <input name="description" type="text" placeholder="description" onChange={handleInputs} />
          </div>
          <div className="add-product-item">
            <label>Categorie</label>
            <input name="categories" type="text" placeholder="jeans, coat, women" onChange={handleCategorie} />
          </div>
          <div className="add-product-item">
            <label>Color</label>
            <input name="categories" type="text" placeholder="red, green, blue" onChange={handleColors} />
          </div>
          <div className="add-product-item">
            <label>Size</label>
            <input name="size" type="text" placeholder="m, l, xl, xxl" onChange={handleSize} />
          </div>
          <div className="add-product-item">
            <label>Price</label>
            <input name="price" type="number" onChange={handleInputs} />
          </div>
          <div className="add-product-item">
            <label>inStock</label>
            <select name="inStock" id="active " onChange={handleInputs}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <p style={{textAlign: "center", color: 'red'}}>{error ? 'something went wrong!' : null}</p>
          <button disabled={loading === true} type="submit" className="add-product-button"> {loading ? <Watch/> : 'Create'}</button>
          
        </form>

      </div>
    </div>
  );
}
