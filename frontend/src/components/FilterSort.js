// File Path: src/components/FilterSort.js

import React, { useState } from 'react';
import './FilterSort.css';

const FilterSort = ({ onFilterChange, onSortChange, onSearch }) => {
    // State to manage filter, sort, and search inputs
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');

    // Handle changes to filter input
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        onFilterChange(e.target.value, search); // Pass filter and current search value
    };

    // Handle changes to sort input
    const handleSortChange = (e) => {
        setSort(e.target.value);
        onSortChange(e.target.value); // Pass the updated sort criteria
    };

    // Handle changes to search input
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        onSearch(filter, e.target.value); // Pass current filter and search query
    };

    return (
        <div className="filter-sort">
            <h3>Filter and Sort Tasks</h3>
            <div>
                <label htmlFor="search">Search:</label>
                <input
                    type="text"
                    id="search"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search by title or description"
                />
            </div>
            <div>
                <label htmlFor="filter">Filter by Status:</label>
                <select id="filter" value={filter} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                </select>
            </div>
            <div>
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={sort} onChange={handleSortChange}>
                    <option value="">None</option>
                    <option value="deadline">Deadline</option>
                    <option value="priority">Priority</option>
                </select>
            </div>
        </div>
    );
};

export default FilterSort;
