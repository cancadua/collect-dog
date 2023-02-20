import './navigation.css'
import { useState } from "react";

const Navigation = ({ displayBreed, breedList }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const backToSearchHandler = (breed = '') => {
        displayBreed(breed)
        setIsExpanded(false)
    }

    return (
        <>
            <button aria-label="Name" className="menu-hamburger" onClick={() => setIsExpanded(!isExpanded)}>
                <div style={{transition: 'all 0.3s ease-in', transform: isExpanded ? 'rotate(90deg)' : ''}}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
            </button>
            {isExpanded ?
                <div className="navigation">
                    <button onClick={() => backToSearchHandler()}>
                        Back to search
                    </button>
                    {breedList &&
                        breedList?.map((item, i) => {
                            return (
                                <button
                                    key={i}
                                    value={item.breed}
                                    onClick={e => {
                                        backToSearchHandler(e?.target.value);
                                    }}
                                    className={"breeds"}
                                >
                                    {item.breed} ({item.images.length})
                                </button>
                            )
                        })
                    }
                </div> :
                <></>
            }
        </>
    );
}

export default Navigation;
