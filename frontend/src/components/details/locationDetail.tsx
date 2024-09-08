import React from "react";
import {ILocationDetailResult, IResource} from "../../misc/interfaces";
import {useNavigate} from 'react-router-dom';
import DetailRow from "./detailRow";
import DetailResources from "./detailResources";
import LocationMap from "./locationMap";
import '../../assets/css/leaflet.css';

export function LocationDetail({data}: { data: ILocationDetailResult }) {
    const nav = useNavigate();
    const OK: boolean = data.status === "OK";
    let MAP: boolean = false;
    let strLat = "";
    const uriPlace = encodeURIComponent(data.detail?.name as unknown as string);
    if (data.detail?.lat !== undefined) {
        strLat = data.detail.lat as unknown as string;
        MAP = true;
    }
    let strLon = "";
    if (data.detail?.lon !== undefined) {
        strLon = data.detail.lon as unknown as string;
    }
    let resource: IResource[] = [];
    if (data.detail?.related_resources !== undefined) {
        resource = data.detail.related_resources as unknown as IResource[];
    }


    return (
        <>
            <div className="hcContentContainer">
                <div className="hcBasicSideMargin">
                    <div className="justify hcMarginBottom1">
                        {OK ? (<div className="detailView">
                                <div className="detailArea">
                                    <h2>{data.detail?.name}</h2>
                                    <DetailRow label="Building" value={data.detail?.building}/>
                                    <DetailRow label="Adress" value={data.detail?.street_parish}/>
                                    <DetailRow label="Place" value={data.detail?.primary_place_name}/>
                                    <DetailRow label="Province" value={data.detail?.province}/>
                                    <DetailRow label="Country" value={data.detail?.country}/>
                                    <DetailRow label="Empire" value={data.detail?.empire}/>
                                    <DetailRow label="Synonym(s)" value={data.detail?.synonyms}/>
                                    <DetailRow label="EMLO url" value={data.detail?.emlo_url}/>
                                    <DetailRow label="Latitude" value={strLat}/>
                                    <DetailRow label="Longitude" value={strLon}/>
                                    <LocationMap lat={data.detail?.lat as unknown as number} lon={data.detail?.lon as unknown as number}/>
                                    <DetailResources resources={resource}/>
                                </div>
                                <div className="letterArea">
                                    <div className="lettersInfo">
                                        <h2>Letters</h2>
                                        <div className="letterLink" onClick={() => {
                                            nav('/letters?origin_name=' + uriPlace + '&page=1');
                                        }}>Letters from {data.detail?.name}</div>
                                        <div className="letterLink"  onClick={() => {
                                            nav('/letters?destination_name=' + uriPlace + '&page=1');
                                        }}>Letters to {data.detail?.name}</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h1>Location not found!</h1>
                        )}
                        <div className="hcClickable" onClick={() => {
                            nav(-1)
                        }}>Back
                        </div>
                    </div>
                </div>
            </div>
        </>)
}