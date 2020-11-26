import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
import useFetchJobs from "./useFetchJobs";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs();

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

  return (
    <div className="App">
      <Container className="my-3">
        <h1 className="mb-4">Github Jobs</h1>
        <SearchForm params={params} onParamChange={handleParamChange} />
        <JobsPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
        {loading && <h1>Loading....</h1>}
        {error && <h5>Error.. Try Again</h5>}
        {jobs.map((job) => {
          return <Job key={job.id} job={job} />;
        })}
        <JobsPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
      </Container>
    </div>
  );
}

export default App;
