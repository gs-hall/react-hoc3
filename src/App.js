import React, { useState, useEffect } from 'react';
import MonthTable from './components/MonthTable';
import YearTable from './components/YearTable';
import SortTable from './components/SortTable';
import { fetchContent, fetchContentFromCache } from './functions/fetchContent';
import "./css/index.css"

export default function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchContent()
      .then(res => res.json())
      .then(result => {
        console.log('loaded by network');
        setList(result.list);
      }
    ).catch(
      err => {
        console.log('unable to load content, using cache...');
        setList(fetchContentFromCache());
        console.log('loaded from cache');
      })
  }, []);

  return (
    <div id="app">
      <MonthTable list={list} />
      <YearTable list={list} />
      <SortTable list={list} />
    </div>
  );
};