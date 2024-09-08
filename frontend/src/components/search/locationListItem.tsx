import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {ILocationResult} from '../../misc/interfaces';


export default function LocationListItem({item}: { item: ILocationResult }) {

    return (
        <div className="hcResultListDetail">
            <h2><Link to={'/location_detail/' + item.place_id}>{item.name}</Link></h2>
        </div>
    );
}