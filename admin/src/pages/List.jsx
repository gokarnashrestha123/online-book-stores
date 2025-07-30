import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url, currency } from "../App";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";
import { FiEdit } from "react-icons/fi"; // Edit icon
import styles from "./List.module.css";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchlist = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backend_url + "/api/product/delete",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchlist();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h5>Image</h5>
        <h5>Name</h5>
        <h5>Category</h5>
        <h5>Price</h5>
        <h5>Remove</h5>
        <h5>Edit</h5>
      </div>

      {list.map((item) => (
        <div key={item._id} className={styles.productRow}>
          <img src={item.image} alt={item.name} />
          <h5>{item.name}</h5>
          <p>{item.category}</p>
          <div>
            {currency}
            {item.price}
          </div>
          <div
            className={styles.iconButton}
            onClick={() => removeProduct(item._id)}
            title="Remove product"
          >
            <TbTrash />
          </div>
          <div className={styles.iconButton} title="Edit product">
            <FiEdit />
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
