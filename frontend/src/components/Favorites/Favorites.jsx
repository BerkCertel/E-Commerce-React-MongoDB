import FavoritesProgress from "./FavoritesProgress";
import FavoritesTable from "./FavoritesTable";
import FavoritesTotal from "./FavoritesTotal";

function Favorites() {
    return (
        <section className="favorites-main-div">
            <div className="container p-3">
                <div className="row">
                    <div className="col-md-8 col-12">

                        <div className="progress-bar">
                            <FavoritesProgress />
                        </div>

                        <div className="table-responsive card-table-div">
                            <FavoritesTable />
                        </div>

                    </div>

                    <FavoritesTotal />
                </div>
            </div>
        </section>
    )
}

export default Favorites;
