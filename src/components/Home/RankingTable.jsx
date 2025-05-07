import styled from "styled-components";
import { getEmblem } from "../../util";
import DataTable from "react-data-table-component";
import { kboTableCol, kboTableData } from "./kboTableDB";

const Section = styled.section`
  margin-top: 120px;
  color: #fff;
  h3 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 40px;
  }
`;

const customStyles = {
  table: {
    style: {
      borderTop: "1px solid #333",
      borderRight: "1px solid #333",
    },
  },
  headCells: {
    style: {
      backgroundColor: "var(--dark)",
      borderLeft: "1px solid #333",
      borderBottom: "1px solid #333",
      color: "#ddd",
      fontSize: "1.6rem",
      minHeight: "64px",
    },
  },
  cells: {
    style: {
      backgroundColor: "var(--bg)",
      borderBottom: "none",
      borderLeft: "1px solid #333",
      fontSize: "1.5rem",
      color: "#eee",
      padding: "0",
    },
  },
  rows: {
    style: {
      // border: "1px solid #fff",
      borderBottom: "1px solid #333",
      backgroundColor: "var(--bg)",
      color: "var(--light)",
      minHeight: "64px", // 행 높이
    },
  },
};

const RankingTable = () => {
  return (
    <Section>
      <div className="inner">
        <h3>리그 순위표</h3>
        <DataTable
          columns={kboTableCol}
          data={kboTableData}
          customStyles={customStyles}
        />
      </div>
    </Section>
  );
};

export default RankingTable;
