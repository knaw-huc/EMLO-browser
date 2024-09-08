export interface ILocationResult {
    place_id: string,
    name: string
}

export interface ILocationDetails {
    place_id: string, 
    name: string,
    building: string, 
    street_parish: string, 
    primary_place_name: string, 
    province: string, 
    country: string, 
    empire: string, 
    synonyms: string,
    lat: number, 
    lon: number, 
    related_resources: IResource[],
    emlo_url: string,
    nr_from: string
}

export interface ILocationDetailResult {
    status:string,
    detail?: ILocationDetails
}

export interface IPersonDetails {
    person_id: string,
    primary_name: string,
    synonyms: string,
    roles_titles: string,
    gender: string,
    is_organisation: string,
    birth_year: string,
    death_year: string,
    related_resources: IResource,
    emlo_url: string
}

export interface IPersonDetailResult {
    status: string,
    detail?: IPersonDetails
}

export interface IResource {
    name: string,
    details: string,
    url: string
}

export interface IPersonResult {
    person_id: string,
    primary_name: string
    gender: string,
    birth_year: string,
    death_year: string
}

export interface ILetterResult{
    emlo_letter_id: string,
    author: string,
    origin_name: string,
    recipient: string,
    destination_name: string,
    standard_gregorian_date: string
}

export interface ILetterDetailResult {
    status: string,
    detail?: ILetterDetails
}

export interface ILetterDetails {
    year: string,
    month: string,
    day: string,
    standard_gregorian_date: string,
    calendar_of_date_provided: string,
    date_as_marked_on_letter: string,
    date_uncertain: string,
    notes_on_date: string,
    author: string,
    author_emlo_id: string,
    author_as_marked_in_text: string,
    author_uncertain: string,
    notes_on_author_in_relation_to_letter: string,
    recipient: string,
    recipient_emlo_id: string,
    recipient_as_marked_in_text: string,
    recipient_uncertain: string,
    notes_on_recipient_in_relation_to_letter: string,
    origin_name: string,
    origin_emlo_id: string,
    origin_as_marked_in_text: string,
    origin_uncertain: string,
    notes_on_origin_in_relation_to_letter: string,
    destination_name: string,
    destination_emlo_id: string,
    destination_as_marked_in_text: string,
    destination_uncertain: string,
    notes_on_destination_in_relation_to_letter: string,
    abstract: string,
    keywords: string,
    languages: string,
    incipit: string,
    explicit: string,
    people_mentioned: string,
    emlo_ids_of_people_mentioned: string,
    notes_on_people_mentioned: string,
    original_catalogue_name: string,
    source: string,
    matching_letters: string,
    match_id: string,
    related_resource_ids: string,
    general_notes_for_public_display: string,
    emlo_url: string
}
