import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TOKEN = sessionStorage.getItem('TOKEN');
const URL = 'https://e-comerce-api-a37q.vercel.app'

//fetchProducts
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(`${URL}/api/products/`, {
        method: "GET",
        headers: {'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${TOKEN}` },
      });
      const data = await response.json();
      return data.products;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

// deleteProduct
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`${URL}/api/products/${_id}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${TOKEN}` },
      });
      return _id;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

// updateProduct
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (values, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response=  await fetch(`${URL}/api/products/${values.id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

// createProduct
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (values, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(`${URL}/api/products/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: null,
    error: null,
  },
  extraReducers: {
    // get all products
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // deleteProducts
    [deleteProduct.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products.splice(
        state.products.findIndex(
          (product) => product._id === action.payload._id,
        ),
        1,
      );
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // updateProduct
    [updateProduct.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.user;
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.user;
    },
    // createProduct
    [createProduct.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;
