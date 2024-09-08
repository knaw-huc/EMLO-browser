import React, {createElement} from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/style.css';
import {
    App,
    PageHeader,
    Search,
    Detail as BrowserDetail,
    createSearchLoader,
    createDetailLoader,
    searchUtils,
    SearchParams
} from '@knaw-huc/browser-base-react';
import {createBrowserRouter, RouteObject, RouterProvider} from 'react-router-dom';
import LocationFacets from "./components/facets/locationFacets";
import PersonFacets from "./components/facets/personfacets";
import LetterFacets from "./components/facets/letterFacets";
import LocationListItem from "./components/search/locationListItem";
import PersonListItem from "./components/search/personListItem";
import LetterListItem from "./components/search/letterListItem";
import {LocationDetail} from "./components/details/locationDetail";
import PersonDetail from "./components/details/personDetail";
import LetterDetail from "./components/details/letterDetail";
import {Header} from "./components/pageHeader";
import {Home} from "./components/home";
import About from "./components/about";

const header = <Header/>
const locationSearchLoader = createSearchLoader(searchUtils.getSearchObjectFromParams, 'http://localhost:5000/browse_location', 20);
const personSearchLoader = createSearchLoader(searchUtils.getSearchObjectFromParams, 'http://localhost:5000/browse_person', 20);
const letterSearchLoader = createSearchLoader(searchUtils.getSearchObjectFromParams, 'http://localhost:5000/browse_letter', 20);
const title = 'EMLO Browser';
const locationDetailLoader = createDetailLoader(id => `http://localhost:5000/location_detail/${id}`);
const personDetailLoader = createDetailLoader(id => `http://localhost:5000/person_detail/${id}`);
const letterDetailLoader = createDetailLoader(id => `http://localhost:5000/letter_detail/${id}`);
const routeObject: RouteObject = {
    path: '/',
    element: <App header={header}/>,
    children: [
        {index: true, element: <Home/>},
        {
            path: "/locations",
            loader: async ({request}) => locationSearchLoader(new URL(request.url).searchParams),
            element: <Search title={title} pageLength={30} withPaging={true}
                             hasIndexPage={false} showSearchHeader={false} updateDocumentTitle={false}
                             searchParams={SearchParams.PARAMS} FacetsComponent={LocationFacets}
                             ResultItemComponent={LocationListItem}/>
        }, {
            path: '/location_detail/:id',
            loader: async ({params}) => locationDetailLoader(params.id as string),
            element: <BrowserDetail title={title} updateDocumentTitle={false} DetailComponent={LocationDetail}/>
        }, {
            path: "/persons",
            loader: async ({request}) => personSearchLoader(new URL(request.url).searchParams),
            element: <Search title={title} pageLength={30} withPaging={true}
                             hasIndexPage={false} showSearchHeader={false} updateDocumentTitle={false}
                             searchParams={SearchParams.PARAMS} FacetsComponent={PersonFacets}
                             ResultItemComponent={PersonListItem}/>
        }, {
            path: '/person_detail/:id',
            loader: async ({params}) => personDetailLoader(params.id as string),
            element: <BrowserDetail title={title} updateDocumentTitle={false} DetailComponent={PersonDetail}/>
        }, {
            path: "/letters",
            loader: async ({request}) => letterSearchLoader(new URL(request.url).searchParams),
            element: <Search title={title} pageLength={30} withPaging={true}
                             hasIndexPage={false} showSearchHeader={false} updateDocumentTitle={false}
                             searchParams={SearchParams.PARAMS} FacetsComponent={LetterFacets}
                             ResultItemComponent={LetterListItem}/>
        }, {
            path: '/letter_detail/:id',
            loader: async ({params}) => letterDetailLoader(params.id as string),
            element: <BrowserDetail title={title} updateDocumentTitle={false} DetailComponent={LetterDetail}/>
        }, {
            path: '/about',
            element: <About/>
        }]
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

        <RouterProvider router={createBrowserRouter([routeObject])}/>
);
