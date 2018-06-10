import * as React from 'react';
import GiphyImage from './GiphyImage';

interface Beer {
  id: string;
  name: string;
}

interface BeerListProps {
}

interface BeerListState {
  beers: Array<Beer>;
  isLoading: boolean;
}

class BeerList extends React.Component<BeerListProps, BeerListState> {

  constructor(props: BeerListProps) {
    super(props);

    this.state = {
      beers: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    
    let isLoadFromServer = false;
    if (!isLoadFromServer) {
      let beersJson = '[{"id":1,"name":"Kentucky Brunch Brand Stout"},{"id":2,"name":"Good Morning"},{"id":3,"name":"Very Hazy"},{"id":4,"name":"King Julius"}]';
      let beersList: Array<Beer> = JSON.parse(beersJson);
      this.setState({beers: beersList, isLoading: false});
    } else {
      fetch('./good-beers.json')
        .then(response => response.json())
        .then(data => this.setState({beers: data, isLoading: false}));
    }
  }

  render() {
    const {beers, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h2>Beer List</h2>
        {beers.map((beer: Beer) =>
          <div key={beer.id}>
            {beer.name}<br/>
            <GiphyImage name={beer.name}/>
          </div>
        )}
      </div>
    );
  }
}

export default BeerList;