import "./Main.scss";

import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import SearchForm from "../../components/SearchForm/SearchForm";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../../state/cart";
import Catalogue from "../../assets/catalogue";
import Layout from "../layout";

export default function Main() {
  const { cart } = useCart();
  const [sideBarData, setSideBarData] = useState([]);
  const originalProducts = useRef([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // use fetch to get Catalogue data from api here
    setProducts([...Catalogue]);
    originalProducts.current = Catalogue;
    const sidebarPrice = [
      ...new Set(originalProducts.current.map((itm) => itm.price))
    ].sort((a, b) => a - b);

    setSideBarData((_) => [
      {
        cat: "Color",
        children: [
          ...new Set(originalProducts.current.map((itm) => itm.color))
        ].sort((a, b) => a.localeCompare(b))
      },
      {
        cat: "Gender",
        children: [
          ...new Set(originalProducts.current.map((itm) => itm.gender))
        ].sort((a, b) => a.localeCompare(b))
      },
      {
        cat: "Price",
        children: [sidebarPrice[0], sidebarPrice[sidebarPrice.length - 1]]
      },
      {
        cat: "Type",
        children: [
          ...new Set(originalProducts.current.map((itm) => itm.type))
        ].sort((a, b) => a.localeCompare(b))
      }
    ]);
  }, []);

  const handleProductFilter = (_filters) => {
    const isEmpty = checkIsEmpty(_filters);
    const _prods = _getFilteredProducts(originalProducts.current, _filters);
    if (isEmpty) {
      setProducts(originalProducts.current);
    } else {
      setProducts(_prods);
    }
  };

  const handleProductSearch = (searchText) => {
    // prettier-ignore
    const productsToFilter = products.length > 0 ? products : originalProducts.current;
    const filteredProds = productsToFilter.filter((itm) =>
      itm.name.toLowerCase().includes(searchText)
    );

    setProducts(filteredProds);
  };

  return sideBarData.length === 0 ? null : (
    <Layout>
      <SideBar data={sideBarData} handleProductFilter={handleProductFilter} />

      <main>
        <SearchForm handleProductSearch={handleProductSearch} />

        <div className="container_grid">
          {products.filter.length === 0
            ? "No products found"
            : products.map((prod, prd_idx) => (
                <ProductCard key={prd_idx} data={prod} />
              ))}
        </div>
      </main>
    </Layout>
  );
}

const _getFilteredProducts = (_products, _filters) => {
  return _products.filter((p) => {
    let meetsFilterCriteria = true;
    Object.entries(_filters).forEach(([k, v]) => {
      if (k === "price") {
        if (p.price < v[0] || p.price > v[1]) {
          meetsFilterCriteria = false;
        }
      } else {
        if (v.length > 0 && !v.includes(p[k])) {
          meetsFilterCriteria = false;
        }
      }
    });
    return meetsFilterCriteria;
  });
};

const checkIsEmpty = (_data) => {
  for (const key in _data) {
    if (_data.hasOwnProperty(key)) {
      const value = _data[key];
      if (value.length > 0) return false;
    }
  }
  return true;
};
