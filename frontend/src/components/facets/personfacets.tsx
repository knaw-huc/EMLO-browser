import React from "react";
import {FreeTextFacet, ListFacet, SliderFacet, FacetsParams} from '@knaw-huc/browser-base-react';
import {FACET_URL} from "../../misc/config";

export default function PersonFacets({registerFacet, unregisterFacet, setFacet, searchValues}: FacetsParams) {
    return <>
        <h2>Persons</h2>
        <FreeTextFacet registerFacet={registerFacet} unregisterFacet={unregisterFacet} setFacet={setFacet}/>
        <ListFacet registerFacet={registerFacet}
                   unregisterFacet={unregisterFacet}
                   setFacet={setFacet}
                   name="Name"
                   field="primary_name"
                   url={FACET_URL + "person_facet"}
                   flex={true}
                   addFilter={true}
                   usePost={true}
                   searchValues={searchValues}/>
        <SliderFacet min={1500} max={1760} name="Year of birth" field="birth_year" registerFacet={registerFacet}
                     unregisterFacet={unregisterFacet} setFacet={setFacet}/>
        <SliderFacet min={1550} max={1800} name="Year of death" field="death_year" registerFacet={registerFacet}
                     unregisterFacet={unregisterFacet} setFacet={setFacet}/>
        <ListFacet registerFacet={registerFacet}
                   unregisterFacet={unregisterFacet}
                   setFacet={setFacet}
                   name="Entity"
                   field="is_organisation"
                   url={FACET_URL + "person_facet"}
                   flex={false}
                   addFilter={false}
                   usePost={true}
                   searchValues={searchValues}/>
        <ListFacet registerFacet={registerFacet}
                   unregisterFacet={unregisterFacet}
                   setFacet={setFacet}
                   name="Gender"
                   field="gender"
                   url={FACET_URL + "person_facet"}
                   flex={false}
                   addFilter={false}
                   usePost={true}
                   searchValues={searchValues}/>
    </>;
}
