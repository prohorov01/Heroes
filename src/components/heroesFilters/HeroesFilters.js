import {useHttp} from "../../hooks/http.hook";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import store from "../../store";

import {
    filtersChanged,
    fetchFilters,
    selectAll,
    filtersNetworkSelector,
    filtersActiveFilterSelector
} from "./filtersSlice";
import Spinner from "../spinner/Spinner";
import {heroesFiltersPropsSelector} from "./HeroesFilters.selector";

const HeroesFilters = () => {
    const dispatch = useDispatch();

    const {isLoading, isFailed, activeFilter, filters} = useSelector(heroesFiltersPropsSelector);

    if (isLoading) {
        return <Spinner/>;
    }

    if (isFailed) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
        }

        return arr.map(({name, className, label}) => {
            const btnClass = classNames("btn", className, {
                active: name === activeFilter,
            });

            return (
                <button
                    key={name}
                    id={name}
                    className={btnClass}
                    onClick={() => {
                        dispatch(filtersChanged(name))
                    }}
                >
                    {label}
                </button>
            );
        });
    };

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">{elements}</div>
            </div>
        </div>
    );
};

export default HeroesFilters;
