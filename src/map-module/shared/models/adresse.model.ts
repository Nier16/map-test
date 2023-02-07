export type Address = {
    city: string,
    postalCode: string,
    street: string,
    country: string
}

export type AddressMinimalDetails = {
    lat: number,
    lon: number
}

export type AddressDetails = {
    place_id: number,
    licence: string,
    osm_type: string,
    osm_id: number,
    boundingbox: number[],
    lat: number,
    lon: number,
    display_name: string,
    class: string,
    type: string,
    importance: number
}
