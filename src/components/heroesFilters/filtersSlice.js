import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";
import {createSelector} from "reselect";

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: "none",
    activeFilter: "all",
});

export const fetchFilters = createAsyncThunk(
    "filters/fetchFilters",
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters");
    }
);

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        filtersChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, (state) => {
                state.filtersLoadingStatus = "loading";
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = "idle";
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, (state) => {
                state.filtersLoadingStatus = "error";
            })
            .addDefaultCase(() => {
            });
    },
});

const {actions, reducer} = filtersSlice;

export default reducer;

export const {selectAll} = filtersAdapter.getSelectors(
    (state) => state.filters
);

export const filtersStoreSelector = state => state.filters;
export const filtersLoadingStatusSelector = state => filtersStoreSelector(state).filtersLoadingStatus;
export const filtersActiveFilterSelector = state => filtersStoreSelector(state).activeFilter;

export const filtersNetworkSelector = createSelector(
    filtersLoadingStatusSelector,
    status => {
        return {
            isLoading: status !== 'idle' && status !== 'error',
            isFailed: status === 'error',
        };
    }
)


export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filtersChanged,
} = actions;
