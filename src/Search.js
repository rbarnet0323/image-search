import React, { Component } from "react";
import ModalImage from "react-modal-image";
import InfiniteScroll from "react-infinite-scroll-component";
import './Search.css';
class Search extends Component {
    state = {
        keyword: '',
        images: [],
        page: 2,
        hasMore: true
    };
    handleInput = event => {
        this.setState({ images: [] });
        this.setState({ keyword: event.target.value });
    };
    handleClick = () => {
        if (this.state.keyword.length > 0) {
            fetch(`http://localhost:8080/search/${this.state.keyword}/1`).then(res => {
                return res.json();
            }).then(res => {
                this.setState({ images: res.results });
                this.setState({ page: 2 });
                this.setState({ hasMore: res.results.length >= 21 });
            });
        }
    };
    loadMore = () => {
        fetch(`http://localhost:8080/search/${this.state.keyword}/${this.state.page}}`).then((res) => {
            return res.json();
        }).then(res => {
            this.setState({ images: this.state.images.concat(res.results) });
            this.setState({ page: this.state.page + 1 });
            this.setState({ hasMore: res.results.length >= 21 });
        });
    }
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
                    <InfiniteScroll
                        dataLength={this.state.images.length}
                        next={this.loadMore}
                        hasMore={this.state.hasMore}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>End Of Search Results</b>
                            </p>
                        }
                    >
                        <div className="results">
                            {this.state.images.map((image, index) => (
                                <div className="result" key={index}>
                                    <ModalImage
                                        small={image.urls.thumb}
                                        large={image.urls.full}
                                    />
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                ) : (
                    <p>Search Result Empty</p>
                )}
            </div>
        );
    }
}
export default Search;