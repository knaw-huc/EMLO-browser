import React from "react";
import {ILetterDetailResult, IResource} from "../../misc/interfaces";
import DetailRow from "./detailRow";
import DetailRowHyper from "./detailRowHyper";
import DetailResources from "./detailResources";
import {fullPerson} from "../../misc/functions";
import {useNavigate} from "react-router-dom";
import {fd} from "../../misc/functions";

export default function LetterDetail({data}: {data: ILetterDetailResult}) {
    const nav = useNavigate();
    const OK: boolean = data.status === "OK";

    return (
        <>
            <div className="hcContentContainer">
                <div className="hcBasicSideMargin">
                    <div className="justify hcMarginBottom1">
                        {OK ? (<div className="detailArea">
                                <h2>Letter</h2>
                                <DetailRow label="Date" value={fd(data.detail?.standard_gregorian_date)}/>
                                <DetailRow label="Notes on date" value={data.detail?.notes_on_date}/>
                                <DetailRowHyper label="Author" value={data.detail?.author} entity="Per" id={data.detail?.author_emlo_id} uncertain={data.detail?.author_uncertain}/>
                                <DetailRow label="Author as marked in text" value={data.detail?.author_as_marked_in_text}/>
                                <DetailRow label="Notes on author" value={data.detail?.notes_on_author_in_relation_to_letter}/>
                                <DetailRowHyper label="Place of origin" value={data.detail?.origin_name}  entity="Loc" id={data.detail?.origin_emlo_id} uncertain={data.detail?.origin_uncertain}/>
                                <DetailRow label="Place of origin as marked in text" value={data.detail?.origin_as_marked_in_text}/>
                                <DetailRow label="Notes on place of origin" value={data.detail?.notes_on_origin_in_relation_to_letter}/>
                                <DetailRowHyper label="Recipient" value={data.detail?.recipient} entity="Per" id={data.detail?.recipient_emlo_id} uncertain={data.detail?.recipient_uncertain}/>
                                <DetailRow label="Recipient as marked in text" value={data.detail?.recipient_as_marked_in_text}/>
                                <DetailRow label="Notes on recipient" value={data.detail?.notes_on_recipient_in_relation_to_letter}/>
                                <DetailRowHyper label="Place of destination" value={data.detail?.destination_name} entity="Loc" id={data.detail?.destination_emlo_id} uncertain={data.detail?.recipient_uncertain}/>
                                <DetailRow label="Place of destination as marked in text" value={data.detail?.destination_as_marked_in_text}/>
                                <DetailRow label="Notes on place of destination" value={data.detail?.notes_on_destination_in_relation_to_letter}/>
                                {/*<DetailRow label="" value={}/>*/}
                                {/*<DetailRow label="" value={}/>*/}
                                {/*<DetailRow label="" value={}/>*/}
                                {/*<DetailRow label="" value={}/>*/}
                                {/*<DetailRow label="" value={}/>*/}
                                {/*<DetailRow label="" value={}/>*/}
                                {/*<DetailRow label="" value={}/>*/}
                                {/*<DetailRow label="" value={}/>*/}
                                {/*<DetailRow label="" value={}/>*/}
                                {/*<DetailRow label="" value={}/>*/}
                                {/*<DetailRow label="" value={}/>*/}
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