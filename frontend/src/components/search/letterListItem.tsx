import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {ILetterResult} from '../../misc/interfaces';
import {fd} from '../../misc/functions';


export default function LetterListItem({item}: { item: ILetterResult }) {


    return (
        <div className="hcResultListDetail">
            <h2><Link to={'/letter_detail/' + item.emlo_letter_id}>
                From: {item.author}; {item.origin_name}<br/>
                To: {item.recipient}; {item.destination_name}<br/>
                Date: {fd(item.standard_gregorian_date)}

            </Link></h2>
        </div>
    );
}