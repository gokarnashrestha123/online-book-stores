import React, { useState } from "react";
import upload_icon from "../assets/upload_icon.jpg";
import { TbTrash } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { backend_url } from "../App";
import styles from "./Add.module.css";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [popular, setPopular] = useState(false);

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("popular", popular);
      formData.append("image", image);

      const response = await axios.post(
        `${backend_url}/api/product/create`,
        formData,
        { headers: { token } }
      );
      // console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImage(null);
        setPopular(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className={styles.formContainer}>
        <div>
          <h5>Product Name</h5>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div>
          <h5>Product Description</h5>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <div>
          <h5>Category</h5>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Fiction">Fiction</option>
            <option value="Children">Children</option>
            <option value="Health">Health</option>
            <option value="Academic">Academic</option>
            <option value="Business">Business</option>
            <option value="Religious">Religious</option>
          </select>
        </div>

        <div className={styles.imageUpload}>
          <h5>Image</h5>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : upload_icon}
              alt="upload"
            />
            <input
              type="file"
              onChange={handleChangeImage}
              name="image"
              id="image"
              hidden
            />
          </label>
        </div>

        <div>
          <h5>Price</h5>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="Price"
            min={0}
          />
        </div>

        <div className={styles.checkboxContainer}>
          <input
            onChange={(e) => setPopular((prev) => !prev)}
            type="checkbox"
            checked={popular}
            id="popular"
          />
          <label htmlFor="popular">Add to popular</label>
        </div>

        <button type="submit" className={styles.submitButton}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
