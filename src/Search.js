import React, { Component } from "react";
import './Search.css';
class Search extends Component {
    state = {
        keyword: '',
        images: []
    };
    handleInput = event => {
        this.setState({ keyword: event.target.value });
    };
    handleClick = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.state.keyword}`).then(res => {
            return res.json();
        }).then(res => {
            this.setState({ images: res.meals });
        });
    };
    render() {
        return (
            <div>
                <input
                    name="text"
                    type="text"
                    placeholder="Keyword(s)"
                    onChange={event => this.handleInput(event)}
                    value={this.state.keyword}
                />
                <button onClick={this.handleClick}>Search</button>
                {this.state.images ? (
                    <div className="results">
                        {this.state.images.map((image, index) => (
                            <div className="result" key={index}>
                                <p>{image.strMeal}</p>
                                <img src={image.strMealThumb} alt="result" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Search Result Empty</p>
                )}
            </div>
        );
    }
}
export default Search;