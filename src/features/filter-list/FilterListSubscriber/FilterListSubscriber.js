import {memo, useEffect} from "react";
import {useHttp} from "../../../hooks/http.hook";
import {fetchFilters} from "../../../components/heroesFilters/filtersSlice";
import {useDispatch} from "react-redux";

const FilterListSubscriberComponent = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));

        // eslint-disable-next-line
    }, []);

    return null;
}

export const FilterListSubscriber = memo(FilterListSubscriberComponent);
