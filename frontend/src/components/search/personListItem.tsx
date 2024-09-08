import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {IPersonResult} from '../../misc/interfaces';
import {fullPerson} from "../../misc/functions";


export default function PersonListItem({item}: { item: IPersonResult }) {
    function noNull(str: string) {
        if (str === null) {
            return "";
        } else {
            return str;
        }
    }

    /*function lifeSpan(from: string, to: string) {
        if ((from === "" || from === null ) && (to === "" || to === null )) {
            return ""
        } else {
            return  "( " + noNull(from) + " - " + noNull(to) + " )";
        }
    }*/

    return (
        <div className="hcResultListDetail">
        <h2><Link to={'/person_detail/' + item.person_id}>{fullPerson(item.primary_name, item.birth_year, item.death_year)}</Link></h2>
    </div>
);
}