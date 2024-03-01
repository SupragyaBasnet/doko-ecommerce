import axios from "axios";

export function fetchAPIProducts(page = 0, limit = 10, type = undefined) {
  let url = `http://localhost:8080/items?page=${page}&&limit=${limit}`;
  if (type) {
    url = url + `&&type=${type}`;
  }
  return axios.get(url).then((response) => {
    if (response.status === 200 && response.data.httpStatus === "OK") {
      const items = response.data.dataArray;
      items.map(
        (item, index) =>
          (item.image = "http://localhost:8080/items/" + item.id + "/image")
      );

      return new Promise((resolve, reject) => {
        resolve(items);
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("API call failed.");
      });
    }
  });
}

export function DeleteAPIItem(item_id) {
  return axios.delete(`http://localhost:8080/admin/items/${item_id}`);
}

export default fetchAPIProducts;