import {createSelector} from "reselect";
import {
    filtersActiveFilterSelector,
    filtersLoadingStatusSelector,
    filtersNetworkSelector,
    selectAll
} from "./filtersSlice";

export const heroesFiltersPropsSelector = createSelector(
    filtersActiveFilterSelector,
    filtersNetworkSelector,
    selectAll,
    (
        activeFilter,
        filtersNetwork,
        filters,
    ) => {
        return {
            filters,
            activeFilter,
            ...filtersNetwork,
        };
    }
)