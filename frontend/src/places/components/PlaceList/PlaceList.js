import PlaceItem from '../PlaceItem/PlaceItem';
import Card from '../../../shared/components/Card/Card';
import Button from '../../../shared/components/Button/Button';

import './PlaceList.css';

const PlaceList = ({ items }) => {
  if (items && items.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h3>There are no places at the moment.</h3>
          <Button to='/places/new'>Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <div>
      {items && items.map((item) => <PlaceItem key={item.id} item={item} />)}
    </div>
  );
};

export default PlaceList;
