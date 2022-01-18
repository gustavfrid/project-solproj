import React, { useState } from 'react'
import styled from 'styled-components'

import { API_URL_NOMINATIM } from '../utils/constants'
import LocateSvg from '../assets/LocateIcon.svg'

const LocationWrapper = styled.div`
  display: flex;
`
const SearchWrapper = styled.div`
  position: relative;
  flex-grow: 1;
`
const SearchForm = styled.form``
const SearchInput = styled.input`
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
`
const ResultList = styled.ul`
  position: absolute;
  display: none;
  background: white;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 5px;
  width: 98%;
  top: 26px;
  list-style-type: none;
  margin: 0;
  padding: 5px;
  ${SearchInput}:focus + & {
    display: inherit;
  }
`
const ListItem = styled.li`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:not(:first-child) {
    border-top: 1px solid black;
  }
  &:hover {
    background-color: greenyellow;
    cursor: pointer;
  }
`
const LocateIcon = styled.img`
  width: 20px;
  height: 20px;
  align-items: center;
`

export const SearchBox = ({ position, setPosition }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const onSubmit = e => {
    e.preventDefault()
    fetch(API_URL_NOMINATIM(query))
      .then(res => res.json())
      .then(res => {
        if (res.length < 1) {
          res.push({
            place_id: 'no_place',
            display_name: 'No results',
            lat: position.lat,
            lon: position.lng,
          })
        }
        setResults(res)
      })
  }

  const onLocate = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
    })
  }

  const ResultsList = () => {
    return (
      <ResultList>
        {results?.map(result => (
          <ListItem
            key={result.place_id}
            onClick={() => setPosition({ lat: result.lat, lng: result.lon })}>
            {result.display_name}
          </ListItem>
        ))}
      </ResultList>
    )
  }

  return (
    <LocationWrapper>
      <LocateIcon src={LocateSvg} onClick={onLocate} />
      <SearchWrapper>
        <SearchForm onSubmit={onSubmit}>
          <SearchInput
            type='text'
            placeholder='search location'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <ResultsList />
        </SearchForm>
      </SearchWrapper>
    </LocationWrapper>
  )
}
