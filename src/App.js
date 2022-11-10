import React, { useState, useEffect } from 'react';
import MonthTable from './components/MonthTable';
import YearTable from './components/YearTable';
import SortTable from './components/SortTable';
import { fetchContent, fetchContentFromCache } from './functions/fetchContent';
import "./css/index.css"
import { withAggregation } from './components/withAggregation';
import { aggregateByMonth, aggregateByYear, aggregateByDate } from './functions/transformData';

export default function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchContent()
      .then(res => res.json())
      .then(result => {
        console.log('loaded by network',result.list.length);
        setList(result.list);
      }
    ).catch(
      err => {
        console.log('unable to load content, using cache...');
        setList(fetchContentFromCache());
        console.log('loaded from cache');
      })
  }, []);

  const MonthTableWithAggregation = withAggregation(MonthTable, aggregateByMonth);
  const YearTableWithAggregation = withAggregation(YearTable, aggregateByYear);
  const SortTableWithAggregation = withAggregation(SortTable, aggregateByDate);

  return (
    <div id="app">
      <MonthTableWithAggregation list={list} />
      <YearTableWithAggregation list={list} />
      <SortTableWithAggregation list={list} />
    </div>
    /*
    <YearTable list={list} />
    <SortTable list={list} />
    */
  );
};