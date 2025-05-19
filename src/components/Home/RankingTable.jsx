import styled from "styled-components";
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

  .rdt_Table {
    border-top: 1px solid #333;
    border-right: 1px solid #333;
  }

  .rdt_TableHead {
    background-color: var(--dark);
  }

  .rdt_TableHeadRow {
    min-height: 64px;
    background: none;
  }

  .rdt_TableCol {
    background-color: var(--dark);
    border-left: 1px solid #333;
    border-bottom: 1px solid #333;
    color: #ddd;
    font-size: 1.7rem;
  }

  .rdt_TableRow {
    background-color: var(--bg);
    color: var(--light);
    border-bottom: 1px solid #333;
    min-height: 64px;
  }

  .rdt_TableCell {
    background-color: var(--bg);
    border-left: 1px solid #333;
    color: #eee;
    font-size: 1.6rem;
    padding: 0;
  }
  .rdt_TableCol:first-child,
  .rdt_TableCell:first-child {
    flex: unset;
    width: 160px;
    min-width: 160px;
    max-width: 140px;

    @media screen and (max-width: 1440px) {
      width: 130px;
      min-width: 130px;
      max-width: 130px;
    }

    @media screen and (max-width: 768px) {
      width: 120px;
      min-width: 120px;
      max-width: 120px;
    }
    @media screen and (max-width: 500px) {
      width: 110px;
      min-width: 110px;
      max-width: 110px;
    }
  }
  .table {
    /* border-right: 1px solid #333; */
    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #bbb;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #888;
    }
    scrollbar-width: thin;
    scrollbar-color: #bbb transparent;
  }

  @media screen and (max-width: 1440px) {
    .rdt_TableHeadRow {
      min-height: 55px;
    }
    .rdt_TableRow {
      min-height: 55px;
    }
    .rdt_TableCol {
      font-size: 1.5rem;
    }
    .rdt_TableCell {
      font-size: 1.4rem;
    }
  }
  @media screen and (max-width: 1024px) {
    margin-top: 90px;
    h3 {
      font-size: 2.5rem;
      margin-bottom: 30px;
    }
    .rdt_TableHeadRow {
      min-height: 50px;
    }
    .rdt_TableRow {
      min-height: 50px;
    }
    .rdt_TableCol {
      font-size: 1.4rem;
    }
    .rdt_TableCell {
      font-size: 1.3rem;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 80px;
    h3 {
      font-size: 2rem;
      margin-bottom: 20px;
    }
    .rdt_TableCol {
      font-size: 1.4rem;
    }
    .rdt_TableCell {
      font-size: 1.3rem;
    }
  }
  @media screen and (max-width: 500px) {
    margin-top: 60px;
    h3 {
      font-size: 1.6rem;
      margin-bottom: 15px;
    }
  }
`;

const RankingTable = () => {
  return (
    <Section>
      <div className="inner">
        <h3>리그 순위표</h3>

        <DataTable
          className="table"
          columns={kboTableCol}
          data={kboTableData}
        />
      </div>
    </Section>
  );
};

export default RankingTable;
