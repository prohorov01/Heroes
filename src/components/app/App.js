import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import './app.scss';
import {FilterListSubscriber} from "../../features/filter-list/FilterListSubscriber/FilterListSubscriber";

const App = () => {
    
    return (
        <main className="app">
            <div className="content">
                <FilterListSubscriber/>
                <HeroesList/>
                <div className="content__interactive">
                    <HeroesAddForm/>
                    <HeroesFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;