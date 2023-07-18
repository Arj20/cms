import Loader from "../Miscellaneous/Loader";
import { useState, useEffect } from "react";
import { GlobalContext } from "../../store/context";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

const defaultColDef = {
  flex: 1,
  filter: false,
  suppressMenu: true
};


export default function Transactions({ user }) {
  const [isLoading, setIsLoading] = useState(false);

  const { GetTransactionsFromDB, transactions } = GlobalContext();

  useEffect(async () => {
    setIsLoading(true);
    await GetTransactionsFromDB(user.id);
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div
          id="myGrid"
          className="ag-theme-material"
          style={{
            height: 400,
            width: '100%',
            margin: "2rem auto",
          }}
        >
          <AgGridReact rowData={transactions} headerHeight={32} defaultColDef={defaultColDef} >
            <AgGridColumn field="Date" sortable={true}></AgGridColumn>
            <AgGridColumn
              field="Updated_By"
              sortable={true}
              filter={true}
            ></AgGridColumn>
            <AgGridColumn
              field="flow"
              sortable={true}
              filter={true}
            ></AgGridColumn>
            <AgGridColumn
              field="amount"
              sortable={true}
              filter={true}
            ></AgGridColumn>
          </AgGridReact>
        </div>
      )}
    </>
  );
}
