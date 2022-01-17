import React, { useState } from 'react'
import styled from 'styled-components'

import LocateSvg from '../assets/LocateIcon.svg'

const SearchWrapper = styled.div`
  position: relative;
  flex-grow: 1;
`
const HoveringList = styled.ul`
  position: absolute;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
  top: 26px;
  list-style-type: none;
  margin: 0;
  padding: 5px;
`
const ListItem = styled.li`
  border-top: 1px solid black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background-color: greenyellow;
    cursor: pointer;
  }
`
const SearchInput = styled.input`
  width: 100%;
  border-radius: 5px;
`
const SearchForm = styled.form`
  width: 100%;
`
const LocateIcon = styled.img`
  width: 20px;
  height: 20px;
`

export const SearchBox = ({ position, setPosition }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    console.log('query: ', query)
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&countrycodes=se&addressdetails=1&format=json`
    )
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
        console.log(res)
        setResults(res)
      })
  }

  const onLocate = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
    })
  }

  const ResultsList = () => {
    if (results) {
      return (
        <HoveringList>
          {results?.map(result => (
            <ListItem
              key={result.place_id}
              onClick={() => setPosition({ lat: result.lat, lng: result.lon })}>
              {result.display_name}
            </ListItem>
          ))}
        </HoveringList>
      )
    }
    return null
  }

  return (
    <>
      <LocateIcon src={LocateSvg} onClick={onLocate} />
      <SearchWrapper>
        <SearchForm onSubmit={onSubmit}>
          <SearchInput
            type='text'
            placeholder='search location'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </SearchForm>
        <ResultsList />
      </SearchWrapper>
    </>
  )
}
