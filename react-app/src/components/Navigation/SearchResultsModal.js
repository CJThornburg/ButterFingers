import { Link } from "react-router-dom";
import { useModal } from "../../context/Modal";

function SearchResultsModal({ exactMatch, exactUserName, results }) {
    const { closeModal } = useModal();




    console.log(results, "results in modal")

    return (
        <div className="SR-div">
            <h1 className="wgt HFont">Search results</h1>
            <div className="SR-div SR-inner">
                {exactMatch && <>
                    <Link onClick={closeModal} className="anti-link userResult" to={`/users/${exactUserName}`}><span className="yt HFont userLink">{exactUserName} </span></Link>
                </>}

                {results.map((result) => (
                    result.username !== exactUserName && (
                        <Link
                            key={result.username}
                            onClick={closeModal}
                            className="anti-link userResult"
                            to={`/users/${result.username}`}
                        >
                            <span className="wgt HFont userLink">{result.username}</span>
                        </Link>
                    )
                ))}
            </div>
        </div>
    )









}
export default SearchResultsModal;
