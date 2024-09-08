import React from "react";
import {IPersonDetailResult, IResource} from "../../misc/interfaces";
import {useNavigate} from 'react-router-dom';
import DetailRow from "./detailRow";
import DetailResources from "./detailResources";
import {fullPerson} from "../../misc/functions";
import LocationMap from "./locationMap";
import {get_gender, get_entity} from "../../misc/functions";

export default function PersonDetail({data}: {data: IPersonDetailResult}) {
    const nav = useNavigate();
    const OK: boolean = data.status === "OK";
    const uriName = encodeURIComponent(data.detail?.primary_name as unknown as string);
    let resource: IResource[] = [];
    if (data.detail?.related_resources !== undefined) {
        resource = data.detail.related_resources as unknown as IResource[];
    }

    return (
        <>
            <div className="hcContentContainer">
                <div className="hcBasicSideMargin">
                    <div className="justify hcMarginBottom1">
                        {OK ? (<div className="detailView"><div className="detailArea">
                                <h2>{fullPerson(data.detail?.primary_name, data.detail?.birth_year, data.detail?.death_year)}</h2>
                                <DetailRow label="Name" value={data.detail?.primary_name}/>
                                <DetailRow label="Birth year" value={data.detail?.birth_year}/>
                                <DetailRow label="Death year" value={data.detail?.death_year}/>
                                <DetailRow label="Gender" value={get_gender(data.detail?.gender as unknown as string)}/>
                                <DetailRow label="Entity" value={get_entity(data.detail?.is_organisation as unknown as string)}/>
                                <DetailRow label="Synonym(s)" value={data.detail?.synonyms}/>
                                <DetailRow label="Roles and titles" value={data.detail?.roles_titles}/>
                                <DetailRow label="EMLO url" value={data.detail?.emlo_url}/>
                                <DetailResources resources={resource}/>
                            </div>
                                <div className="letterArea">
                                    <div className="lettersInfo">
                                        <h2>Letters</h2>
                                        <div className="letterLink" onClick={() => {
                                            nav('/letters?author=' + uriName + '&page=1');
                                        }}>Letters sent by {data.detail?.primary_name}</div>
                                        <div className="letterLink" onClick={() => {
                                            nav('/letters?recipient=' + uriName + '&page=1');
                                        }}>Letters sent to {data.detail?.primary_name}</div>
                                    </div>
                                </div>
                        </div>
                        ) : (
                            <h1>Person not found!</h1>
                        )}
                        <div className="hcClickable" onClick={() => {nav(-1)}}>Back </div>
                    </div>
                </div>
            </div>
        </>
    )
}