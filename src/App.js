import "./App.css";
import { useCallback, useEffect, useState } from "react";

import { BiCalendar } from "react-icons/bi";

import AddAppoitment from "./components/AddAppoitment";
import AppoitmentInfo from "./components/AppoitmentInfo";
import Search from "./components/Search";

function App() {
  let [appoitmentList, setAppoitmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => setAppoitmentList(data));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredAppoitments = appoitmentList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  return (
    <div className="p-5">
      <div className="flex flex-row mb-3">
        <BiCalendar className="text-red-400" size={35} />
        <h1 className="text-2xl font-bold">Your Appointments </h1>
      </div>
      <AddAppoitment
        onSendAppoitmentInfo={(myAppoitment) =>
          setAppoitmentList([...appoitmentList, myAppoitment])
        }
        lastId={appoitmentList.reduce(
          (max, item) => (Number(item.id) > max ? Number(item.id) : max),
          0
        )}
      />
      <Search
        query={query}
        onQueryChange={(myQuery) => setQuery(myQuery)}
        sortBy={sortBy}
        onSetSortBy={(mySort) => setSortBy(mySort)}
        orderBy={orderBy}
        onSetOrderBy={(myOrderBy) => setOrderBy(myOrderBy)}
      />

      <ul className="divide-y divide-gray-200">
        {filteredAppoitments.map((appoitment) => (
          <AppoitmentInfo
            key={appoitment.id}
            appoitment={appoitment}
            onDeleteAppoitment={(appoitmentId) =>
              setAppoitmentList(
                appoitmentList.filter(
                  (appoitment) => appoitment.id !== appoitmentId
                )
              )
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
