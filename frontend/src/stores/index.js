import { createContext, useContext } from 'react';
import productStore from './product';

const stores = {
    productStore
}

export default stores;

export const storesContext = createContext(stores);

export const useStores = () => useContext(storesContext);